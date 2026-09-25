import { NextResponse } from "next/server";
import { createHmac } from "node:crypto";

export const runtime = "nodejs";
type Dict = Record<string, unknown>;
type Place = { name: string; state: string; country: string; lat: number; lng: number; timezone: string };
function isObject(value: unknown): value is Dict { return typeof value === "object" && value !== null && !Array.isArray(value); }
function string(value: unknown, max = 180) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function cleanChart(raw: Dict) {
  const asc = isObject(raw.ascendant) ? raw.ascendant : {};
  const nak = isObject(asc.nakshatra) ? asc.nakshatra : {};
  const planets = Array.isArray(raw.planets) ? raw.planets.flatMap((entry) => {
    if (!isObject(entry)) return [];
    return [{ name: string(entry.name, 40), sign: string(entry.sign, 40), house: Number.isInteger(entry.house) ? entry.house : null, degree: typeof entry.degree_in_sign === "number" ? entry.degree_in_sign : null, nakshatra: string(entry.nakshatra, 60), pada: Number.isInteger(entry.pada) ? entry.pada : null, retrograde: typeof entry.is_retrograde === "boolean" ? entry.is_retrograde : null }];
  }) : [];
  const houses = Array.isArray(raw.houses) ? raw.houses.flatMap((entry) => isObject(entry) && Number.isInteger(entry.house) ? [{ house: entry.house, sign: string(entry.sign, 40) }] : []) : [];
  const sati = isObject(raw.sade_sati) ? { active: typeof raw.sade_sati.active === "boolean" ? raw.sade_sati.active : null, phase: string(raw.sade_sati.phase, 40) || null, description: string(raw.sade_sati.description, 240) } : null;
  return { ascendant: { sign: string(asc.sign, 40), degree: typeof asc.degree === "number" ? asc.degree : null, nakshatra: string(nak.name, 60), pada: Number.isInteger(nak.pada) ? nak.pada : null }, planets, houses, sadeSati: sati, metadata: isObject(raw.metadata) ? { ayanamsha: string(raw.metadata.ayanamsha, 40), houseSystem: string(raw.metadata.house_system, 40), timezone: string(raw.metadata.timezone_used, 80) } : {} };
}
function chartBasedAnalysis(chart: ReturnType<typeof cleanChart>): Dict {
  const byName = (name: string) => chart.planets.find((planet) => planet.name.toLowerCase() === name.toLowerCase());
  const inHouse = (house: number) => chart.planets.filter((planet) => planet.house === house);
  const houseSign = (house: number) => chart.houses.find((entry) => entry.house === house)?.sign;
  const signLords: Record<string, string> = { Aries: "Mars", Taurus: "Venus", Gemini: "Mercury", Cancer: "Moon", Leo: "Sun", Virgo: "Mercury", Libra: "Venus", Scorpio: "Mars", Sagittarius: "Jupiter", Capricorn: "Saturn", Aquarius: "Saturn", Pisces: "Jupiter" };
  const placement = (planet: (typeof chart.planets)[number] | undefined) => planet ? `${planet.name} ${planet.sign ? `${planet.sign} राशि` : ""}${planet.house ? ` के ${planet.house}वें भाव में` : " की स्थिति उपलब्ध है"}${planet.nakshatra ? ` और ${planet.nakshatra} नक्षत्र में` : ""}` : "इस ग्रह की स्थिति उपलब्ध नहीं है";
  const careerSign = houseSign(10); const careerLord = careerSign ? byName(signLords[careerSign] ?? "") : undefined;
  const fifthSign = houseSign(5); const seventhSign = houseSign(7);
  const tenthPlanets = inHouse(10); const fifthPlanets = inHouse(5); const seventhPlanets = inHouse(7);
  const careerBits = [careerSign ? `दशम भाव में ${careerSign} राशि है${careerLord ? ` और उसके स्वामी ${placement(careerLord)}` : ""}.` : "दशम भाव की राशि उपलब्ध नहीं है।", tenthPlanets.length ? `दशम भाव में ${tenthPlanets.map((p) => p.name).join(", ")} स्थित हैं।` : "दशम भाव में कोई ग्रह दर्ज नहीं है।", `शनि: ${placement(byName("Saturn"))}.`];
  const loveBits = [`पंचम भाव${fifthSign ? ` में ${fifthSign} राशि` : " की राशि उपलब्ध नहीं"}${fifthPlanets.length ? `; यहाँ ${fifthPlanets.map((p) => p.name).join(", ")} स्थित हैं` : ""}.`, `सप्तम भाव${seventhSign ? ` में ${seventhSign} राशि` : " की राशि उपलब्ध नहीं"}${seventhPlanets.length ? `; यहाँ ${seventhPlanets.map((p) => p.name).join(", ")} स्थित हैं` : ""}.`, `शुक्र: ${placement(byName("Venus"))}.`, `चंद्रमा: ${placement(byName("Moon"))}.`];
  const notEnough = "यह केवल उपलब्ध ग्रह-भाव स्थितियों पर आधारित प्रारंभिक, पारंपरिक ज्योतिषीय संकेत है; इसे निश्चित भविष्यवाणी न मानें।";
  return {
    summary: `आपकी गणना में लग्न ${chart.ascendant.sign || "उपलब्ध नहीं"} है। नीचे का प्रारंभिक विवरण वास्तविक ग्रह और भाव स्थितियों से तैयार किया गया है।`,
    career: { interpretation: `${careerBits.join(" ")} पारंपरिक ज्योतिषीय पद्धति में दशम भाव, उसके स्वामी और शनि को कार्य-दिशा समझने के संकेतक माना जाता है। ${notEnough}`, timing: "नौकरी की समय-खिड़की के लिए दशा/गोचर डेटा इस गणना में शामिल नहीं है।", guidance: "इन संकेतों को अपनी रुचि, कौशल और व्यावहारिक अवसरों के साथ देखकर करियर निर्णय लें।" },
    marriage: { interpretation: `${seventhSign ? `सप्तम भाव में ${seventhSign} राशि` : "सप्तम भाव की राशि उपलब्ध नहीं है"}${seventhPlanets.length ? ` और वहाँ ${seventhPlanets.map((p) => p.name).join(", ")} की स्थिति` : ""}. ${placement(byName("Venus"))}. ${notEnough}`, timing: "विवाह की समय-खिड़की के लिए दशा/गोचर डेटा उपलब्ध नहीं है।", guidance: "रिश्ते के निर्णय आपसी संवाद, सम्मान और अनुकूलता को देखकर लें।" },
    relationship: { interpretation: `${loveBits.join(" ")} पारंपरिक ज्योतिष में पंचम भाव को प्रेम/आकर्षण, सप्तम भाव को साझेदारी, तथा शुक्र और चंद्रमा को संबंधों की शैली के संकेतक माना जाता है। ${notEnough}`, marriageType: "केवल इन आधारभूत स्थितियों से love या arranged marriage का निश्चित निष्कर्ष निकालना उचित नहीं है।", guidance: "रिश्तों में स्पष्ट संवाद, भावनात्मक समझ और पारस्परिक सम्मान पर ध्यान दें।" },
    finance: { interpretation: "वित्तीय स्थिति का विस्तृत आकलन करने के लिए धन भाव, उसके स्वामी और दशा सहित अधिक chart context चाहिए।", guidance: "आर्थिक निर्णय वास्तविक आय, खर्च और विशेषज्ञ सलाह पर आधारित रखें।" },
    education: { interpretation: `पंचम भाव की उपलब्ध स्थिति: ${fifthSign ?? "राशि उपलब्ध नहीं"}${fifthPlanets.length ? `; ग्रह ${fifthPlanets.map((p) => p.name).join(", ")}` : ""}. इसे पारंपरिक संकेत की तरह ही लें।`, guidance: "पढ़ाई और कौशल विकास में निरंतरता उपयोगी रहेगी।" },
    family: { interpretation: "परिवार के बारे में विस्तृत संकेतों के लिए संबंधित भावों और उनके स्वामियों का संयुक्त आकलन आवश्यक है।" },
    travel: { interpretation: "इस आधारभूत chart response से विदेश यात्रा का विश्वसनीय समय या निष्कर्ष उपलब्ध नहीं है।" },
    spirituality: { interpretation: "यह chart response आध्यात्मिकता के लिए विशेष योगों का आकलन नहीं देता।" },
    dosha: [],
    disclaimer: "यह ग्रह-भाव स्थितियों का सीमित, पारंपरिक ज्योतिषीय पाठ है; यह निश्चित भविष्यवाणी या पेशेवर जीवन-परामर्श नहीं है।",
    source: "chart-data",
  };
}
function chartBasedAnalysisEnglish(chart: ReturnType<typeof cleanChart>): Dict {
  const planet = (name: string) => chart.planets.find((item) => item.name.toLowerCase() === name.toLowerCase());
  const occupants = (house: number) => chart.planets.filter((item) => item.house === house);
  const sign = (house: number) => chart.houses.find((item) => item.house === house)?.sign;
  const placement = (item: (typeof chart.planets)[number] | undefined) => item ? `${item.name}${item.sign ? ` in ${item.sign}` : ""}${item.house ? `, house ${item.house}` : ""}${item.nakshatra ? `, ${item.nakshatra} nakshatra` : ""}` : "position not available";
  const careerSign = sign(10); const careerOccupants = occupants(10); const love5 = occupants(5); const love7 = occupants(7);
  const limitation = "This is a preliminary interpretation of the available planetary and house placements in traditional astrology, not a definite prediction.";
  return {
    summary: `Your calculated ascendant is ${chart.ascendant.sign || "not available"}. The overview below is based on the planetary and house positions returned for this chart.`,
    career: { interpretation: `${careerSign ? `The 10th house is in ${careerSign}` : "The 10th-house sign is not available"}${careerOccupants.length ? `, with ${careerOccupants.map((item) => item.name).join(", ")} placed there` : ", with no planets listed there"}. Saturn is ${placement(planet("Saturn"))}. Traditional astrology considers the 10th house and Saturn among career indicators. ${limitation}`, timing: "A job timing window cannot be assessed from this chart response because dasha and transit data were not included.", guidance: "Consider these traditional indicators alongside your interests, skills, and practical opportunities." },
    marriage: { interpretation: `${sign(7) ? `The 7th house is in ${sign(7)}` : "The 7th-house sign is not available"}${love7.length ? `, with ${love7.map((item) => item.name).join(", ")} placed there` : ""}. Venus is ${placement(planet("Venus"))}. ${limitation}`, timing: "Marriage timing cannot be assessed because dasha and transit data are not included.", guidance: "Base relationship decisions on communication, respect, and compatibility." },
    relationship: { interpretation: `The 5th house${sign(5) ? ` is in ${sign(5)}` : " sign is unavailable"}${love5.length ? ` and contains ${love5.map((item) => item.name).join(", ")}` : ""}. The 7th house${sign(7) ? ` is in ${sign(7)}` : " sign is unavailable"}${love7.length ? ` and contains ${love7.map((item) => item.name).join(", ")}` : ""}. Venus is ${placement(planet("Venus"))}; the Moon is ${placement(planet("Moon"))}. Traditional astrology uses these as relationship indicators. ${limitation}`, marriageType: "These basic placements alone cannot reliably determine whether a marriage will be love or arranged.", guidance: "Give priority to honest communication, emotional understanding, and mutual respect." },
    finance: { interpretation: "A fuller financial reading requires combined assessment of the relevant houses, their rulers, and dasha periods.", guidance: "Base financial decisions on your actual circumstances and qualified advice." },
    education: { interpretation: `The 5th house${sign(5) ? ` is in ${sign(5)}` : " sign is unavailable"}${love5.length ? `, with ${love5.map((item) => item.name).join(", ")} placed there` : ""}. Treat this as a traditional astrological indicator, not a certainty.` },
    family: { interpretation: "A detailed family reading requires combined assessment of the relevant houses and their rulers." },
    travel: { interpretation: "This basic chart response does not provide enough information to assess foreign travel timing or outcomes." },
    spirituality: { interpretation: "This chart response does not include a specific assessment of spiritual combinations." },
    dosha: [], disclaimer: limitation, source: "chart-data",
  };
}
function validDate(date: string) { if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false; const parsed = new Date(`${date}T00:00:00Z`); return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === date && parsed <= new Date(); }
function limit(request: Request) { const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"; const now = Date.now(); const prev = rates.get(ip); if (!prev || prev.until < now) { rates.set(ip, { count: 1, until: now + 10 * 60_000 }); return false; } return ++prev.count > 8; }
const rates = new Map<string, { count: number; until: number }>();

export async function POST(request: Request) {
  if (limit(request)) return NextResponse.json({ message: "कृपया कुछ समय बाद फिर प्रयास करें।" }, { status: 429 });
  let body: Dict;
  try { const parsed: unknown = await request.json(); if (!isObject(parsed)) throw new Error(); body = parsed; } catch { return NextResponse.json({ message: "कृपया सही जानकारी दर्ज करें।" }, { status: 400 }); }
  const fullName = string(body.fullName, 100); const birthDate = string(body.birthDate, 10); const birthTime = string(body.birthTime, 5); const email = string(body.email, 180);
  const placeValue = isObject(body.place) ? body.place : {};
  const place: Place = { name: string(placeValue.name, 100), state: string(placeValue.state, 100), country: string(placeValue.country, 10), lat: Number(placeValue.lat), lng: Number(placeValue.lng), timezone: string(placeValue.timezone, 80) };
  if (fullName.length < 2 || !validDate(birthDate) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(birthTime)) return NextResponse.json({ message: "कृपया नाम, जन्म तारीख और जन्म समय सही format में दर्ज करें।" }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ message: "कृपया सही ईमेल दर्ज करें।" }, { status: 400 });
  if (!place.name || !Number.isFinite(place.lat) || place.lat < -90 || place.lat > 90 || !Number.isFinite(place.lng) || place.lng < -180 || place.lng > 180 || !place.timezone) return NextResponse.json({ message: "कृपया खोज सूची से अपना जन्म स्थान चुनें।" }, { status: 400 });
  const astroKey = process.env.FREEASTROAPI_KEY;
  if (!astroKey) return NextResponse.json({ message: "कुंडली गणना सेवा अभी उपलब्ध नहीं है। कृपया कुछ समय बाद पुनः प्रयास करें।" }, { status: 503 });
  // Resolve the selected place again on the server; browser-supplied coordinates are never trusted.
  try {
    const geoUrl = new URL("https://api.freeastroapi.com/api/v2/geo/search");
    geoUrl.searchParams.set("q", [place.name, place.state, place.country].filter(Boolean).join(", "));
    geoUrl.searchParams.set("limit", "10");
    const geoResponse = await fetch(geoUrl, { headers: { "x-api-key": astroKey }, signal: AbortSignal.timeout(8_000), cache: "no-store" });
    const geoBody = await geoResponse.json() as { results?: Array<Record<string, unknown>> };
    const resolved = (geoBody.results ?? []).find((item) => item.name === place.name && Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lng)) && Math.abs(Number(item.lat) - place.lat) < 0.01 && Math.abs(Number(item.lng) - place.lng) < 0.01 && item.timezone === place.timezone);
    if (!geoResponse.ok || !resolved) return NextResponse.json({ message: "कृपया खोज सूची से अपना जन्म स्थान चुनें।" }, { status: 400 });
  } catch { return NextResponse.json({ message: "स्थान सत्यापन सेवा इस समय उपलब्ध नहीं है।" }, { status: 502 }); }
  const [year, month, day] = birthDate.split("-").map(Number); const [hour, minute] = birthTime.split(":").map(Number);
  let upstream: Response;
  try {
    const payload = { year, month, day, hour, minute, city: place.name, lat: place.lat, lng: place.lng, tz_str: place.timezone, ayanamsha: "lahiri", house_system: "whole_sign", node_type: "mean" };
    upstream = await fetch("https://api.freeastroapi.com/api/v2/vedic/chart", { method: "POST", headers: { "Content-Type": "application/json", "x-api-key": astroKey }, body: JSON.stringify(payload), signal: AbortSignal.timeout(18_000), cache: "no-store" });
    if (!upstream.ok) return NextResponse.json({ message: "कुंडली गणना सेवा अभी उपलब्ध नहीं है। कृपया कुछ समय बाद पुनः प्रयास करें।" }, { status: upstream.status === 429 ? 429 : 502 });
  } catch { return NextResponse.json({ message: "कुंडली गणना सेवा अभी उपलब्ध नहीं है। कृपया कुछ समय बाद पुनः प्रयास करें।" }, { status: 502 }); }
  let raw: unknown;
  try { raw = await upstream.json(); } catch { return NextResponse.json({ message: "कुंडली गणना सेवा से सही परिणाम नहीं मिला।" }, { status: 502 }); }
  if (!isObject(raw) || !Array.isArray(raw.planets) || !isObject(raw.ascendant)) return NextResponse.json({ message: "कुंडली गणना सेवा से सही परिणाम नहीं मिला।" }, { status: 502 });
  const chart = cleanChart(raw);
  let analysis: Dict | null = null;
  const aiKey = process.env.OPENROUTER_API_KEY;
  if (aiKey) {
    try {
      const ai = await fetch("https://openrouter.ai/api/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${aiKey}`, "Content-Type": "application/json", "HTTP-Referer": process.env.NEXTAUTH_URL ?? "http://localhost:8080", "X-OpenRouter-Title": "Panditji" }, body: JSON.stringify({ model: process.env.OPENROUTER_MODEL ?? "openai/gpt-4o", response_format: { type: "json_object" }, messages: [{ role: "system", content: `आप वैदिक ज्योतिष के व्याख्याकार हैं। केवल दिए हुए chart data का अर्थ समझाएं, ग्रह/दशा/गोचर या timing न गढ़ें। यह संभावना-आधारित पारंपरिक व्याख्या है, निश्चित भविष्यवाणी नहीं। स्वास्थ्य, मृत्यु, गर्भावस्था, तलाक या निश्चित आर्थिक लाभ की भविष्यवाणी न करें। अनुपलब्ध data साफ बताएं। हिन्दी में वैध JSON दें, schema: {summary:string, career:{interpretation:string,timing:string,guidance:string}, marriage:{interpretation:string,timing:string,guidance:string}, relationship:{interpretation:string,marriageType:string,guidance:string}, finance:{interpretation:string,guidance:string}, education:{interpretation:string,guidance:string}, family:{interpretation:string}, travel:{interpretation:string}, spirituality:{interpretation:string}, dosha:string[], disclaimer:string}. Timing तभी दें जब chart input में पर्याप्त dasha/transit data हो; इस chart में वह शामिल नहीं है, इसलिए timing उपलब्ध नहीं बताएं. Dosha का दावा न करें जब तक ठोस आवश्यक data न हो।` }, { role: "user", content: JSON.stringify({ chart }) }] }), signal: AbortSignal.timeout(22_000) });
      if (ai.ok) { const result = await ai.json() as { choices?: Array<{ message?: { content?: unknown } }> }; const content = result.choices?.[0]?.message?.content; if (typeof content === "string") { const parsed: unknown = JSON.parse(content.replace(/^```json\s*|\s*```$/g, "")); if (isObject(parsed) && typeof parsed.summary === "string") analysis = parsed; } }
    } catch { /* Chart remains useful when AI interpretation is unavailable. */ }
  }
  const usedChartFallback = !analysis;
  if (!analysis) analysis = chartBasedAnalysis(chart);
  const analysisEnglish = chartBasedAnalysisEnglish(chart);
  const signingSecret = process.env.AUTH_SECRET;
  const chartToken = signingSecret ? `${Buffer.from(JSON.stringify(chart)).toString("base64url")}.${createHmac("sha256", signingSecret).update(JSON.stringify(chart)).digest("base64url")}` : "";
  return NextResponse.json({ profile: { fullName, birthDate, birthTime, place: [place.name, place.state, place.country].filter(Boolean).join(", ") }, chart, chartToken, analysis, analysisEnglish, interpretationUnavailable: usedChartFallback }, { headers: { "Cache-Control": "no-store" } });
}

import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
type Obj = Record<string, unknown>;
function isObj(value: unknown): value is Obj { return typeof value === "object" && value !== null && !Array.isArray(value); }
export async function POST(request: Request) {
  let data: Obj;
  try { const value: unknown = await request.json(); if (!isObj(value)) throw new Error(); data = value; } catch { return NextResponse.json({ message: "कृपया प्रश्न दोबारा भेजें।" }, { status: 400 }); }
  const question = typeof data.question === "string" ? data.question.trim().slice(0, 1000) : "";
  if (!question) return NextResponse.json({ message: "कृपया अपना प्रश्न लिखें।" }, { status: 400 });
  const chart = data.chart;
  const token = typeof data.chartToken === "string" ? data.chartToken : "";
  const secret = process.env.AUTH_SECRET;
  if (!isObj(chart) || !Array.isArray(chart.planets) || !secret || !token.includes(".")) return NextResponse.json({ message: "इस कुंडली का संदर्भ उपलब्ध नहीं है।" }, { status: 400 });
  const [encoded, supplied] = token.split(".");
  const serialized = JSON.stringify(chart);
  const expectedEncoded = Buffer.from(serialized).toString("base64url");
  const expected = createHmac("sha256", secret).update(serialized).digest();
  let suppliedBytes: Buffer;
  try { suppliedBytes = Buffer.from(supplied, "base64url"); } catch { return NextResponse.json({ message: "इस कुंडली का संदर्भ उपलब्ध नहीं है।" }, { status: 400 }); }
  if (encoded !== expectedEncoded || suppliedBytes.length !== expected.length || !timingSafeEqual(suppliedBytes, expected)) return NextResponse.json({ message: "इस कुंडली का संदर्भ उपलब्ध नहीं है।" }, { status: 400 });
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return NextResponse.json({ message: "कुंडली गणना प्राप्त हो गई है, लेकिन AI interpretation इस समय उपलब्ध नहीं है।" }, { status: 503 });
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "HTTP-Referer": process.env.NEXTAUTH_URL ?? "http://localhost:8080", "X-OpenRouter-Title": "Panditji" }, body: JSON.stringify({ model: process.env.OPENROUTER_MODEL ?? "openai/gpt-4o", messages: [{ role: "system", content: "आप इस एक अनुरोध में दी गई कुंडली का हिन्दी में उत्तर दें। केवल उपलब्ध chart data की पारंपरिक ज्योतिषीय व्याख्या करें। ग्रह, दशा, गोचर या timing न गढ़ें। सटीक भविष्यवाणी, चिकित्सा, मृत्यु, गर्भावस्था या निश्चित आर्थिक परिणाम न बताएं। जरूरत का data न हो तो स्पष्ट कहें।" }, { role: "user", content: `Chart data: ${JSON.stringify(chart)}\n\nQuestion: ${question}` }] }), signal: AbortSignal.timeout(20_000) });
    if (!response.ok) throw new Error("AI unavailable");
    const result = await response.json() as { choices?: Array<{ message?: { content?: unknown } }> };
    const answer = result.choices?.[0]?.message?.content;
    if (typeof answer !== "string") throw new Error("Empty AI reply");
    return NextResponse.json({ answer: answer.slice(0, 4000) }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ message: "कुंडली गणना प्राप्त हो गई है, लेकिन AI interpretation इस समय उपलब्ध नहीं है।" }, { status: 502 }); }
}

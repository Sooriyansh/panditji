import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";
  if (query.length < 2 || query.length > 100) return NextResponse.json({ results: [] });
  const key = process.env.FREEASTROAPI_KEY;
  if (!key) return NextResponse.json({ message: "स्थान खोज सेवा इस समय उपलब्ध नहीं है।" }, { status: 503 });
  try {
    const url = new URL("https://api.freeastroapi.com/api/v2/geo/search");
    url.searchParams.set("q", query);
    url.searchParams.set("limit", "6");
    const response = await fetch(url, { headers: { "x-api-key": key }, signal: AbortSignal.timeout(8_000), cache: "no-store" });
    if (!response.ok) return NextResponse.json({ message: "स्थान खोज सेवा इस समय उपलब्ध नहीं है।" }, { status: 502 });
    const payload = await response.json() as { results?: Array<Record<string, unknown>> };
    const results = (payload.results ?? []).flatMap((item) => {
      const name = typeof item.name === "string" ? item.name : "";
      const state = typeof item.state === "string" ? item.state : "";
      const country = typeof item.country === "string" ? item.country : "";
      const lat = Number(item.lat); const lng = Number(item.lng);
      const timezone = typeof item.timezone === "string" ? item.timezone : "";
      return name && Number.isFinite(lat) && Number.isFinite(lng) && timezone ? [{ name, state, country, lat, lng, timezone, label: [name, state, country].filter(Boolean).join(", ") }] : [];
    });
    return NextResponse.json({ results }, { headers: { "Cache-Control": "private, max-age=60" } });
  } catch {
    return NextResponse.json({ message: "स्थान खोज सेवा इस समय उपलब्ध नहीं है।" }, { status: 502 });
  }
}

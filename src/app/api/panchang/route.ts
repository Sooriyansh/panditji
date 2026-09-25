import { NextRequest, NextResponse } from "next/server";
import { getDailyPanchang, getMonthlyOverview, ShubhAiError } from "@/lib/panchang/shubhai";
import type { PanchangLocation } from "@/lib/panchang/types";

export const runtime = "nodejs";

const DEFAULT_LOCATION: PanchangLocation = { city: "उज्जैन", state: "मध्य प्रदेश", country: "भारत", latitude: 23.1765, longitude: 75.7885, timezone: "Asia/Kolkata" };
const DATE = /^\d{4}-\d{2}-\d{2}$/;
function numberParam(value: string | null, min: number, max: number, fallback: number) { const number = Number(value); return Number.isFinite(number) && number >= min && number <= max ? number : fallback; }

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const view = params.get("view") === "month" ? "month" : "details";
  const latitude = numberParam(params.get("lat"), -90, 90, DEFAULT_LOCATION.latitude);
  const longitude = numberParam(params.get("lon"), -180, 180, DEFAULT_LOCATION.longitude);
  const location = { ...DEFAULT_LOCATION, latitude, longitude };
  try {
    if (view === "month") {
      const year = numberParam(params.get("year"), 1900, 2100, new Date().getFullYear());
      const month = numberParam(params.get("month"), 1, 12, new Date().getMonth() + 1);
      return NextResponse.json({ month: await getMonthlyOverview(location, year, month) }, { headers: { "Cache-Control": "private, max-age=300" } });
    }
    const date = params.get("date") ?? new Date().toISOString().slice(0, 10);
    if (!DATE.test(date)) return NextResponse.json({ message: "Invalid date" }, { status: 400 });
    return NextResponse.json({ details: await getDailyPanchang(location, date) }, { headers: { "Cache-Control": "private, max-age=300" } });
  } catch (error) {
    const status = error instanceof ShubhAiError ? error.status : 502;
    return NextResponse.json({ message: "पंचांग की जानकारी अभी उपलब्ध नहीं है।" }, { status });
  }
}

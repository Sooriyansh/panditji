import "server-only";
import { cached } from "@/lib/panchang/cache";
import type { ChoghadiyaPeriod, Festival, MonthDay, MonthlyOverview, Muhurat, PanchangData, PanchangLocation, TimeRange, TimedValue } from "@/lib/panchang/types";

const API_BASE = "https://shubh.live/api/v1";
const DAY_TTL = 1000 * 60 * 60 * 12;
const MONTH_TTL = 1000 * 60 * 60 * 24;
type JsonRecord = Record<string, unknown>;

export class ShubhAiError extends Error {
  constructor(message: string, public readonly status = 502) { super(message); }
}

function record(value: unknown): JsonRecord | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value as JsonRecord : undefined;
}
function string(value: unknown): string | undefined { return typeof value === "string" && value.trim() ? value.trim() : undefined; }
function array(value: unknown): unknown[] { return Array.isArray(value) ? value : []; }
function firstString(source: JsonRecord, keys: string[]): string | undefined { return keys.map((key) => string(source[key])).find(Boolean); }
function range(value: unknown): TimeRange | undefined {
  const item = record(value); if (!item) return undefined;
  const start = firstString(item, ["start", "startsAt", "from"]);
  const end = firstString(item, ["end", "endsAt", "to"]);
  return start && end ? { start, end } : undefined;
}
function limb(value: unknown): TimedValue | undefined {
  const item = record(value); if (!item) return undefined;
  const name = firstString(item, ["name", "en", "sa"]); if (!name) return undefined;
  const pada = typeof item.pada === "number" ? item.pada : undefined;
  return { name, endsAt: firstString(item, ["endsAt", "end"]), pada, paksha: string(item.paksha) };
}
function itemArray(value: unknown, keys: string[]): unknown[] {
  const source = record(value);
  if (Array.isArray(value)) return value;
  return source ? keys.flatMap((key) => array(source[key])) : [];
}

async function request(path: string, params: Record<string, string | number>): Promise<unknown> {
  const key = process.env.SHUBHAI_API_KEY;
  if (!key) throw new ShubhAiError("API key is not configured", 503);
  const url = new URL(`${API_BASE}${path}`);
  Object.entries(params).forEach(([name, value]) => url.searchParams.set(name, String(value)));
  let response: Response;
  try { response = await fetch(url, { headers: { "X-API-Key": key, Accept: "application/json" }, signal: AbortSignal.timeout(10_000) }); }
  catch { throw new ShubhAiError("Panchang service is unavailable"); }
  if (!response.ok) throw new ShubhAiError("Panchang service returned an error", response.status === 429 ? 429 : 502);
  try { return await response.json(); } catch { throw new ShubhAiError("Panchang service returned invalid data"); }
}

function parsePeriods(raw: unknown): PanchangData["dayPeriods"] {
  const source = record(raw) ?? {};
  const aliases: Record<keyof PanchangData["dayPeriods"], string[]> = {
    rahuKaal: ["rahuKaal", "rahu", "rahuKalam"], yamaganda: ["yamaganda", "yamaGanda"], gulika: ["gulika", "gulikaKaal"], abhijitMuhurat: ["abhijitMuhurat", "abhijit"], brahmaMuhurat: ["brahmaMuhurat", "brahma"],
  };
  return Object.fromEntries(Object.entries(aliases).flatMap(([name, keys]) => {
    const parsed = keys.map((key) => range(source[key])).find(Boolean);
    return parsed ? [[name, parsed]] : [];
  })) as PanchangData["dayPeriods"];
}
function parseChoghadiya(raw: unknown): PanchangData["choghadiya"] {
  const source = record(raw) ?? {};
  const parse = (values: unknown[]): ChoghadiyaPeriod[] => values.flatMap((value) => {
    const item = record(value); const time = range(value); const name = item && firstString(item, ["name", "choghadiya", "label"]);
    if (!item || !time || !name) return [];
    const type = firstString(item, ["type", "nature"]);
    const lowered = `${name} ${type ?? ""}`.toLowerCase();
    const status = /(udveg|rog|kaal|inauspicious|bad)/.test(lowered) ? "inauspicious" : /(labh|amrit|shubh|char|auspicious|good)/.test(lowered) ? "auspicious" : "neutral";
    return [{ ...time, name, type, status, goodFor: array(item.goodFor).filter((entry): entry is string => typeof entry === "string" && Boolean(entry.trim())).map((entry) => entry.trim()) }];
  });
  return { day: parse(itemArray(source.day ?? source.dayChoghadiya, ["periods", "items"])), night: parse(itemArray(source.night ?? source.nightChoghadiya, ["periods", "items"])) };
}
function parseMuhurat(raw: unknown, date: string): Muhurat[] {
  return itemArray(raw, ["muhurat", "muhurats", "data"]).flatMap((value) => {
    const item = record(value); const time = range(value); const title = item && firstString(item, ["title", "name", "activity"]); const itemDate = item && string(item.date);
    return item && time && title && (!itemDate || itemDate === date) ? [{ ...time, title, activity: string(item.activity) }] : [];
  });
}
function parsePanchang(raw: unknown, date: string, periods: unknown, choghadiya: unknown, muhurat: unknown): PanchangData {
  const source = record(raw);
  if (!source) throw new ShubhAiError("Panchang response could not be validated");
  return {
    date: string(source.date) ?? date, timezone: firstString(source, ["tz", "timezone"]), vara: firstString(source, ["vara", "weekday"]),
    tithi: limb(source.tithi), nakshatra: limb(source.nakshatra), yoga: limb(source.yoga), karana: limb(source.karana),
    sunrise: string(source.sunrise), sunset: string(source.sunset), moonrise: string(source.moonrise), moonset: string(source.moonset),
    dayPeriods: parsePeriods(periods), choghadiya: parseChoghadiya(choghadiya), muhurats: parseMuhurat(muhurat, date),
  };
}
function parseFestival(value: unknown, fallbackType: Festival["type"]): Festival | undefined {
  const item = record(value); if (!item) return undefined;
  const date = firstString(item, ["date", "observedOn", "day"]); const name = firstString(item, ["name", "title", "festival"]);
  return date && name ? { date, name, type: fallbackType } : undefined;
}
function parseMonth(raw: unknown, year: number, month: number, festivals: unknown, ekadashi: unknown): MonthlyOverview {
  const source = record(raw) ?? {}; const daily = itemArray(source, ["days", "data", "calendar"]);
  const markers = [...itemArray(festivals, ["festivals", "data"]).map((value) => parseFestival(value, "festival")), ...itemArray(ekadashi, ["ekadashis", "data", "days"]).map((value) => parseFestival(value, "ekadashi"))].filter((value): value is Festival => Boolean(value));
  const days: MonthDay[] = daily.flatMap((value) => {
    const item = record(value); const date = item && string(item.date); if (!item || !date) return [];
    const parvas = array(item.parvas).flatMap((parva) => typeof parva === "string" ? [{ date, name: parva, type: "parva" as const }] : [parseFestival(parva, "parva")].filter((entry): entry is Festival => Boolean(entry)));
    const local = markers.filter((marker) => marker.date === date);
    return [{ date, tithi: limb(item.tithi)?.name ?? string(item.tithi), paksha: string(item.paksha), markers: [...local, ...parvas] }];
  });
  return { year, month, days };
}

export async function getDailyPanchang(location: PanchangLocation, date: string): Promise<PanchangData> {
  const params = { lat: location.latitude, lon: location.longitude, date };
  const key = `panchang:${date}:${location.latitude}:${location.longitude}`;
  return cached(key, DAY_TTL, async () => {
    const [panchang, periods, choghadiya, muhurat] = await Promise.all([request("/panchang", params), request("/day-periods", params), request("/choghadiya", params), request("/muhurat", { ...params, activity: "shubh", from: date, to: date })]);
    return parsePanchang(panchang, date, periods, choghadiya, muhurat);
  });
}
export async function getMonthlyOverview(location: PanchangLocation, year: number, month: number): Promise<MonthlyOverview> {
  const key = `panchang-month:${year}-${month}:${location.latitude}:${location.longitude}`;
  return cached(key, MONTH_TTL, async () => {
    const base = { lat: location.latitude, lon: location.longitude };
    const [calendar, festivals, ekadashi] = await Promise.all([request("/panchang/month", { ...base, year, month }), request("/panchang/festivals", { ...base, year }), request("/panchang/ekadashi", { ...base, year, month })]);
    return parseMonth(calendar, year, month, festivals, ekadashi);
  });
}

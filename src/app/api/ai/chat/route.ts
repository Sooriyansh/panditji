import { NextResponse } from "next/server";
import { allowedServiceRoutes, knownPujaIds, systemInstructions } from "@/lib/ai/knowledge";
import type { AssistantAction, AssistantReply, BookingPrefill, ChatMessage, ChatRole } from "@/lib/ai/types";

export const runtime = "nodejs";

const MAX_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 1_500;
const windows = new Map<string, { count: number; resetAt: number }>();
const rateLimitWindowMs = 10 * 60_000;
const maxRequestsPerWindow = 12;
type RecordValue = Record<string, unknown>;

function object(value: unknown): RecordValue | undefined { return typeof value === "object" && value !== null && !Array.isArray(value) ? value as RecordValue : undefined; }
function safeText(value: unknown, maxLength: number) { return typeof value === "string" ? value.replace(/\0/g, "").trim().slice(0, maxLength) : ""; }
function clientIp(request: Request) { return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"; }
function tooManyRequests(request: Request) { const key = clientIp(request); const now = Date.now(); const previous = windows.get(key); if (!previous || previous.resetAt <= now) { windows.set(key, { count: 1, resetAt: now + rateLimitWindowMs }); return false; } previous.count += 1; return previous.count > maxRequestsPerWindow; }
function parseMessages(value: unknown): ChatMessage[] | undefined {
  if (!Array.isArray(value) || value.length < 1 || value.length > MAX_MESSAGES) return undefined;
  const messages = value.flatMap((item) => { const entry = object(item); const role = entry?.role; const content = safeText(entry?.content, MAX_MESSAGE_LENGTH); return (role === "user" || role === "assistant") && content ? [{ role: role as ChatRole, content }] : []; });
  return messages.length === value.length && messages.at(-1)?.role === "user" ? messages : undefined;
}
function prefill(value: unknown): BookingPrefill {
  const source = object(value) ?? {}; const result: BookingPrefill = {};
  const fields: Array<keyof BookingPrefill> = ["fullName", "phone", "email", "city", "pujaService", "preferredDate", "preferredTime", "locationType", "otherLocation", "purpose", "additionalInfo"];
  fields.forEach((field) => { const text = safeText(source[field], field === "additionalInfo" || field === "purpose" ? 1_500 : 180); if (text) Object.assign(result, { [field]: text }); });
  if (result.phone && !/^[6-9]\d{9}$/.test(result.phone.replace(/[\s-]/g, ""))) delete result.phone;
  if (result.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) delete result.email;
  if (result.pujaService && !knownPujaIds.has(result.pujaService)) delete result.pujaService;
  if (result.preferredDate && !/^\d{4}-\d{2}-\d{2}$/.test(result.preferredDate)) delete result.preferredDate;
  if (result.preferredTime && !["morning", "afternoon", "evening", "discuss"].includes(result.preferredTime)) delete result.preferredTime;
  if (result.locationType && !["ujjain", "online", "other", "discuss"].includes(result.locationType)) delete result.locationType;
  return result;
}
function action(value: unknown): AssistantAction | undefined {
  const source = object(value); const type = source?.type; const data = object(source?.data) ?? {};
  if (type === "OPEN_SERVICE_PAGE") { const route = safeText(data.route, 120); return allowedServiceRoutes.has(route) ? { type, data: { route } } : undefined; }
  if (type === "START_BOOKING") { const pujaService = safeText(data.pujaService, 80); return pujaService && knownPujaIds.has(pujaService) ? { type, data: { pujaService } } : { type, data: {} }; }
  if (type === "PREFILL_BOOKING_FORM") { const values = prefill(data); return Object.keys(values).length ? { type, data: values } : undefined; }
  if (type === "CONTACT_PANDIT" || type === "OPEN_CONSULTATION" || type === "SHOW_FAQ") return { type, data: {} };
  return undefined;
}
function response(raw: string): AssistantReply {
  const clean = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  try { const parsed = object(JSON.parse(clean)); const message = safeText(parsed?.message, 2_400); const parsedAction = action(parsed?.action); return message ? { message, ...(parsedAction ? { action: parsedAction } : {}) } : { message: "क्षमा करें, मैं इस विषय में अभी स्पष्ट उत्तर नहीं दे पा रहा हूँ। कृपया पंडित जी से सीधे संपर्क करें।" }; }
  catch { return { message: safeText(clean, 2_400) || "अभी AI सेवा से जुड़ने में समस्या आ रही है। कृपया थोड़ी देर बाद प्रयास करें या पंडित जी से सीधे संपर्क करें।" }; }
}

export async function POST(request: Request) {
  if (tooManyRequests(request)) return NextResponse.json({ message: "कृपया कुछ समय बाद फिर प्रयास करें।" }, { status: 429 });
  if (Number(request.headers.get("content-length") ?? 0) > 20_000) return NextResponse.json({ message: "संदेश बहुत बड़ा है।" }, { status: 413 });
  let messages: ChatMessage[] | undefined;
  try { messages = parseMessages((await request.json() as { messages?: unknown }).messages); } catch { return NextResponse.json({ message: "कृपया सही संदेश भेजें।" }, { status: 400 }); }
  if (!messages) return NextResponse.json({ message: "कृपया एक सही प्रश्न भेजें।" }, { status: 400 });
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) { console.error("OpenRouter API configuration missing"); return NextResponse.json({ message: "अभी AI सेवा से जुड़ने में समस्या आ रही है। कृपया थोड़ी देर बाद प्रयास करें या पंडित जी से सीधे संपर्क करें।" }, { status: 503 }); }
  try {
    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "HTTP-Referer": process.env.NEXTAUTH_URL ?? "http://localhost:8080", "X-OpenRouter-Title": "Panditji" }, body: JSON.stringify({ model: process.env.OPENROUTER_MODEL ?? "openai/gpt-4o", messages: [{ role: "system", content: systemInstructions() }, ...messages] }), signal: AbortSignal.timeout(25_000) });
    if (!upstream.ok) { console.error("OpenRouter chat request failed", upstream.status, (await upstream.text()).slice(0, 1_000)); return NextResponse.json({ message: "अभी AI सेवा से जुड़ने में समस्या आ रही है। कृपया थोड़ी देर बाद प्रयास करें या पंडित जी से सीधे संपर्क करें।" }, { status: upstream.status === 429 ? 429 : 502 }); }
    const body = await upstream.json() as { choices?: Array<{ message?: { content?: unknown } }> };
    const content = body.choices?.[0]?.message?.content;
    if (typeof content !== "string") throw new Error("Invalid OpenRouter response");
    return NextResponse.json(response(content));
  } catch (error) { console.error("OpenRouter chat request unavailable", error); return NextResponse.json({ message: "अभी AI सेवा से जुड़ने में समस्या आ रही है। कृपया थोड़ी देर बाद प्रयास करें या पंडित जी से सीधे संपर्क करें।" }, { status: 502 }); }
}

import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { getPujaService } from "@/data/puja-services";
import { currentUser } from "@/lib/permissions";

export const runtime = "nodejs";

type BookingPayload = Record<string, unknown>;
type BookingStatus = "pending" | "contacted" | "confirmed" | "cancelled";
type BookingDocument = {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  pujaService: string;
  preferredDate: string;
  preferredTime: "morning" | "afternoon" | "evening" | "discuss";
  locationType: "ujjain" | "online" | "other" | "discuss";
  otherLocation?: string;
  purpose: string;
  additionalInfo?: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  status: BookingStatus;
  requestFingerprint: string;
  createdAt: Date;
  updatedAt: Date;
};

const requestWindows = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimit(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const current = requestWindows.get(ip);
  if (!current || current.resetAt < now) { requestWindows.set(ip, { count: 1, resetAt: now + WINDOW_MS }); return false; }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function optionalText(value: unknown, maxLength: number) {
  const result = text(value, maxLength);
  return result || undefined;
}

function isDate(value: string) { return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00`).getTime()); }

function validate(payload: BookingPayload): { booking?: Omit<BookingDocument, "userId" | "userName" | "userEmail" | "userPhone" | "status" | "requestFingerprint" | "createdAt" | "updatedAt">; message?: string } {
  const fullName = text(payload.fullName, 100);
  const phone = text(payload.phone, 20).replace(/[\s-]/g, "");
  const email = optionalText(payload.email, 254);
  const city = text(payload.city, 100);
  const pujaService = text(payload.pujaService, 80);
  const preferredDate = text(payload.preferredDate, 10);
  const preferredTime = text(payload.preferredTime, 20) as BookingDocument["preferredTime"];
  const locationType = text(payload.locationType, 20) as BookingDocument["locationType"];
  const otherLocation = optionalText(payload.otherLocation, 180);
  const purpose = text(payload.purpose, 1500);
  const additionalInfo = optionalText(payload.additionalInfo, 1500);
  const birthDate = optionalText(payload.birthDate, 10);
  const birthTime = optionalText(payload.birthTime, 10);
  const birthPlace = optionalText(payload.birthPlace, 100);
  const today = new Date().toISOString().slice(0, 10);

  if (!fullName || !/^[6-9]\d{9}$/.test(phone) || !city || !getPujaService(pujaService) || !isDate(preferredDate) || preferredDate < today || !["morning", "afternoon", "evening", "discuss"].includes(preferredTime) || !["ujjain", "online", "other", "discuss"].includes(locationType) || !purpose || purpose.length < 10) return { message: "कृपया सभी आवश्यक जानकारी सही रूप में भरें।" };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { message: "कृपया सही ईमेल पता दर्ज करें।" };
  if (locationType === "other" && !otherLocation) return { message: "कृपया पूजा का विस्तृत स्थान दर्ज करें।" };
  if (birthDate && !isDate(birthDate)) return { message: "कृपया सही जन्म तिथि दर्ज करें।" };
  if (birthTime && !/^\d{2}:\d{2}$/.test(birthTime)) return { message: "कृपया सही जन्म समय दर्ज करें।" };

  return { booking: { fullName, phone, ...(email ? { email } : {}), city, pujaService, preferredDate, preferredTime, locationType, ...(otherLocation ? { otherLocation } : {}), purpose, ...(additionalInfo ? { additionalInfo } : {}), ...(birthDate ? { birthDate } : {}), ...(birthTime ? { birthTime } : {}), ...(birthPlace ? { birthPlace } : {}) } };
}

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user?.email) return NextResponse.json({ success: false, message: "बुकिंग पूरी करने के लिए कृपया पहले लॉगिन करें।" }, { status: 401 });
  if (rateLimit(request)) return NextResponse.json({ success: false, message: "बहुत अधिक अनुरोध भेजे गए हैं। कृपया कुछ समय बाद पुनः प्रयास करें।" }, { status: 429 });
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 25_000) return NextResponse.json({ success: false, message: "भेजी गई जानकारी बहुत बड़ी है।" }, { status: 413 });

  let payload: BookingPayload;
  try { payload = await request.json() as BookingPayload; } catch { return NextResponse.json({ success: false, message: "कृपया सही जानकारी भेजें।" }, { status: 400 }); }
  const result = validate(payload);
  if (!result.booking) return NextResponse.json({ success: false, message: result.message }, { status: 400 });

  const booking = result.booking;
  const requestFingerprint = createHash("sha256").update(`${booking.phone}|${booking.pujaService}|${booking.preferredDate}|${booking.preferredTime}|${booking.purpose}`).digest("hex");
  try {
    const database = await getDatabase();
    const bookings = database.collection<BookingDocument>("pujaBookings");
    await bookings.createIndex({ requestFingerprint: 1, createdAt: -1 });
    await bookings.createIndex({ status: 1, createdAt: -1 });
    const duplicate = await bookings.findOne({ requestFingerprint, createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) } }, { projection: { _id: 1 } });
    if (duplicate) return NextResponse.json({ success: true, duplicate: true, message: "आपका बुकिंग अनुरोध पहले ही प्राप्त हो चुका है। उपलब्धता की पुष्टि के लिए आपसे संपर्क किया जाएगा।" });
    const now = new Date();
    await bookings.insertOne({ ...booking, userId: user.id, userName: user.name?.slice(0, 100) || booking.fullName, userEmail: user.email, userPhone: booking.phone, status: "pending", requestFingerprint, createdAt: now, updatedAt: now });
    return NextResponse.json({ success: true, message: "आपका पूजा बुकिंग अनुरोध प्राप्त हो गया है। तिथि और उपलब्धता की पुष्टि के लिए आपसे संपर्क किया जाएगा।" }, { status: 201 });
  } catch (error) {
    console.error("Puja booking persistence failed", error);
    const message = error instanceof Error && error.message === "MONGODB_URI is not configured" ? "बुकिंग संग्रहण अभी कॉन्फ़िगर नहीं है। कृपया बाद में पुनः प्रयास करें।" : "अनुरोध अभी सुरक्षित रूप से सहेजा नहीं जा सका। कृपया बाद में पुनः प्रयास करें।";
    return NextResponse.json({ success: false, message }, { status: 503 });
  }
}

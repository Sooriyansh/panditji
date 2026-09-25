import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { bookingStatuses, type Booking, type BookingStatus } from "@/types/booking";
import { currentAdmin } from "@/lib/permissions";

export const runtime = "nodejs";

type StoredBooking = Omit<Booking, "id" | "createdAt" | "updatedAt"> & {
  _id: { toString(): string };
  createdAt: Date;
  updatedAt: Date;
  requestFingerprint?: string;
};

function asPositiveInt(value: string | null, fallback: number, maximum: number) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? Math.min(number, maximum) : fallback;
}

function validStatus(value: string | null): value is BookingStatus {
  return Boolean(value && bookingStatuses.includes(value as BookingStatus));
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function serialize(booking: StoredBooking): Booking {
  const { _id, requestFingerprint, ...data } = booking;
  void requestFingerprint;
  return { ...data, id: _id.toString(), createdAt: data.createdAt.toISOString(), updatedAt: data.updatedAt.toISOString() };
}

export async function GET(request: Request) {
  if (!await currentAdmin()) return NextResponse.json({ message: "इस डेटा के लिए एडमिन अनुमति आवश्यक है।" }, { status: 403 });
  const { searchParams } = new URL(request.url);
  const page = asPositiveInt(searchParams.get("page"), 1, 1_000_000);
  const limit = asPositiveInt(searchParams.get("limit"), 20, 50);
  const status = searchParams.get("status");
  const pujaService = searchParams.get("pujaService")?.trim().slice(0, 80);
  const date = searchParams.get("date");
  const search = searchParams.get("search")?.trim().slice(0, 100);
  const filter: Record<string, unknown> = {};

  if (validStatus(status)) filter.status = status;
  if (pujaService) filter.pujaService = pujaService;
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) filter.preferredDate = date;
  if (search) {
    const expression = new RegExp(escapeRegex(search), "i");
    filter.$or = [{ fullName: expression }, { phone: expression }, { pujaService: expression }];
  }

  try {
    const bookings = (await getDatabase()).collection<StoredBooking>("pujaBookings");
    const [documents, total, grouped] = await Promise.all([
      bookings.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).toArray(),
      bookings.countDocuments(filter),
      bookings.aggregate<{ _id: BookingStatus; count: number }>([{ $group: { _id: "$status", count: { $sum: 1 } } }]).toArray(),
    ]);
    const stats = { total: 0, pending: 0, contacted: 0, confirmed: 0, cancelled: 0 };
    for (const entry of grouped) {
      if (validStatus(entry._id)) stats[entry._id] = entry.count;
      stats.total += entry.count;
    }
    return NextResponse.json({ bookings: documents.map(serialize), stats, page, total, totalPages: Math.max(1, Math.ceil(total / limit)) });
  } catch (error) {
    console.error("Admin booking list failed", error);
    return NextResponse.json({ message: "बुकिंग डेटा अभी उपलब्ध नहीं है। कृपया MongoDB कॉन्फ़िगरेशन जाँचें।" }, { status: 503 });
  }
}

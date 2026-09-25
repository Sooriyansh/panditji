import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { bookingStatuses, type BookingStatus } from "@/types/booking";
import { currentAdmin } from "@/lib/permissions";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };
const allowedTransitions: Record<BookingStatus, BookingStatus[]> = {
  pending: ["contacted", "cancelled"],
  contacted: ["confirmed", "cancelled"],
  confirmed: ["cancelled"],
  cancelled: [],
};

function validStatus(value: unknown): value is BookingStatus {
  return typeof value === "string" && bookingStatuses.includes(value as BookingStatus);
}

export async function PATCH(request: Request, { params }: RouteContext) {
  if (!await currentAdmin()) return NextResponse.json({ message: "इस कार्रवाई के लिए एडमिन अनुमति आवश्यक है।" }, { status: 403 });
  const { id } = await params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ message: "अमान्य बुकिंग आईडी है।" }, { status: 400 });

  let payload: { status?: unknown };
  try { payload = await request.json() as { status?: unknown }; }
  catch { return NextResponse.json({ message: "अनुरोध सही प्रारूप में नहीं है।" }, { status: 400 }); }
  if (!validStatus(payload.status)) return NextResponse.json({ message: "कृपया सही बुकिंग स्थिति चुनें।" }, { status: 400 });

  try {
    const bookings = (await getDatabase()).collection("pujaBookings");
    const current = await bookings.findOne({ _id: new ObjectId(id) }, { projection: { status: 1 } });
    if (!current) return NextResponse.json({ message: "बुकिंग नहीं मिली।" }, { status: 404 });
    const currentStatus = current.status as BookingStatus;
    if (currentStatus !== payload.status && (!validStatus(currentStatus) || !allowedTransitions[currentStatus].includes(payload.status))) {
      return NextResponse.json({ message: "इस बुकिंग के लिए स्थिति का यह बदलाव मान्य नहीं है।" }, { status: 400 });
    }
    const result = await bookings.updateOne({ _id: new ObjectId(id) }, { $set: { status: payload.status, updatedAt: new Date() } });
    if (!result.matchedCount) return NextResponse.json({ message: "बुकिंग नहीं मिली।" }, { status: 404 });
    return NextResponse.json({ success: true, message: "बुकिंग की स्थिति अपडेट हो गई है।" });
  } catch (error) {
    console.error("Booking status update failed", error);
    return NextResponse.json({ message: "स्थिति अपडेट नहीं हो सकी। कृपया फिर प्रयास करें।" }, { status: 503 });
  }
}

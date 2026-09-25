import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { currentUser } from "@/lib/permissions";

export const runtime = "nodejs";

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ message: "कृपया पहले लॉगिन करें।" }, { status: 401 });
  try {
    const bookings = await (await getDatabase()).collection("pujaBookings").find({ userId: user.id }, { projection: { requestFingerprint: 0, userId: 0 } }).sort({ createdAt: -1 }).limit(100).toArray();
    return NextResponse.json({ bookings: bookings.map((booking) => ({ ...booking, id: booking._id.toString(), _id: undefined })) });
  } catch (error) {
    console.error("User bookings failed", error);
    return NextResponse.json({ message: "बुकिंग डेटा अभी उपलब्ध नहीं है।" }, { status: 503 });
  }
}

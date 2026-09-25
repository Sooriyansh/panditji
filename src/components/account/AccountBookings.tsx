"use client";

import { useEffect, useState } from "react";

type Booking = { id: string; pujaService: string; preferredDate: string; preferredTime: string; status: string; createdAt: string };
const labels: Record<string, string> = { pending: "लंबित", contacted: "संपर्क किया गया", confirmed: "पुष्टि की गई", cancelled: "रद्द की गई" };

export default function AccountBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]); const [message, setMessage] = useState("लोड हो रहा है…");
  useEffect(() => { void fetch("/api/user/bookings", { cache: "no-store" }).then(async (response) => { const data = await response.json() as { bookings?: Booking[]; message?: string }; if (!response.ok) throw new Error(data.message); setBookings(data.bookings || []); setMessage(""); }).catch((error: unknown) => setMessage(error instanceof Error ? error.message : "डेटा लोड नहीं हो सका।")); }, []);
  if (message) return <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-[#70401f]">{message}</p>;
  if (!bookings.length) return <p className="rounded-xl border border-[#ead6b9] bg-[#fffdf9] px-4 py-6 text-sm text-[#795a41]">आपकी कोई बुकिंग अभी मौजूद नहीं है।</p>;
  return <div className="overflow-hidden rounded-2xl border border-[#ead6b9] bg-[#fffdf9]"><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-[#fff8ed] text-xs text-[#89613d]"><tr><th className="px-4 py-3">पूजा</th><th className="px-4 py-3">तिथि</th><th className="px-4 py-3">स्थिति</th><th className="px-4 py-3">अनुरोध</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id} className="border-t border-[#f0e4d1]"><td className="px-4 py-3 font-bold">{booking.pujaService}</td><td className="px-4 py-3">{new Intl.DateTimeFormat("hi-IN", { dateStyle: "medium" }).format(new Date(`${booking.preferredDate}T00:00:00`))}</td><td className="px-4 py-3">{labels[booking.status] || booking.status}</td><td className="px-4 py-3">{new Intl.DateTimeFormat("hi-IN", { dateStyle: "medium" }).format(new Date(booking.createdAt))}</td></tr>)}</tbody></table></div></div>;
}

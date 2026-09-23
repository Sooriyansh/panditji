"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { pujaServices } from "@/data/puja-services";
import type { Booking, BookingStats, BookingStatus } from "@/types/booking";

type ApiResponse = { bookings: Booking[]; stats: BookingStats; page: number; total: number; totalPages: number; message?: string };
type Filters = { search: string; status: string; pujaService: string; date: string };

const emptyStats: BookingStats = { total: 0, pending: 0, contacted: 0, confirmed: 0, cancelled: 0 };
const statusLabels: Record<BookingStatus, string> = { pending: "लंबित", contacted: "संपर्क किया गया", confirmed: "पुष्टि की गई", cancelled: "रद्द की गई" };
const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-900 ring-amber-200",
  contacted: "bg-sky-100 text-sky-900 ring-sky-200",
  confirmed: "bg-emerald-100 text-emerald-900 ring-emerald-200",
  cancelled: "bg-rose-100 text-rose-900 ring-rose-200",
};
const timeLabels: Record<Booking["preferredTime"], string> = { morning: "सुबह", afternoon: "दोपहर", evening: "शाम", discuss: "बात करके तय करें" };
const locationLabels: Record<Booking["locationType"], string> = { ujjain: "उज्जैन में पूजा", online: "ऑनलाइन मार्गदर्शन", other: "अन्य स्थान", discuss: "बात करके तय करें" };
const statusTransitions: Record<BookingStatus, BookingStatus[]> = { pending: ["pending", "contacted", "cancelled"], contacted: ["contacted", "confirmed", "cancelled"], confirmed: ["confirmed", "cancelled"], cancelled: ["cancelled"] };

function formatDate(value: string, withTime = false) {
  const date = new Date(value.includes("T") ? value : `${value}T00:00:00`);
  return new Intl.DateTimeFormat("hi-IN", withTime ? { dateStyle: "medium", timeStyle: "short" } : { dateStyle: "medium" }).format(date);
}

function serviceTitle(id: string) { return pujaServices.find((service) => service.id === id)?.title ?? id; }

function StatusBadge({ status }: { status: BookingStatus }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${statusStyles[status]}`}>{statusLabels[status]}</span>;
}

export default function AdminDashboard() {
  const [filters, setFilters] = useState<Filters>({ search: "", status: "", pujaService: "", date: "" });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<BookingStats>(emptyStats);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const query = useMemo(() => {
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (filters.search.trim()) params.set("search", filters.search.trim());
    if (filters.status) params.set("status", filters.status);
    if (filters.pujaService) params.set("pujaService", filters.pujaService);
    if (filters.date) params.set("date", filters.date);
    return params;
  }, [filters, page]);

  const loadBookings = useCallback(async (signal?: AbortSignal) => {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/admin/bookings?${query.toString()}`, { signal, cache: "no-store" });
      const data = await response.json() as ApiResponse;
      if (!response.ok) throw new Error(data.message || "डेटा लोड नहीं हो सका।");
      setBookings(data.bookings); setStats(data.stats); setTotal(data.total); setTotalPages(data.totalPages);
      if (data.page !== page) setPage(data.page);
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setError(cause instanceof Error ? cause.message : "डेटा लोड नहीं हो सका।");
    } finally { if (!signal?.aborted) setLoading(false); }
  }, [page, query]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => { void loadBookings(controller.signal); }, 0);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [loadBookings]);

  function changeFilter(field: keyof Filters, value: string) {
    setPage(1); setFilters((current) => ({ ...current, [field]: value }));
  }

  async function updateStatus(booking: Booking, status: BookingStatus) {
    if (status === booking.status) return;
    setUpdatingId(booking.id); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/admin/bookings/${booking.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      const data = await response.json() as { message?: string };
      if (!response.ok) throw new Error(data.message || "स्थिति अपडेट नहीं हो सकी।");
      setBookings((current) => current.map((item) => item.id === booking.id ? { ...item, status, updatedAt: new Date().toISOString() } : item));
      setSelected((current) => current?.id === booking.id ? { ...current, status, updatedAt: new Date().toISOString() } : current);
      setNotice(data.message || "बुकिंग की स्थिति अपडेट हो गई है।");
      void loadBookings();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "स्थिति अपडेट नहीं हो सकी।"); }
    finally { setUpdatingId(null); }
  }

  return (
    <div className="min-h-screen bg-[#fffaf2] text-[#3f210f]">
      <header className="border-b border-[#ead9bd] bg-[#fffdf9] px-4 py-4 sm:px-7 lg:px-10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#873514] text-xl text-amber-100 shadow-sm">ॐ</span><div><p className="text-lg font-extrabold">पंडित सुमित शर्मा जी</p><p className="text-xs font-semibold text-[#9b6a3a]">प्रशासन डैशबोर्ड</p></div></div>
          <Link href="/" className="rounded-xl border border-[#ddc6a3] px-3 py-2 text-sm font-bold text-[#693417] transition hover:bg-amber-50">वेबसाइट देखें ↗</Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-7 p-4 sm:p-7 lg:grid-cols-[220px_minmax(0,1fr)] lg:p-10">
        <aside className="h-fit rounded-2xl border border-[#ead9bd] bg-[#fffdf9] p-3 shadow-[0_8px_28px_rgba(76,40,10,0.06)] lg:sticky lg:top-8">
          <p className="px-3 pb-2 pt-1 text-xs font-bold tracking-wide text-[#a46c35]">मुख्य मेनू</p>
          <a href="#dashboard" className="flex items-center gap-3 rounded-xl bg-[#783015] px-3 py-3 text-sm font-bold text-white">▦ डैशबोर्ड</a>
          <a href="#bookings" className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-[#623117] transition hover:bg-amber-50">▤ पूजा बुकिंग</a>
          <Link href="/puja-services" className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-[#623117] transition hover:bg-amber-50">◈ पूजा सेवाएं</Link>
        </aside>

        <section id="dashboard" className="min-w-0">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-bold text-[#a46c35]">बुकिंग प्रबंधन</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">एडमिन डैशबोर्ड</h1><p className="mt-2 text-sm text-[#795a41]">पूजा अनुरोध देखें और उनकी स्थिति अपडेट करें।</p></div><button type="button" onClick={() => void loadBookings()} className="rounded-xl bg-[#963a16] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#7b2d10]">↻ रीफ़्रेश करें</button></div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard label="कुल बुकिंग" value={stats.total} icon="▦" color="bg-[#f7e4c5] text-[#733312]" />
            <StatCard label="लंबित" value={stats.pending} icon="◷" color="bg-amber-100 text-amber-900" />
            <StatCard label="संपर्क किया गया" value={stats.contacted} icon="◉" color="bg-sky-100 text-sky-900" />
            <StatCard label="पुष्टि की गई" value={stats.confirmed} icon="✓" color="bg-emerald-100 text-emerald-900" />
            <StatCard label="रद्द की गई" value={stats.cancelled} icon="×" color="bg-rose-100 text-rose-900" />
          </div>

          <section id="bookings" className="mt-7 rounded-2xl border border-[#ead9bd] bg-[#fffdf9] shadow-[0_8px_28px_rgba(76,40,10,0.06)]">
            <div className="border-b border-[#eadfcf] p-5 sm:p-6"><h2 className="text-xl font-extrabold">पूजा बुकिंग</h2><p className="mt-1 text-sm text-[#795a41]">कुल {total} अनुरोध</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <input value={filters.search} onChange={(event) => changeFilter("search", event.target.value)} placeholder="नाम, मोबाइल या पूजा खोजें" className="min-h-11 rounded-xl border border-[#d9bd92] bg-white px-3 text-sm outline-none focus:border-[#963a16] focus:ring-4 focus:ring-[#f3d8b1]" />
                <select value={filters.status} onChange={(event) => changeFilter("status", event.target.value)} className="min-h-11 rounded-xl border border-[#d9bd92] bg-white px-3 text-sm outline-none focus:border-[#963a16]"><option value="">सभी स्थितियां</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
                <select value={filters.pujaService} onChange={(event) => changeFilter("pujaService", event.target.value)} className="min-h-11 rounded-xl border border-[#d9bd92] bg-white px-3 text-sm outline-none focus:border-[#963a16]"><option value="">सभी पूजा सेवाएं</option>{pujaServices.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}</select>
                <input type="date" value={filters.date} onChange={(event) => changeFilter("date", event.target.value)} aria-label="पसंदीदा तारीख से फ़िल्टर करें" className="min-h-11 rounded-xl border border-[#d9bd92] bg-white px-3 text-sm outline-none focus:border-[#963a16]" />
              </div>
            </div>

            {notice && <p role="status" className="mx-5 mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 sm:mx-6">{notice}</p>}
            {error && <p role="alert" className="mx-5 mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800 sm:mx-6">{error}</p>}

            <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-[#fff8ed] text-xs uppercase tracking-wide text-[#89613d]"><tr><th className="px-5 py-4 font-bold">ग्राहक</th><th className="px-4 py-4 font-bold">पूजा</th><th className="px-4 py-4 font-bold">पसंदीदा तिथि</th><th className="px-4 py-4 font-bold">स्थिति</th><th className="px-4 py-4 font-bold">अनुरोध</th><th className="px-5 py-4 text-right font-bold">कार्रवाई</th></tr></thead>
              <tbody>{loading ? <tr><td colSpan={6} className="px-5 py-12 text-center text-[#795a41]">बुकिंग डेटा लोड हो रहा है…</td></tr> : bookings.length === 0 ? <tr><td colSpan={6} className="px-5 py-12 text-center text-[#795a41]">इस फ़िल्टर के लिए कोई बुकिंग नहीं मिली।</td></tr> : bookings.map((booking) => <tr key={booking.id} className="border-t border-[#f0e4d1] align-top hover:bg-[#fffaf2]"><td className="px-5 py-4"><p className="font-bold">{booking.fullName}</p><p className="mt-1 text-xs text-[#795a41]">{booking.phone}</p></td><td className="px-4 py-4 font-medium">{serviceTitle(booking.pujaService)}</td><td className="px-4 py-4">{formatDate(booking.preferredDate)}<span className="mt-1 block text-xs text-[#795a41]">{timeLabels[booking.preferredTime]}</span></td><td className="px-4 py-4"><StatusBadge status={booking.status} /></td><td className="px-4 py-4 text-[#795a41]">{formatDate(booking.createdAt, true)}</td><td className="px-5 py-4 text-right"><button type="button" onClick={() => setSelected(booking)} className="rounded-lg px-3 py-2 text-xs font-bold text-[#8b3516] hover:bg-[#f8e6ca]">विवरण देखें</button></td></tr>)}</tbody></table></div>
            <div className="flex items-center justify-between gap-3 border-t border-[#eadfcf] px-5 py-4 sm:px-6"><p className="text-sm text-[#795a41]">पेज {page} / {totalPages}</p><div className="flex gap-2"><button type="button" disabled={page === 1 || loading} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-[#dcc39e] px-3 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-45">पूर्व</button><button type="button" disabled={page === totalPages || loading} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-[#dcc39e] px-3 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-45">अगला</button></div></div>
          </section>
        </section>
      </div>
      {selected && <BookingDetails booking={selected} busy={updatingId === selected.id} onClose={() => setSelected(null)} onStatusChange={updateStatus} />}
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: string; color: string }) { return <div className="rounded-2xl border border-[#ead9bd] bg-[#fffdf9] p-4 shadow-[0_8px_28px_rgba(76,40,10,0.06)]"><span className={`grid h-9 w-9 place-items-center rounded-xl text-lg font-bold ${color}`}>{icon}</span><p className="mt-4 text-2xl font-extrabold">{value}</p><p className="mt-1 text-sm font-semibold text-[#795a41]">{label}</p></div>; }

function BookingDetails({ booking, busy, onClose, onStatusChange }: { booking: Booking; busy: boolean; onClose: () => void; onStatusChange: (booking: Booking, status: BookingStatus) => void }) {
  const location = booking.locationType === "other" && booking.otherLocation ? booking.otherLocation : locationLabels[booking.locationType];
  return <div role="dialog" aria-modal="true" aria-labelledby="booking-title" className="fixed inset-0 z-50 grid place-items-end bg-[#291307]/45 p-0 sm:place-items-center sm:p-5"><div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-[#fffdf9] shadow-2xl sm:rounded-3xl"><div className="sticky top-0 flex items-start justify-between border-b border-[#eadfcf] bg-[#fffdf9] p-5 sm:p-6"><div><p className="text-sm font-bold text-[#a46c35]">बुकिंग विवरण</p><h2 id="booking-title" className="mt-1 text-2xl font-extrabold">{booking.fullName}</h2><p className="mt-1 font-mono text-xs text-[#795a41]">ID: {booking.id}</p></div><button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl text-xl text-[#6d371b] hover:bg-amber-50" aria-label="विवरण बंद करें">×</button></div><div className="space-y-6 p-5 sm:p-6"><InfoSection title="ग्राहक की जानकारी" items={[["मोबाइल नंबर", booking.phone], ["ईमेल", booking.email || "—"], ["शहर / स्थान", booking.city]]} /><InfoSection title="पूजा की जानकारी" items={[["पूजा", serviceTitle(booking.pujaService)], ["पसंदीदा तिथि", formatDate(booking.preferredDate)], ["पसंदीदा समय", timeLabels[booking.preferredTime]], ["पूजा का स्थान", location], ["उद्देश्य", booking.purpose], ["अतिरिक्त जानकारी", booking.additionalInfo || "—"]]} />{(booking.birthDate || booking.birthTime || booking.birthPlace) && <InfoSection title="जन्म संबंधी जानकारी" items={[["जन्म तिथि", booking.birthDate ? formatDate(booking.birthDate) : "—"], ["जन्म समय", booking.birthTime || "—"], ["जन्म स्थान", booking.birthPlace || "—"]]} />}<InfoSection title="सिस्टम जानकारी" items={[["अनुरोध की तारीख", formatDate(booking.createdAt, true)], ["अंतिम अपडेट", formatDate(booking.updatedAt, true)]]} /><div className="rounded-2xl border border-[#ead9bd] bg-[#fff8ed] p-4"><label htmlFor="status" className="block text-sm font-extrabold">बुकिंग स्थिति</label><div className="mt-3 flex flex-wrap items-center gap-3"><StatusBadge status={booking.status} /><select id="status" value={booking.status} disabled={busy} onChange={(event) => onStatusChange(booking, event.target.value as BookingStatus)} className="min-h-10 rounded-xl border border-[#d9bd92] bg-white px-3 text-sm font-semibold outline-none focus:border-[#963a16] disabled:opacity-60">{statusTransitions[booking.status].map((value) => <option key={value} value={value}>{statusLabels[value]}</option>)}</select>{busy && <span className="text-sm text-[#795a41]">अपडेट हो रहा है…</span>}</div></div></div></div></div>;
}

function InfoSection({ title, items }: { title: string; items: [string, string][] }) { return <section><h3 className="text-base font-extrabold text-[#703216]">{title}</h3><dl className="mt-3 grid gap-3 sm:grid-cols-2">{items.map(([label, value]) => <div key={label} className="rounded-xl border border-[#eee0ca] bg-white p-3"><dt className="text-xs font-bold uppercase tracking-wide text-[#9b6a3a]">{label}</dt><dd className="mt-1 whitespace-pre-wrap break-words text-sm font-medium leading-6 text-[#482411]">{value}</dd></div>)}</dl></section>; }

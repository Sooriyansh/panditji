import type { MonthlyOverview } from "@/lib/panchang/types";

type Props = { year: number; month: number; selectedDate: string; overview?: MonthlyOverview; onMonthChange: (delta: number) => void; onSelect: (date: string) => void };
const weekdays = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];
const monthNames = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
const iso = (year: number, month: number, day: number) => `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export default function PanchangCalendar({ year, month, selectedDate, overview, onMonthChange, onSelect }: Props) {
  const offset = new Date(year, month - 1, 1).getDay(); const lastDay = new Date(year, month, 0).getDate(); const today = new Date().toISOString().slice(0, 10);
  const days = Array.from({ length: offset + lastDay }, (_, index) => index < offset ? undefined : index - offset + 1);
  const markerMap = new Map(overview?.days.map((entry) => [entry.date, entry.markers]) ?? []);
  return <section aria-labelledby="calendar-heading" className="rounded-3xl border border-[#ead6b9] bg-[#fffdf9] p-4 shadow-[0_14px_36px_rgba(94,52,18,0.09)] sm:p-6">
    <div className="mb-5 flex items-center justify-between gap-3"><div><p className="text-xs font-bold tracking-[0.16em] text-[#a85e25]">तिथि चुनें</p><h2 id="calendar-heading" className="mt-1 text-xl font-bold text-[#51230f]">{monthNames[month - 1]} {year}</h2></div><div className="flex gap-2"><button type="button" onClick={() => onMonthChange(-1)} aria-label="पिछला महीना" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e1c8a8] text-xl text-[#6b3215] hover:bg-amber-50">‹</button><button type="button" onClick={() => onMonthChange(1)} aria-label="अगला महीना" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e1c8a8] text-xl text-[#6b3215] hover:bg-amber-50">›</button></div></div>
    <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-[#9c6a3d] sm:gap-2 sm:text-xs">{weekdays.map((day) => <div key={day} className="pb-1">{day}</div>)}</div>
    <div className="grid grid-cols-7 gap-1 sm:gap-2">{days.map((day, index) => {
      if (!day) return <div key={`blank-${index}`} aria-hidden="true" />;
      const date = iso(year, month, day); const markers = markerMap.get(date) ?? []; const active = date === selectedDate; const isToday = date === today;
      return <button key={date} type="button" onClick={() => onSelect(date)} aria-label={`${day} ${monthNames[month - 1]}${markers.length ? `, ${markers.map((marker) => marker.name).join(", ")}` : ""}`} aria-pressed={active} className={`min-h-[56px] rounded-xl border p-1 text-left transition focus:outline-2 focus:outline-offset-2 focus:outline-[#8b3516] sm:min-h-[66px] sm:p-2 ${active ? "border-[#8b3516] bg-[#8b3516] text-white shadow-md" : isToday ? "border-[#d79435] bg-[#fff4d9] text-[#6b3215]" : "border-transparent text-[#603014] hover:border-[#e1c8a8] hover:bg-amber-50"}`}><span className="block text-sm font-bold">{day}</span>{markers.slice(0, 1).map((marker) => <span key={`${marker.name}-${marker.date}`} className={`mt-1 block truncate text-[9px] leading-3 sm:text-[10px] ${active ? "text-amber-100" : "text-[#a35420]"}`}>● {marker.name}</span>)}</button>;
    })}</div>
  </section>;
}

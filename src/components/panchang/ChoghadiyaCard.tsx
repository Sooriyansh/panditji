import type { ChoghadiyaPeriod } from "@/lib/panchang/types";

function formatTime(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("hi-IN", { hour: "numeric", minute: "2-digit", hour12: true }).format(date); }
function statusLabel(status: ChoghadiyaPeriod["status"]) { return status === "auspicious" ? "शुभ" : status === "inauspicious" ? "अशुभ" : "सामान्य"; }

export default function ChoghadiyaCard({ day, night }: { day: ChoghadiyaPeriod[]; night: ChoghadiyaPeriod[] }) {
  if (!day.length && !night.length) return null;
  const column = (title: string, periods: ChoghadiyaPeriod[]) => <div><h3 className="text-sm font-bold text-[#6b3215]">{title}</h3><div className="mt-3 grid gap-2">{periods.map((period, index) => <div key={`${period.name}-${period.start}-${index}`} className="rounded-xl border border-amber-100 bg-[#fffcf5] p-3"><div className="flex items-center justify-between gap-2"><p className="font-bold text-[#51230f]">{period.name}</p><span className={`rounded-full px-2 py-0.5 text-xs font-bold ${period.status === "auspicious" ? "bg-emerald-50 text-emerald-700" : period.status === "inauspicious" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-[#8d5b2b]"}`}>{statusLabel(period.status)}</span></div><p className="mt-1 text-xs text-[#70401f]">{formatTime(period.start)} – {formatTime(period.end)}</p>{period.type && <p className="mt-1 text-xs text-[#9c6a3d]">{period.type}</p>}</div>)}</div></div>;
  return <section aria-labelledby="choghadiya-heading" className="rounded-3xl border border-[#ead6b9] bg-[#fffdf9] p-5 shadow-[0_14px_36px_rgba(94,52,18,0.09)]"><p className="text-xs font-bold tracking-[0.16em] text-[#a85e25]">समय-विभाग</p><h2 id="choghadiya-heading" className="mt-1 text-2xl font-bold text-[#51230f]">आज का चौघड़िया</h2><div className="mt-5 grid gap-5 md:grid-cols-2">{column("दिन का चौघड़िया", day)}{column("रात्रि का चौघड़िया", night)}</div></section>;
}

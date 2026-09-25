import { useState } from "react";
import type { PanchangLocation } from "@/lib/panchang/types";

type Props = { location: PanchangLocation; onChange: (location: PanchangLocation) => void };
const ujjain: PanchangLocation = { city: "उज्जैन", state: "मध्य प्रदेश", country: "भारत", latitude: 23.1765, longitude: 75.7885, timezone: "Asia/Kolkata" };

export default function LocationSelector({ location, onChange }: Props) {
  const [open, setOpen] = useState(false); const [draft, setDraft] = useState(location); const [error, setError] = useState("");
  const change = (key: keyof PanchangLocation, value: string) => setDraft((current) => ({ ...current, [key]: key === "latitude" || key === "longitude" ? Number(value) : value }));
  const save = () => {
    if (!draft.city.trim() || !draft.country.trim() || !Number.isFinite(draft.latitude) || !Number.isFinite(draft.longitude) || draft.latitude < -90 || draft.latitude > 90 || draft.longitude < -180 || draft.longitude > 180 || !draft.timezone.trim()) { setError("कृपया स्थान और सही अक्षांश-देशांतर भरें।"); return; }
    onChange(draft); setError(""); setOpen(false);
  };
  return <section className="rounded-2xl border border-[#ead6b9] bg-[#fffdf9] p-4 shadow-[0_10px_28px_rgba(94,52,18,0.07)]"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold tracking-[0.14em] text-[#a85e25]">स्थान</p><p className="mt-1 font-bold text-[#51230f]">{location.city}, {location.state}</p><p className="text-xs text-[#85603c]">{location.latitude.toFixed(4)}, {location.longitude.toFixed(4)} · {location.timezone}</p></div><button type="button" onClick={() => { setDraft(location); setOpen((current) => !current); }} aria-expanded={open} className="min-h-10 rounded-xl border border-[#a85e25] px-4 text-sm font-bold text-[#6b3215] hover:bg-amber-50">स्थान बदलें</button></div>
    {open && <div className="mt-4 border-t border-amber-100 pt-4"><div className="grid gap-3 sm:grid-cols-2">{([['city', 'शहर'], ['state', 'राज्य'], ['country', 'देश'], ['latitude', 'अक्षांश'], ['longitude', 'देशांतर'], ['timezone', 'टाइमज़ोन']] as const).map(([key, label]) => <label key={key} className="grid gap-1 text-sm font-semibold text-[#70401f]">{label}<input value={draft[key]} onChange={(event) => change(key, event.target.value)} className="min-h-10 rounded-lg border border-[#dfc6a4] bg-white px-3 font-normal outline-none focus:border-[#8b3516]" /></label>)}</div>{error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}<div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={save} className="min-h-10 rounded-xl bg-[#8b3516] px-4 text-sm font-bold text-white hover:bg-[#74270e]">स्थान लागू करें</button><button type="button" onClick={() => { setDraft(ujjain); onChange(ujjain); setOpen(false); }} className="min-h-10 rounded-xl border border-[#dfc6a4] px-4 text-sm font-bold text-[#6b3215] hover:bg-amber-50">उज्जैन चुनें</button></div></div>}
  </section>;
}

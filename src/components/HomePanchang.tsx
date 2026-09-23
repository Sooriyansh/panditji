"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PanchangApiResponse, PanchangData } from "@/lib/panchang/types";

const defaultQuery = "lat=23.1765&lon=75.7885";
const dateFormatter = new Intl.DateTimeFormat("hi-IN", { day: "numeric", month: "long", year: "numeric", weekday: "long" });

function displayTime(value?: string) {
  if (!value) return "जानकारी उपलब्ध नहीं";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("hi-IN", { hour: "numeric", minute: "2-digit", hour12: true }).format(date);
}

function Detail({ label, value }: { label: string; value?: string }) {
  return <div className="rounded-xl border border-amber-100 bg-[#fffcf5] px-3 py-3"><dt className="text-xs font-bold text-[#9c6a3d]">{label}</dt><dd className="mt-1 text-sm font-bold text-[#51230f]">{value ?? "जानकारी उपलब्ध नहीं"}</dd></div>;
}

export default function HomePanchang() {
  const [data, setData] = useState<PanchangData>(); const [failed, setFailed] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const controller = new AbortController();
    void fetch(`/api/panchang?view=details&date=${today}&${defaultQuery}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Panchang request failed");
        const body = await response.json() as PanchangApiResponse;
        if (!body.details) throw new Error("Panchang data missing");
        setData(body.details);
      })
      .catch((error: unknown) => { if ((error as Error).name !== "AbortError") setFailed(true); });
    return () => controller.abort();
  }, [today]);

  return <section aria-labelledby="home-panchang-title" className="bg-[#fff4df] px-5 py-14 sm:px-8 sm:py-18 lg:px-12"><div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[2rem] border border-[#e2c186] bg-[#fffdf9] p-6 shadow-[0_18px_48px_rgba(91,48,15,0.11)] sm:p-9 lg:grid-cols-[0.85fr_1.15fr] lg:p-10"><div><p className="text-sm font-bold tracking-[0.16em] text-[#a85e25]">उज्जैन, मध्य प्रदेश</p><h2 id="home-panchang-title" className="mt-3 text-3xl font-bold tracking-tight text-[#51230f] sm:text-4xl">आज का पंचांग</h2><p className="mt-3 text-base leading-7 text-[#70401f]">{dateFormatter.format(new Date(`${today}T12:00:00`))}</p><p className="mt-5 max-w-md leading-7 text-[#75441f]">तिथि, नक्षत्र, चौघड़िया और शुभ समय की प्रमाणित दैनिक जानकारी देखें।</p><Link href="/panchang" className="mt-7 inline-flex min-h-11 items-center rounded-xl bg-[#8b3516] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(110,45,16,0.2)] transition hover:-translate-y-0.5 hover:bg-[#a9481e] focus:outline-none focus:ring-2 focus:ring-[#b56a28] focus:ring-offset-2">पूरा पंचांग देखें <span aria-hidden="true" className="ml-2">→</span></Link></div>
    <div>{!data && !failed && <div aria-label="पंचांग की जानकारी लोड हो रही है" className="grid animate-pulse gap-3 sm:grid-cols-2">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-[74px] rounded-xl bg-amber-50" />)}</div>}{failed && <div className="rounded-2xl border border-[#edcfb0] bg-[#fff8ed] p-6"><p className="font-bold text-[#6b3215]">पंचांग की जानकारी अभी उपलब्ध नहीं है।</p><p className="mt-2 text-sm leading-6 text-[#70401f]">पूर्ण विवरण के लिए कुछ देर बाद पुनः प्रयास करें।</p></div>}{data && <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"><Detail label="तिथि" value={data.tithi?.name} /><Detail label="नक्षत्र" value={data.nakshatra?.name} /><Detail label="योग" value={data.yoga?.name} /><Detail label="सूर्योदय" value={displayTime(data.sunrise)} /><Detail label="सूर्यास्त" value={displayTime(data.sunset)} /><Detail label="राहु काल" value={data.dayPeriods.rahuKaal ? `${displayTime(data.dayPeriods.rahuKaal.start)} – ${displayTime(data.dayPeriods.rahuKaal.end)}` : undefined} /></dl>}</div>
  </div></section>;
}

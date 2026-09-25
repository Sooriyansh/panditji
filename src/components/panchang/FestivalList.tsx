import type { Festival } from "@/lib/panchang/types";

export default function FestivalList({ festivals }: { festivals: Festival[] }) {
  if (!festivals.length) return null;
  return <section aria-labelledby="festivals-heading" className="rounded-3xl border border-[#ead6b9] bg-[#fffdf9] p-5 shadow-[0_14px_36px_rgba(94,52,18,0.09)]"><p className="text-xs font-bold tracking-[0.16em] text-[#a85e25]">धार्मिक दिवस</p><h2 id="festivals-heading" className="mt-1 text-2xl font-bold text-[#51230f]">व्रत और त्योहार</h2><ul className="mt-4 grid gap-2 sm:grid-cols-2">{festivals.map((festival, index) => <li key={`${festival.name}-${index}`} className="rounded-xl bg-[#fff7e8] px-3 py-2 text-sm font-semibold text-[#6b3215]">✦ {festival.name}</li>)}</ul></section>;
}

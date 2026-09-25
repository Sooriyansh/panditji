export default function PanchangSkeleton({ calendar = false }: { calendar?: boolean }) {
  return <div aria-label="पंचांग की जानकारी लोड हो रही है" className="animate-pulse rounded-3xl border border-[#ead6b9] bg-[#fffdf9] p-5 shadow-[0_14px_36px_rgba(94,52,18,0.09)]">
    <div className="h-5 w-36 rounded bg-amber-100" />
    <div className={`mt-5 grid gap-3 ${calendar ? "grid-cols-7" : "sm:grid-cols-2"}`}>{Array.from({ length: calendar ? 35 : 8 }, (_, index) => <div key={index} className={`rounded-xl bg-amber-50 ${calendar ? "h-16" : "h-14"}`} />)}</div>
  </div>;
}

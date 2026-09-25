export default function PanchangError({ onRetry }: { onRetry: () => void }) {
  return <section role="alert" className="rounded-3xl border border-[#edcfb0] bg-[#fff8ed] p-6 text-center shadow-[0_14px_36px_rgba(94,52,18,0.07)]"><p className="text-lg font-bold text-[#6b3215]">पंचांग की जानकारी अभी उपलब्ध नहीं है।</p><p className="mt-2 text-sm leading-6 text-[#70401f]">कृपया थोड़ी देर बाद पुनः प्रयास करें।</p><button type="button" onClick={onRetry} className="mt-5 min-h-11 rounded-xl bg-[#8b3516] px-5 font-bold text-white transition hover:bg-[#74270e]">पुनः प्रयास करें</button></section>;
}

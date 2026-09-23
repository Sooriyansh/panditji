"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Review } from "@/types/review";

const promptKey = "panditji-rating-prompt-seen";

function Stars({ value, onChange, size = "text-2xl" }: { value: number; onChange?: (rating: number) => void; size?: string }) {
  return <div className={`flex gap-1 ${size}`} aria-label={`${value} out of 5 stars`}>{[1, 2, 3, 4, 5].map((star) => onChange ? <button key={star} type="button" onClick={() => onChange(star)} className={`leading-none transition hover:scale-110 ${star <= value ? "text-amber-500" : "text-stone-300"}`} aria-label={`${star} stars`} aria-pressed={star === value}>★</button> : <span key={star} className={star <= value ? "text-amber-500" : "text-stone-300"} aria-hidden="true">★</span>)}</div>;
}

function RatingForm({ onSaved }: { onSaved: (review: Review) => void }) {
  const [name, setName] = useState(""); const [rating, setRating] = useState(0); const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false); const [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage("");
    if (name.trim().length < 2 || !rating) { setMessage("Please enter your name and select a star rating."); return; }
    setSending(true);
    try {
      const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, rating, comment }) });
      const data = await response.json() as { review?: Review; message?: string };
      if (!response.ok || !data.review) throw new Error(data.message || "Rating could not be saved.");
      onSaved(data.review); setMessage("Thank you! Your rating is now visible below."); setName(""); setRating(0); setComment("");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Rating could not be saved."); }
    finally { setSending(false); }
  }
  return <form onSubmit={submit} className="mt-5 space-y-3">
    <label className="block text-left text-sm font-bold text-[#623117]">Your rating <Stars value={rating} onChange={setRating} /></label>
    <input value={name} onChange={(event) => setName(event.target.value)} maxLength={60} placeholder="Your name" className="min-h-11 w-full rounded-xl border border-[#d9bd92] bg-white px-3 text-sm outline-none focus:border-[#963a16] focus:ring-4 focus:ring-[#f3d8b1]" />
    <textarea value={comment} onChange={(event) => setComment(event.target.value)} maxLength={500} rows={3} placeholder="Write a short review (optional)" className="w-full resize-none rounded-xl border border-[#d9bd92] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#963a16] focus:ring-4 focus:ring-[#f3d8b1]" />
    {message && <p role="status" className="text-sm font-semibold text-[#703216]">{message}</p>}
    <button type="submit" disabled={sending} className="min-h-11 w-full rounded-xl bg-[#963a16] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#7b2d10] disabled:cursor-not-allowed disabled:opacity-60">{sending ? "Submitting…" : "Submit rating"}</button>
  </form>;
}

export default function RatingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]); const [showPrompt, setShowPrompt] = useState(false); const [formOpen, setFormOpen] = useState(false);
  useEffect(() => { void fetch("/api/reviews", { cache: "no-store" }).then(async (response) => response.ok ? response.json() as Promise<{ reviews: Review[] }> : { reviews: [] }).then((data) => setReviews(data.reviews)).catch(() => undefined); }, []);
  useEffect(() => {
    const target = sectionRef.current; if (!target || localStorage.getItem(promptKey)) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { localStorage.setItem(promptKey, "true"); setShowPrompt(true); observer.disconnect(); } }, { threshold: 0.25 });
    observer.observe(target); return () => observer.disconnect();
  }, []);
  const saved = useCallback((review: Review) => { setReviews((current) => [review, ...current]); setFormOpen(false); setShowPrompt(false); }, []);
  const closePrompt = () => { setShowPrompt(false); };
  return <>
    <section ref={sectionRef} id="ratings" className="border-t border-[#ead9bd] bg-[#fff4df] px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-extrabold tracking-wide text-[#a46c35]">CUSTOMER REVIEWS</p><h2 className="mt-1 text-3xl font-extrabold tracking-tight text-[#3f210f]">Share your experience</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#795a41]">Your feedback helps other families choose their puja service with confidence.</p></div><button type="button" onClick={() => setFormOpen((value) => !value)} className="rounded-xl bg-[#963a16] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#7b2d10]">{formOpen ? "Close rating form" : "Give a rating"}</button></div>
        {formOpen && <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-[#e2c393] bg-[#fffdf9] p-5 shadow-sm"><h3 className="text-lg font-extrabold">Rate Pandit Sumit Sharma Ji</h3><RatingForm onSaved={saved} /></div>}
        <div className="mt-8 overflow-x-auto pb-3 [scrollbar-color:#c99354_transparent]">
          <div className="flex min-w-max gap-4">{reviews.length ? reviews.map((review) => <article key={review.id} className="w-[280px] rounded-2xl border border-[#ead9bd] bg-[#fffdf9] p-5 shadow-[0_6px_18px_rgba(76,40,10,0.07)]"><Stars value={review.rating} size="text-lg" /><h3 className="mt-4 font-extrabold text-[#482411]">{review.name}</h3><p className="mt-1 text-xs text-[#9b6a3a]">{new Intl.DateTimeFormat("en-IN", { month: "short", year: "numeric" }).format(new Date(review.createdAt))}</p><p className="mt-3 min-h-12 text-sm leading-6 text-[#795a41]">{review.comment || "Shared a rating for our service."}</p></article>) : <div className="rounded-2xl border border-dashed border-[#d6b783] bg-[#fffaf2] px-5 py-7 text-sm text-[#795a41]">Be the first to rate your experience.</div>}</div>
        </div>
      </div>
    </section>
    {showPrompt && <div role="dialog" aria-modal="true" aria-labelledby="rating-prompt-title" className="fixed inset-0 z-[70] grid place-items-center bg-[#291307]/55 p-4"><div className="w-full max-w-md rounded-3xl bg-[#fffdf9] p-6 text-center shadow-2xl"><button type="button" onClick={closePrompt} aria-label="Close rating prompt" className="float-right -mr-2 -mt-2 grid h-9 w-9 place-items-center rounded-lg text-xl text-[#6d371b] hover:bg-amber-50">×</button><p className="text-4xl text-amber-500">★★★★★</p><h2 id="rating-prompt-title" className="mt-3 text-2xl font-extrabold text-[#3f210f]">How was your experience?</h2><p className="mt-2 text-sm leading-6 text-[#795a41]">You have reached the end of the website. A quick rating would mean a lot to us.</p><RatingForm onSaved={saved} /><button type="button" onClick={closePrompt} className="mt-4 text-sm font-bold text-[#795a41] underline underline-offset-4">Maybe later</button></div></div>}
  </>;
}

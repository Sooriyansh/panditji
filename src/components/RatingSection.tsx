"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Review } from "@/types/review";

const promptKey = "panditji-rating-prompt-seen";

function Stars({
  value,
  onChange,
  size = "text-2xl",
}: {
  value: number;
  onChange?: (rating: number) => void;
  size?: string;
}) {
  return (
    <div
      className={`flex items-center gap-1 ${size}`}
      aria-label={`${value} में से 5 सितारे`}
    >
      {[1, 2, 3, 4, 5].map((star) =>
        onChange ? (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`leading-none transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 ${
              star <= value
                ? "text-[#C69A42] drop-shadow-[0_2px_5px_rgba(198,154,66,0.25)]"
                : "text-[#DCCDB8]"
            }`}
            aria-label={`${star} सितारे`}
            aria-pressed={star === value}
          >
            ★
          </button>
        ) : (
          <span
            key={star}
            className={`leading-none ${
              star <= value ? "text-[#C69A42]" : "text-[#DCCDB8]"
            }`}
            aria-hidden="true"
          >
            ★
          </span>
        )
      )}
    </div>
  );
}

function RatingForm({ onSaved }: { onSaved: (review: Review) => void }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (name.trim().length < 2 || !rating) {
      setMessage("कृपया अपना नाम लिखें और सितारों में रेटिंग चुनें।");
      return;
    }

    setSending(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          rating,
          comment,
        }),
      });

      const data = (await response.json()) as {
        review?: Review;
        message?: string;
      };

      if (!response.ok || !data.review) {
        throw new Error(data.message || "आपकी रेटिंग सेव नहीं हो सकी।");
      }

      onSaved(data.review);

      setMessage("धन्यवाद! आपकी रेटिंग सफलतापूर्वक साझा कर दी गई है।");
      setName("");
      setRating(0);
      setComment("");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "आपकी रेटिंग सेव नहीं हो सकी।"
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-5">
      {/* Rating */}
      <div className="rounded-2xl border border-[#ead9bd] bg-[#fff9ef] p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A46C35]">
              आपका अनुभव
            </p>

            <p className="mt-1 text-sm font-bold text-[#623117]">
              आप हमारे सेवा अनुभव को कितनी रेटिंग देंगे?
            </p>
          </div>

          <Stars value={rating} onChange={setRating} />
        </div>
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="review-name"
          className="mb-2 block text-xs font-bold text-[#623117]"
        >
          आपका नाम
        </label>

        <input
          id="review-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={60}
          placeholder="अपना नाम लिखें"
          className="min-h-12 w-full rounded-xl border border-[#dec7a6] bg-white px-4 text-sm text-[#482411] placeholder:text-[#ad977d] outline-none transition-all duration-200 focus:border-[#963A16] focus:ring-4 focus:ring-[#963A16]/10"
        />
      </div>

      {/* Comment */}
      <div>
        <label
          htmlFor="review-comment"
          className="mb-2 block text-xs font-bold text-[#623117]"
        >
          आपका अनुभव
          <span className="ml-1 font-medium text-[#A58B72]">
            (वैकल्पिक)
          </span>
        </label>

        <textarea
          id="review-comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          maxLength={500}
          rows={4}
          placeholder="पूजा, अनुष्ठान या परामर्श से जुड़ा अपना अनुभव साझा करें..."
          className="w-full resize-none rounded-xl border border-[#dec7a6] bg-white px-4 py-3 text-sm leading-6 text-[#482411] placeholder:text-[#ad977d] outline-none transition-all duration-200 focus:border-[#963A16] focus:ring-4 focus:ring-[#963A16]/10"
        />
      </div>

      {message && (
        <div
          role="status"
          className="rounded-xl border border-[#e5cda9] bg-[#fff7e8] px-4 py-3 text-sm font-semibold leading-6 text-[#703216]"
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group relative min-h-12 w-full overflow-hidden rounded-xl bg-[#963A16] px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(150,58,22,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7B2D10] hover:shadow-[0_15px_32px_rgba(150,58,22,0.23)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="relative z-10">
          {sending ? "साझा किया जा रहा है…" : "अपनी रेटिंग साझा करें"}
        </span>
      </button>
    </form>
  );
}

export default function RatingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    void fetch("/api/reviews", {
      cache: "no-store",
    })
      .then(async (response) =>
        response.ok
          ? (response.json() as Promise<{ reviews: Review[] }>)
          : { reviews: [] }
      )
      .then((data) => setReviews(data.reviews))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const target = sectionRef.current;

    if (!target || localStorage.getItem(promptKey)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          localStorage.setItem(promptKey, "true");
          setShowPrompt(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  const saved = useCallback((review: Review) => {
    setReviews((current) => [review, ...current]);
    setFormOpen(false);
    setShowPrompt(false);
  }, []);

  const closePrompt = () => {
    setShowPrompt(false);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="ratings"
        className="relative overflow-hidden border-t border-[#ead9bd] bg-[#fff7e9] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#C69A42]/[0.055] blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#963A16]/[0.045] blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-12 bg-[#C69A42]" />

                <p className="text-[11px] font-extrabold tracking-[0.24em] text-[#A46C35]">
                  श्रद्धालुओं के अनुभव
                </p>

                <span className="h-px w-12 bg-[#C69A42]" />
              </div>

              <h2 className="text-3xl font-extrabold leading-[1.12] tracking-[-0.035em] text-[#3F210F] sm:text-4xl lg:text-5xl">
                आपका अनुभव,
                <span className="block text-[#963A16]">
                  हमारे लिए महत्वपूर्ण है।
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#795A41] sm:text-base">
                पूजा, अनुष्ठान या ज्योतिष परामर्श के बाद अपना अनुभव हमारे साथ
                साझा करें। आपकी प्रतिक्रिया अन्य श्रद्धालुओं के लिए भी
                उपयोगी हो सकती है।
              </p>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() => setFormOpen((value) => !value)}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#963A16] px-6 py-3 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(150,58,22,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7B2D10] hover:shadow-[0_15px_32px_rgba(150,58,22,0.23)] sm:w-auto"
            >
              <span>
                {formOpen ? "फॉर्म बंद करें" : "अपना अनुभव साझा करें"}
              </span>

              <span className="text-[#F1D49D] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          {/* FORM */}
          {formOpen && (
            <div className="mx-auto mt-10 max-w-2xl">
              <div className="relative overflow-hidden rounded-3xl border border-[#e2c393] bg-[#fffdf9] p-5 shadow-[0_20px_65px_rgba(76,40,10,0.09)] sm:p-8">
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-1 w-full bg-[#C69A42]"
                />

                <div className="mb-6">
                  <p className="text-[10px] font-extrabold tracking-[0.2em] text-[#A46C35]">
                    अपना अनुभव साझा करें
                  </p>

                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#3F210F]">
                    पंडित सुमित शर्मा जी को रेटिंग दें
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#795A41]">
                    आपके कुछ शब्द हमारे लिए बहुत मायने रखते हैं।
                  </p>
                </div>

                <RatingForm onSaved={saved} />
              </div>
            </div>
          )}

          {/* REVIEWS */}
          <div className="mt-14 sm:mt-16">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.2em] text-[#A46C35]">
                  अनुभव और प्रतिक्रियाएँ
                </p>

                <h3 className="mt-1 text-lg font-extrabold text-[#482411]">
                  श्रद्धालुओं ने क्या कहा
                </h3>
              </div>

              {reviews.length > 0 && (
                <div className="hidden rounded-full border border-[#e2cda9] bg-[#fffaf0] px-3 py-1.5 text-xs font-bold text-[#8E6848] sm:block">
                  {reviews.length}{" "}
                  {reviews.length === 1 ? "प्रतिक्रिया" : "प्रतिक्रियाएँ"}
                </div>
              )}
            </div>

            {/* Review cards */}
            <div className="overflow-x-auto pb-5 [scrollbar-color:#c99354_transparent]">
              <div className="flex min-w-max gap-5">
                {reviews.length ? (
                  reviews.map((review) => (
                    <article
                      key={review.id}
                      className="group relative flex w-[290px] flex-col overflow-hidden rounded-3xl border border-[#ead9bd] bg-[#fffdf9] p-5 shadow-[0_8px_28px_rgba(76,40,10,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d9bd92] hover:shadow-[0_18px_42px_rgba(76,40,10,0.10)] sm:w-[320px]"
                    >
                      {/* Gold accent */}
                      <div
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-1 w-20 rounded-r-full bg-[#C69A42]"
                      />

                      {/* Stars + quote */}
                      <div className="flex items-start justify-between">
                        <Stars value={review.rating} size="text-lg" />

                        <span
                          aria-hidden="true"
                          className="font-serif text-4xl leading-none text-[#C69A42]/25"
                        >
                          ”
                        </span>
                      </div>

                      {/* Review text */}
                      <p className="mt-5 min-h-[100px] text-sm leading-7 text-[#795A41]">
                        {review.comment ||
                          "हमारी सेवा के लिए अपनी रेटिंग साझा की।"}
                      </p>

                      {/* Divider */}
                      <div className="my-5 h-px bg-[#ead9bd]" />

                      {/* User */}
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#963A16] text-sm font-extrabold text-[#F7E6C5]">
                          {review.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-extrabold text-[#482411]">
                            {review.name}
                          </h3>

                          <p className="mt-0.5 text-xs text-[#9B6A3A]">
                            {new Intl.DateTimeFormat("hi-IN", {
                              month: "short",
                              year: "numeric",
                            }).format(new Date(review.createdAt))}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="flex min-h-[190px] w-full items-center justify-center rounded-3xl border border-dashed border-[#d6b783] bg-[#fffaf2] px-6 text-center">
                    <div>
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#e5cda9] bg-[#fff5df]">
                        <span className="text-xl text-[#C69A42]">★</span>
                      </div>

                      <p className="mt-4 text-sm font-bold text-[#623117]">
                        अभी पहली प्रतिक्रिया आपकी हो सकती है।
                      </p>

                      <p className="mt-1 text-xs text-[#9B795D]">
                        अपना अनुभव साझा करने के लिए ऊपर दिए गए बटन पर क्लिक
                        करें।
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {reviews.length > 0 && (
              <p className="mt-1 text-center text-[11px] font-medium text-[#A58B72] sm:hidden">
                ← प्रतिक्रियाएँ देखने के लिए स्वाइप करें →
              </p>
            )}
          </div>
        </div>
      </section>

      {/* RATING PROMPT */}
      {showPrompt && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="rating-prompt-title"
          className="fixed inset-0 z-[70] grid place-items-center bg-[#291307]/60 p-4 backdrop-blur-[4px]"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-[#ead9bd] bg-[#fffdf9] shadow-[0_30px_100px_rgba(41,19,7,0.28)]">
            {/* Gold top line */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-1 w-full bg-[#C69A42]"
            />

            <div className="p-6 sm:p-8">
              {/* Close */}
              <button
                type="button"
                onClick={closePrompt}
                aria-label="बंद करें"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-xl text-[#6D371B] transition-colors hover:bg-[#FFF3DF]"
              >
                ×
              </button>

              {/* Icon */}
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#e6cfa9] bg-[#FFF5DF]">
                <span className="text-2xl text-[#C69A42]">★</span>
              </div>

              <div className="mt-5 text-center">
                <div className="flex justify-center">
                  <Stars value={5} size="text-xl" />
                </div>

                <h2
                  id="rating-prompt-title"
                  className="mt-4 text-2xl font-extrabold tracking-tight text-[#3F210F] sm:text-3xl"
                >
                  आपका अनुभव कैसा रहा?
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#795A41]">
                  आपने हमारी वेबसाइट देखी है। यदि आपको हमारा कार्य और सेवा
                  पसंद आई हो, तो अपनी एक छोटी-सी प्रतिक्रिया अवश्य साझा करें।
                </p>
              </div>

              <RatingForm onSaved={saved} />

              <button
                type="button"
                onClick={closePrompt}
                className="mt-5 w-full text-center text-sm font-bold text-[#795A41] underline decoration-[#C69A42]/50 underline-offset-4 transition-colors hover:text-[#963A16]"
              >
                अभी नहीं, बाद में
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
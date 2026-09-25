"use client";

import { useLayoutEffect, useRef } from "react";
import { Star, Quote, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Priya",
    location: "Indore, MP",
    service: "मंगल दोष पूजा",
    review:
      "पूजा के पहले पंडित जी ने पूरी विधि और पूजा में होने वाले प्रमुख चरणों के बारे में बताया। अनुष्ठान शांतिपूर्वक और व्यवस्थित तरीके से हुआ। हमें पूरी प्रक्रिया समझने में आसानी रही।",
    rating: 5,
  },
  {
    name: "Rahul",
    location: "Bhopal, MP",
    service: "कालसर्प पूजा",
    review:
      "हमने कालसर्प पूजा के लिए संपर्क किया था। समय और पूजा की तैयारी के बारे में पहले ही जानकारी मिल गई थी। पूरी पूजा विधि के अनुसार कराई गई और हमारे सवालों का भी जवाब दिया गया।",
    rating: 5,
  },
  {
    name: "Neha",
    location: "Ujjain, MP",
    service: "रुद्राभिषेक",
    review:
      "रुद्राभिषेक का अनुभव बहुत शांत और अच्छा रहा। पूजा की सामग्री और विधि के बारे में पहले से बताया गया था। पूरे अनुष्ठान के दौरान पंडित जी ने आवश्यक मार्गदर्शन दिया।",
    rating: 5,
  },
];

export default function ClientReviews() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      if (!cards.length) return;

      /*
       * ---------------------------------------------------------
       * GSAP IS ONLY USED FOR THE SMALL DEPTH EFFECT.
       *
       * STICKY BEHAVIOUR IS HANDLED BY CSS.
       * ---------------------------------------------------------
       */

      cards.forEach((card, index) => {
        if (index === 0) return;

        const previousCard = cards[index - 1];

        gsap.to(previousCard, {
          scale: 0.96,
          y: -8,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 80px",
            end: "top 20px",
            scrub: true,
          },
        });
      });

      /*
       * ---------------------------------------------------------
       * CONTENT ENTER ANIMATION
       * ---------------------------------------------------------
       */

      cards.forEach((card) => {
        const elements = card.querySelectorAll(
          "[data-review-element]"
        );

        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              once: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-visible
        bg-[#fff9ef]
        py-24
        sm:py-28
        lg:py-36
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-80
          w-80
          rounded-full
          bg-[#c69a42]/[0.06]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-20
          h-80
          w-80
          rounded-full
          bg-[#7a1717]/[0.05]
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span
            data-review-element
            className="
              mb-5
              inline-flex
              items-center
              rounded-full
              border
              border-[#c69a42]/40
              bg-white
              px-4
              py-2
              text-[10px]
              font-semibold
              tracking-[0.18em]
              text-[#7a1717]
              shadow-[0_5px_20px_rgba(80,45,20,0.04)]
            "
          >
            श्रद्धालु अनुभव
          </span>

          <h2
            data-review-element
            className="
              font-serif
              text-4xl
              font-semibold
              leading-[1.08]
              tracking-[-0.02em]
              text-[#18120f]
              sm:text-5xl
              lg:text-6xl
            "
          >
            पूजा के बाद के{" "}
            <span className="text-[#7a1717]">
              अनुभव
            </span>
          </h2>

          <p
            data-review-element
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-[15px]
              leading-7
              text-[#62564f]
              sm:text-base
              sm:leading-8
            "
          >
            पूजा और अनुष्ठान से जुड़े अनुभव, सरल शब्दों में।
            <br className="hidden sm:block" />
            हर अनुष्ठान की विधि और व्यवस्था श्रद्धा के साथ की जाती है।
          </p>
        </div>

        {/* =====================================================
            STACK CONTAINER
        ====================================================== */}

        <div
          className="
            relative
            mx-auto
            max-w-4xl
          "
        >
          {reviews.map((review, index) => (
            <div
              key={`${review.name}-${review.service}`}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element;
                }
              }}
              className="
                sticky
                top-5
                mb-8
                h-[480px]
                md:top-16
                md:mb-10
                md:h-[440px]
              "
              style={{
                /*
                 * IMPORTANT:
                 * Every next card has a higher z-index.
                 *
                 * Card 1 = 1
                 * Card 2 = 2
                 * Card 3 = 3
                 */
                zIndex: index + 1,
              }}
            >
              <article
                className="
                  relative
                  flex
                  h-full
                  w-full
                  flex-col
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-[#e8d8c0]
                  bg-white
                  p-7
                  shadow-[0_25px_70px_rgba(69,38,17,0.11)]
                  sm:p-9
                "
              >
                {/* =================================================
                    GOLD LINE
                ================================================== */}

                <div
                  className="
                    absolute
                    left-8
                    right-8
                    top-0
                    h-[2px]
                    bg-[#c69a42]
                    sm:left-9
                    sm:right-9
                  "
                />

                {/* =================================================
                    NUMBER
                ================================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    right-7
                    top-4
                    select-none
                    font-serif
                    text-[90px]
                    font-semibold
                    leading-none
                    text-[#7a1717]/[0.035]
                    sm:right-9
                    sm:text-[110px]
                  "
                >
                  0{index + 1}
                </div>

                {/* =================================================
                    TOP
                ================================================== */}

                <div
                  data-review-element
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-[#7a1717]
                      text-white
                      shadow-[0_10px_30px_rgba(122,23,23,0.16)]
                    "
                  >
                    <Quote
                      size={19}
                      strokeWidth={1.6}
                    />
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-1
                      rounded-full
                      border
                      border-[#eadbc3]
                      bg-[#fffaf2]
                      px-3
                      py-2
                    "
                  >
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="currentColor"
                        strokeWidth={1.5}
                        className="text-[#c69a42]"
                      />
                    ))}
                  </div>
                </div>

                {/* =================================================
                    REVIEW
                ================================================== */}

                <div className="relative z-10 flex flex-1 items-center">
                  <p
                    data-review-element
                    className="
                      max-w-3xl
                      text-[17px]
                      leading-[1.9]
                      text-[#51463f]
                      sm:text-[18px]
                      sm:leading-[1.85]
                    "
                  >
                    “{review.review}”
                  </p>
                </div>

                {/* =================================================
                    BOTTOM
                ================================================== */}

                <div className="relative z-10">
                  <div
                    data-review-element
                    className="
                      mb-5
                      h-px
                      w-full
                      bg-[#eee3d3]
                    "
                  />

                  <div className="flex items-center justify-between gap-4">
                    {/* User */}

                    <div
                      data-review-element
                      className="flex items-center gap-3"
                    >
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#f1e4cf]
                          font-serif
                          text-lg
                          font-semibold
                          text-[#7a1717]
                        "
                      >
                        {review.name.charAt(0)}
                      </div>

                      <div>
                        <h3
                          className="
                            text-sm
                            font-semibold
                            text-[#18120f]
                          "
                        >
                          {review.name}
                        </h3>

                        <div
                          className="
                            mt-0.5
                            flex
                            items-center
                            gap-1
                            text-xs
                            text-[#81756d]
                          "
                        >
                          <MapPin
                            size={12}
                            strokeWidth={1.5}
                          />

                          {review.location}
                        </div>
                      </div>
                    </div>

                    {/* Service */}

                    <span
                      data-review-element
                      className="
                        shrink-0
                        rounded-full
                        bg-[#fff5e5]
                        px-3
                        py-1.5
                        text-[11px]
                        font-semibold
                        text-[#8b5d17]
                      "
                    >
                      {review.service}
                    </span>
                  </div>
                </div>

                {/* Decorative corner */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    right-0
                    h-28
                    w-28
                    rounded-tl-full
                    bg-[#c69a42]/[0.025]
                  "
                />
              </article>
            </div>
          ))}
        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-3
            text-[10px]
            font-semibold
            tracking-[0.18em]
            text-[#8a7768]
          "
        >
          <span className="h-px w-8 bg-[#c69a42]/40" />

          <span>
            श्रद्धा • अनुभव • विश्वास
          </span>

          <span className="h-px w-8 bg-[#c69a42]/40" />
        </div>
      </div>
    </section>
  );
}

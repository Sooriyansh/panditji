"use client";

import { useLayoutEffect, useRef } from "react";
import { Star, Quote, MapPin } from "lucide-react";
import gsap from "gsap";

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
  {
    name: "Amit",
    location: "Dewas, MP",
    service: "नवग्रह शांति",
    review:
      "नवग्रह शांति पूजा के लिए हमें बहुत स्पष्ट जानकारी दी गई। पूजा की तैयारी से लेकर अनुष्ठान तक पूरी प्रक्रिया व्यवस्थित रही। पंडित जी का व्यवहार भी बहुत सहज और विनम्र रहा।",
    rating: 5,
  },
  {
    name: "Kavita",
    location: "Delhi",
    service: "पितृ दोष पूजा",
    review:
      "हम उज्जैन नहीं आ सके थे, इसलिए पहले फोन पर पूरी जानकारी ली। पूजा की प्रक्रिया और आवश्यक सामग्री के बारे में अच्छे से समझाया गया। हमें पूरी प्रक्रिया पारदर्शी और व्यवस्थित लगी।",
    rating: 5,
  },
  {
    name: "Vikas",
    location: "Bhopal, MP",
    service: "महामृत्युंजय जाप",
    review:
      "महामृत्युंजय जाप बहुत विधिवत तरीके से कराया गया। पूजा के प्रत्येक चरण के बारे में बताया गया और हमारी सभी आवश्यकताओं को ध्यान में रखा गया। अनुभव बहुत अच्छा रहा।",
    rating: 5,
  },
  {
    name: "Anjali",
    location: "Mumbai",
    service: "कुंडली मार्गदर्शन",
    review:
      "कुंडली से जुड़े सवालों को बहुत सरल भाषा में समझाया गया। बातचीत के दौरान किसी भी बात को जल्दबाजी में नहीं बताया गया और हमारे सवालों का विस्तार से उत्तर दिया गया।",
    rating: 5,
  },
  {
    name: "Rohit",
    location: "Ujjain, MP",
    service: "गृह दोष निवारण",
    review:
      "गृह दोष निवारण के लिए संपर्क किया था। पूजा से पहले आवश्यक तैयारी और विधि के बारे में पूरी जानकारी दी गई। पूरा अनुष्ठान शांतिपूर्ण और व्यवस्थित रहा।",
    rating: 5,
  },
  {
    name: "Sneha",
    location: "Pune, MH",
    service: "नवचंडी अनुष्ठान",
    review:
      "नवचंडी अनुष्ठान की पूरी व्यवस्था बहुत अच्छे तरीके से की गई। पूजा की जानकारी पहले ही मिल गई थी और पूरे कार्यक्रम के दौरान उचित मार्गदर्शन मिलता रहा।",
    rating: 5,
  },
  {
    name: "Manish",
    location: "Jaipur, RJ",
    service: "नवग्रह शांति",
    review:
      "पूजा के लिए हमने ऑनलाइन संपर्क किया था। बातचीत के दौरान हमारी आवश्यकता समझकर उचित जानकारी दी गई। पूरी प्रक्रिया सरल और व्यवस्थित रही।",
    rating: 5,
  },
  {
    name: "Pooja",
    location: "Indore, MP",
    service: "रुद्राभिषेक",
    review:
      "रुद्राभिषेक का वातावरण बहुत शांत और आध्यात्मिक रहा। पूजा की सामग्री और विधि के बारे में पहले से जानकारी दी गई थी। पंडित जी ने पूरे समय अच्छे से मार्गदर्शन किया।",
    rating: 5,
  },
  {
    name: "Saurabh",
    location: "Ahmedabad, GJ",
    service: "कुंडली विश्लेषण",
    review:
      "कुंडली विश्लेषण के दौरान हमारी बात ध्यान से सुनी गई और अलग-अलग विषयों को सरल तरीके से समझाया गया। अनुभव संतुलित और अच्छा रहा।",
    rating: 5,
  },
];

const firstRow = reviews.slice(0, 6);
const secondRow = reviews.slice(6, 12);

function ReviewCard({
  review,
  index,
}: {
  review: (typeof reviews)[number];
  index: number;
}) {
  return (
    <article
      className="
        group
        relative
        flex
        h-[280px]
        w-[290px]
        shrink-0
        flex-col
        overflow-hidden
        rounded-[22px]
        border
        border-[#e8d8c0]
        bg-white
        p-5
        shadow-[0_14px_40px_rgba(69,38,17,0.07)]
        transition-all
        duration-500
        hover:-translate-y-1.5
        hover:border-[#c69a42]/50
        hover:shadow-[0_20px_50px_rgba(69,38,17,0.12)]
        sm:h-[295px]
        sm:w-[320px]
        sm:p-5
      "
    >
      {/* Top gold line */}
      <div
        className="
          absolute
          left-6
          right-6
          top-0
          h-[2px]
          bg-[#c69a42]
        "
      />

      {/* Background number */}
      <div
        className="
          pointer-events-none
          absolute
          -right-1
          -top-3
          select-none
          font-serif
          text-[82px]
          font-semibold
          leading-none
          text-[#7a1717]/[0.035]
        "
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Top */}
      <div className="relative z-10 flex items-center justify-between">
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-[#7a1717]
            text-white
            shadow-[0_8px_20px_rgba(122,23,23,0.13)]
          "
        >
          <Quote size={15} strokeWidth={1.5} />
        </div>

        <div
          className="
            flex
            items-center
            gap-0.5
            rounded-full
            border
            border-[#eadbc3]
            bg-[#fffaf2]
            px-2.5
            py-1.5
          "
        >
          {[...Array(review.rating)].map((_, starIndex) => (
            <Star
              key={starIndex}
              size={11}
              fill="currentColor"
              strokeWidth={1.5}
              className="text-[#c69a42]"
            />
          ))}
        </div>
      </div>

      {/* Review */}
      <div className="relative z-10 flex flex-1 items-center">
        <p
          className="
            text-[13px]
            leading-[1.7]
            text-[#51463f]
            sm:text-[14px]
            sm:leading-[1.75]
          "
        >
          “{review.review}”
        </p>
      </div>

      {/* Bottom */}
      <div className="relative z-10">
        <div className="mb-4 h-px w-full bg-[#eee3d3]" />

        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#f1e4cf]
                font-serif
                text-base
                font-semibold
                text-[#7a1717]
              "
            >
              {review.name.charAt(0)}
            </div>

            <div className="min-w-0">
              <h3 className="text-[12px] font-semibold text-[#18120f]">
                {review.name}
              </h3>

              <div
                className="
                  mt-0.5
                  flex
                  items-center
                  gap-1
                  truncate
                  text-[10px]
                  text-[#81756d]
                "
              >
                <MapPin size={9} strokeWidth={1.5} />

                {review.location}
              </div>
            </div>
          </div>

          <span
            className="
              max-w-[115px]
              shrink-0
              truncate
              rounded-full
              bg-[#fff5e5]
              px-2.5
              py-1
              text-[9px]
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
          h-20
          w-20
          rounded-tl-full
          bg-[#c69a42]/[0.025]
        "
      />
    </article>
  );
}

export default function ClientReviews() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowOneRef = useRef<HTMLDivElement | null>(null);
  const rowTwoRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const rowOne = rowOneRef.current;
    const rowTwo = rowTwoRef.current;

    if (!section || !rowOne || !rowTwo) return;

    const ctx = gsap.context(() => {
      /*
       * =========================================================
       * INFINITE MARQUEE
       * =========================================================
       */

      const firstTrackWidth = rowOne.scrollWidth / 2;
      const secondTrackWidth = rowTwo.scrollWidth / 2;

      gsap.set(rowOne, {
        x: 0,
      });

      gsap.set(rowTwo, {
        x: -secondTrackWidth,
      });

      const speedOne = 48;
      const speedTwo = 44;

      const durationOne = firstTrackWidth / speedOne;
      const durationTwo = secondTrackWidth / speedTwo;

      const timelineOne = gsap.timeline({
        repeat: -1,
        defaults: {
          ease: "none",
        },
      });

      timelineOne.to(rowOne, {
        x: -firstTrackWidth,
        duration: durationOne,
      });

      const timelineTwo = gsap.timeline({
        repeat: -1,
        defaults: {
          ease: "none",
        },
      });

      timelineTwo.to(rowTwo, {
        x: 0,
        duration: durationTwo,
      });

      /*
       * =========================================================
       * CARD HOVER PAUSE
       * =========================================================
       */

      const cards = section.querySelectorAll("[data-review-card]");

      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          timelineOne.timeScale(0.12);
          timelineTwo.timeScale(0.12);
        });

        card.addEventListener("mouseleave", () => {
          timelineOne.timeScale(1);
          timelineTwo.timeScale(1);
        });
      });

      /*
       * =========================================================
       * HEADER ENTRANCE
       * =========================================================
       */

      gsap.fromTo(
        "[data-review-header]",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  /*
   * Duplicate rows for seamless looping.
   */

  const rowOneReviews = [...firstRow, ...firstRow];
  const rowTwoReviews = [...secondRow, ...secondRow];

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#fff9ef]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-48
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
          -right-48
          bottom-10
          h-80
          w-80
          rounded-full
          bg-[#7a1717]/[0.045]
          blur-3xl
        "
      />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          mb-12
          max-w-7xl
          px-5
          text-center
          sm:px-8
          lg:mb-16
        "
      >
        <span
          data-review-header
          className="
            mb-4
            inline-flex
            items-center
            rounded-full
            border
            border-[#c69a42]/40
            bg-white
            px-3.5
            py-1.5
            text-[9px]
            font-semibold
            tracking-[0.18em]
            text-[#7a1717]
            shadow-[0_5px_20px_rgba(80,45,20,0.04)]
          "
        >
          श्रद्धालु अनुभव
        </span>

        <h2
          data-review-header
          className="
            font-serif
            text-3xl
            font-semibold
            leading-[1.08]
            tracking-[-0.02em]
            text-[#18120f]
            sm:text-4xl
            lg:text-5xl
          "
        >
          पूजा के बाद के{" "}
          <span className="text-[#7a1717]">
            अनुभव
          </span>
        </h2>

        <p
          data-review-header
          className="
            mx-auto
            mt-4
            max-w-2xl
            text-[13px]
            leading-6
            text-[#62564f]
            sm:text-sm
            sm:leading-7
          "
        >
          हमारे श्रद्धालुओं द्वारा साझा किए गए अनुभव।
          <br className="hidden sm:block" />
          हर अनुष्ठान श्रद्धा, विधि और व्यक्तिगत मार्गदर्शन के साथ।
        </p>
      </div>

      {/* =====================================================
          ROW ONE
      ====================================================== */}

      <div className="relative mb-5 w-full overflow-hidden sm:mb-6">
        {/* Left fade */}
        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-20
            w-12
            bg-gradient-to-r
            from-[#fff9ef]
            to-transparent
            sm:w-28
          "
        />

        {/* Right fade */}
        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-20
            w-12
            bg-gradient-to-l
            from-[#fff9ef]
            to-transparent
            sm:w-28
          "
        />

        <div
          ref={rowOneRef}
          className="
            flex
            w-max
            gap-4
            will-change-transform
            sm:gap-5
          "
        >
          {rowOneReviews.map((review, index) => (
            <div
              key={`row-one-${review.name}-${review.service}-${index}`}
              data-review-card
            >
              <ReviewCard
                review={review}
                index={index % firstRow.length}
              />
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          ROW TWO
      ====================================================== */}

      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-20
            w-12
            bg-gradient-to-r
            from-[#fff9ef]
            to-transparent
            sm:w-28
          "
        />

        {/* Right fade */}
        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-20
            w-12
            bg-gradient-to-l
            from-[#fff9ef]
            to-transparent
            sm:w-28
          "
        />

        <div
          ref={rowTwoRef}
          className="
            flex
            w-max
            gap-4
            will-change-transform
            sm:gap-5
          "
        >
          {rowTwoReviews.map((review, index) => (
            <div
              key={`row-two-${review.name}-${review.service}-${index}`}
              data-review-card
            >
              <ReviewCard
                review={review}
                index={index % secondRow.length}
              />
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div
        data-review-header
        className="
          relative
          mt-10
          flex
          items-center
          justify-center
          gap-3
          text-[9px]
          font-semibold
          tracking-[0.18em]
          text-[#8a7768]
        "
      >
        <span className="h-px w-7 bg-[#c69a42]/40" />

        <span>श्रद्धा • अनुभव • विश्वास</span>

        <span className="h-px w-7 bg-[#c69a42]/40" />
      </div>
    </section>
  );
}
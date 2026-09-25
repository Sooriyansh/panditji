"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HeroSlide {
  badge: string;
  heading: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  location: string;
}

function CalendarSymbol() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className="h-7 w-7 sm:h-8 sm:w-8"
    >
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />

      <path
        d="M7.5 3v4m9-4v4M3.5 9.5h17"
        strokeLinecap="round"
      />

      <path
        d="M7.5 13h.01m4.5 0h.01m4.5 0h.01M7.5 16.5h.01m4.5 0h.01m4.5 0h.01"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M4 10h11M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path
        d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx="12"
        cy="9"
        r="2.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const slides: HeroSlide[] = [
  {
    badge: "शुभ मुहूर्त के अनुसार",
    heading: "वैदिक ज्योतिष से अपने जीवन को समझें।",
    description:
      "जन्म कुंडली, ग्रहों और जीवन की परिस्थितियों को समझकर व्यक्तिगत मार्गदर्शन प्राप्त करें।",
    primaryLabel: "पूजा बुक करें",
    primaryHref: "/online-puja",
    secondaryLabel: "ज्योतिष परामर्श",
    secondaryHref: "/kundali-analysis",
    location: "उज्जैन से वैदिक सेवाएँ",
  },
  {
    badge: "उज्जैन से वैदिक सेवाएँ",
    heading: "महाकाल की नगरी से श्रद्धा और शांति की ओर बढ़ें।",
    description:
      "उज्जैन की पावन भूमि से पारंपरिक पूजा, अनुष्ठान और ज्योतिषीय परामर्श प्राप्त करें।",
    primaryLabel: "पूजा बुक करें",
    primaryHref: "/online-puja",
    secondaryLabel: "ज्योतिष परामर्श",
    secondaryHref: "/kundali-analysis",
    location: "उज्जैन · मध्य प्रदेश",
  },
  {
    badge: "पारंपरिक विधि-विधान के साथ",
    heading: "महाकाल की भक्ति से जीवन में नई ऊर्जा पाएँ।",
    description:
      "पारंपरिक पूजा-अनुष्ठान और आध्यात्मिक मार्गदर्शन के साथ अपने महत्वपूर्ण चरणों के लिए सही दिशा खोजें।",
    primaryLabel: "पूजा बुक करें",
    primaryHref: "/online-puja",
    secondaryLabel: "ज्योतिष परामर्श",
    secondaryHref: "/kundali-analysis",
    location: "उज्जैन · मध्य प्रदेश",
  },
  {
    badge: "आपकी आस्था, हमारा मार्गदर्शन",
    heading: "सही पूजा, सही संकल्प और सही मार्गदर्शन।",
    description:
      "विधि-विधान और श्रद्धा के साथ सम्पन्न पूजा अनुष्ठानों के माध्यम से अपने संकल्प को एक नई दिशा दें।",
    primaryLabel: "पूजा बुक करें",
    primaryHref: "/online-puja",
    secondaryLabel: "ज्योतिष परामर्श",
    secondaryHref: "/kundali-analysis",
    location: "उज्जैन से वैदिक सेवाएँ",
  },
  {
    badge: "व्यक्तिगत ज्योतिषीय मार्गदर्शन",
    heading: "ग्रहों को समझें, अपने जीवन को नई दृष्टि से देखें।",
    description:
      "जन्म कुंडली और वैदिक ज्योतिष की परंपराओं के आधार पर अपने प्रश्नों को समझने के लिए व्यक्तिगत परामर्श प्राप्त करें।",
    primaryLabel: "कुंडली विश्लेषण",
    primaryHref: "/kundali-analysis",
    secondaryLabel: "परामर्श बुक करें",
    secondaryHref: "/book-consultation",
    location: "उज्जैन · मध्य प्रदेश",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex];

  useEffect(() => {
    const rotation = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(rotation);
  }, []);

  return (
    <section
      aria-label="पंडित सुमित शर्मा जी की वैदिक सेवाएँ"
      className="
        relative isolate flex
        min-h-[calc(100svh-88px)]
        items-center overflow-hidden
        bg-[#170d0b]
        lg:-mt-24
        lg:min-h-screen
      "
    >
      {/* =========================================================
          BACKGROUND VIDEO
      ========================================================== */}

      <video
        aria-hidden="true"
        autoPlay
        className="
          absolute inset-0 -z-30
          h-full w-full
          object-cover
          object-center
        "
        loop
        muted
        playsInline
        poster="/ujjain-hero-ai.png"
      >
        <source src="/ujjain-hero-ai.mp4" type="video/mp4" />
      </video>

      {/* Base darkness */}
      <div className="absolute inset-0 -z-20 bg-[#120b0a]/35" />

      {/* Left content protection */}
      <div
        className="
          absolute inset-0 -z-20
          bg-[linear-gradient(90deg,rgba(10,6,5,0.97)_0%,rgba(18,9,7,0.91)_25%,rgba(25,12,9,0.67)_48%,rgba(20,10,8,0.28)_72%,rgba(10,6,5,0.40)_100%)]
        "
      />

      {/* Bottom fade */}
      <div
        className="
          absolute inset-x-0 bottom-0 -z-20
          h-64
          bg-[linear-gradient(180deg,transparent,rgba(10,6,5,0.82))]
        "
      />

      {/* Top fade */}
      <div
        className="
          absolute inset-x-0 top-0 -z-20
          h-40
          bg-[linear-gradient(180deg,rgba(7,4,3,0.62),transparent)]
        "
      />

      {/* Warm atmosphere */}
      <div
        aria-hidden="true"
        className="
          absolute left-[5%] top-[15%] -z-10
          h-80 w-80
          rounded-full
          bg-[#C69A42]/10
          blur-[120px]
        "
      />

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div
        className="
          mx-auto w-full max-w-7xl
          px-5 py-24
          sm:px-8 sm:py-28
          lg:px-12 lg:py-32
        "
      >
        <div className="max-w-3xl">
          <div
            aria-live="polite"
            className="
              min-h-[430px]
              sm:min-h-[390px]
              lg:min-h-[410px]
            "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.heading}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -14,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Badge */}
                <div className="mb-7">
                  <div
                    className="
                      inline-flex items-center gap-3
                      rounded-full
                      border border-[#E8C98C]/25
                      bg-[#fff5df]/[0.08]
                      px-4 py-2.5
                      shadow-[0_8px_30px_rgba(0,0,0,0.15)]
                      backdrop-blur-md
                    "
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D8AD5E]/50" />

                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D8AD5E]" />
                    </span>

                    <span className="text-xs font-bold tracking-wide text-[#F8E9CA] sm:text-sm">
                      {slide.badge}
                    </span>
                  </div>
                </div>

                {/* Heading */}
                <h1
                  className="
                    max-w-3xl
                    text-[2.6rem]
                    font-extrabold
                    leading-[1.14]
                    tracking-[-0.035em]
                    text-[#FFF9EF]
                    sm:text-5xl
                    lg:text-[4.35rem]
                    lg:leading-[1.08]
                  "
                >
                  {slide.heading}
                </h1>

                {/* Gold signature line */}
                <div className="mt-7 flex items-center gap-3">
                  <span className="h-px w-16 bg-[#C69A42]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C69A42]" />
                  <span className="h-px w-7 bg-[#C69A42]/45" />
                </div>

                {/* Description */}
                <p
                  className="
                    mt-6 max-w-2xl
                    text-[15px]
                    leading-7
                    text-[#F7EBDD]/80
                    sm:text-lg
                    sm:leading-8
                  "
                >
                  {slide.description}
                </p>

                {/* CTA */}
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href={slide.primaryHref}
                    className="
                      group inline-flex
                      min-h-13
                      items-center justify-center gap-3
                      rounded-xl
                      bg-[#A94317]
                      px-7
                      text-sm font-extrabold
                      text-white
                      shadow-[0_12px_35px_rgba(82,26,8,0.35)]
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:bg-[#BD4E1B]
                      hover:shadow-[0_18px_42px_rgba(82,26,8,0.42)]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#E8C98C]
                      focus:ring-offset-2
                      focus:ring-offset-[#21110D]
                      sm:min-h-14
                      sm:text-base
                    "
                  >
                    <span>{slide.primaryLabel}</span>

                    <ArrowIcon />
                  </Link>

                  <Link
                    href={slide.secondaryHref}
                    className="
                      inline-flex
                      min-h-13
                      items-center justify-center
                      rounded-xl
                      border border-[#F7EBDD]/25
                      bg-[#fff8ec]/[0.07]
                      px-7
                      text-sm font-bold
                      text-[#FFF8EC]
                      backdrop-blur-md
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-[#F7EBDD]/40
                      hover:bg-[#fff8ec]/[0.13]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#E8C98C]
                      focus:ring-offset-2
                      focus:ring-offset-[#21110D]
                      sm:min-h-14
                      sm:text-base
                    "
                  >
                    {slide.secondaryLabel}
                  </Link>
                </div>

                {/* Location */}
                <div className="mt-8 flex items-center gap-3">
                  <span
                    className="
                      grid h-7 w-7
                      place-items-center
                      rounded-full
                      border border-[#D8AD5E]/30
                      bg-[#D8AD5E]/10
                      text-[#E5C37E]
                    "
                  >
                    <LocationIcon />
                  </span>

                  <span
                    className="
                      text-xs
                      font-semibold
                      tracking-wide
                      text-[#F7EBDD]/70
                      sm:text-sm
                    "
                  >
                    {slide.location}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* =====================================================
              SLIDE NAVIGATION
          ====================================================== */}

          <div
            className="mt-2 flex items-center gap-3"
            aria-label="हीरो संदेश चुनें"
          >
            {slides.map((item, index) => (
              <button
                key={item.heading}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`${index + 1}वाँ संदेश दिखाएँ`}
                aria-current={
                  index === activeIndex ? "true" : undefined
                }
                className={`
                  relative h-1.5
                  overflow-hidden
                  rounded-full
                  transition-all duration-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#E8C98C]
                  focus:ring-offset-2
                  focus:ring-offset-[#21110D]
                  ${
                    index === activeIndex
                      ? "w-12 bg-[#D8AD5E]"
                      : "w-2.5 bg-[#FFF8EC]/30 hover:bg-[#FFF8EC]/60"
                  }
                `}
              >
                {index === activeIndex && (
                  <motion.span
                    layoutId="hero-progress"
                    className="
                      absolute inset-y-0 left-0
                      w-1/2
                      rounded-full
                      bg-[#F2D79F]
                    "
                  />
                )}
              </button>
            ))}

            <span
              className="
                ml-2
                text-[10px]
                font-bold
                tracking-[0.18em]
                text-[#F7EBDD]/45
              "
            >
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          PREMIUM PANCHANG WIDGET
      ========================================================== */}

      <Link
        href="/panchang"
        aria-label="आज का पंचांग और पूरा कैलेंडर खोलें"
        className="
          group
          absolute
          bottom-5 right-5
          z-10
          w-[190px]
          overflow-hidden
          rounded-[1.35rem]
          border border-[#E8C98C]/30
          bg-[#4D1C0E]/88
          p-3
          text-[#FFF8EC]
          shadow-[0_20px_55px_rgba(18,6,2,0.45)]
          backdrop-blur-xl
          transition-all duration-500
          hover:-translate-y-1
          hover:border-[#E8C98C]/55
          hover:bg-[#5D2110]/95
          hover:shadow-[0_25px_65px_rgba(18,6,2,0.55)]
          focus:outline-none
          focus:ring-2
          focus:ring-[#E8C98C]
          focus:ring-offset-2
          focus:ring-offset-[#21110D]
          sm:right-8
          sm:w-[210px]
          sm:p-4
          lg:bottom-auto
          lg:right-[max(2rem,calc((100vw-80rem)/2))]
          lg:top-1/2
          lg:w-[218px]
          lg:-translate-y-1/2
          lg:rounded-[1.6rem]
          lg:p-4
        "
      >
        {/* Background detail */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-12
            -top-12
            h-28
            w-28
            rounded-full
            bg-[#D8AD5E]/10
            blur-3xl
            transition-all duration-500
            group-hover:bg-[#D8AD5E]/20
          "
        />

        {/* Top row */}
        <div className="relative flex items-center justify-between">
          <span
            className="
              grid h-11 w-11
              place-items-center
              rounded-xl
              border border-[#F2D79F]/20
              bg-[#FFF5DF]/10
              text-[#F5D89B]
              transition-all duration-300
              group-hover:border-[#F2D79F]/40
              group-hover:bg-[#FFF5DF]/15
              sm:h-12 sm:w-12
            "
          >
            <CalendarSymbol />
          </span>

          <span
            className="
              rounded-full
              border border-[#F2D79F]/15
              bg-[#FFF5DF]/[0.06]
              px-2.5 py-1
              text-[9px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#EACB91]/80
            "
          >
            पंचांग
          </span>
        </div>

        {/* Divider */}
        <div className="relative my-3.5 h-px bg-[#F2D79F]/15" />

        {/* Main content */}
        <div className="relative">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-[#EACB91]/65">
            दैनिक वैदिक गणना
          </p>

          <div className="mt-1 flex items-end justify-between gap-3">
            <div>
              <p className="text-lg font-extrabold leading-none text-[#FFF8EC] sm:text-xl">
                आज का
              </p>

              <p className="mt-1 text-lg font-extrabold leading-none text-[#EACB91] sm:text-xl">
                पंचांग
              </p>
            </div>

            <span
              aria-hidden="true"
              className="
                text-2xl
                font-light
                text-[#D8AD5E]/50
                transition-transform duration-500
                group-hover:rotate-12
              "
            >
              ✦
            </span>
          </div>
        </div>

        {/* Bottom information */}
        <div className="relative mt-4 flex items-center justify-between">
          <span className="text-[10px] font-medium text-[#FFF8EC]/50">
            उज्जैन
          </span>

          <span
            className="
              inline-flex
              items-center
              gap-1.5
              text-[10px]
              font-bold
              text-[#F2D79F]
              transition-all duration-300
              group-hover:gap-2
            "
          >
            देखें
            <ArrowIcon />
          </span>
        </div>
      </Link>

      {/* Bottom subtle border */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0
          h-px
          bg-[#D8AD5E]/25
        "
      />
    </section>
  );
}
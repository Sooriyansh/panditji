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
      strokeWidth="1.6"
      aria-hidden="true"
      className="h-5 w-5 sm:h-6 sm:w-6"
    >
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path
        d="M7.5 3v4M16.5 3v4M3.5 9.5h17"
        strokeLinecap="round"
      />
      <path
        d="M7.5 13h.01M12 13h.01M16.5 13h.01M7.5 16.5h.01M12 16.5h.01M16.5 16.5h.01"
        strokeLinecap="round"
        strokeWidth="2"
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
        strokeWidth="1.6"
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
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      aria-label="पंडित सुमित शर्मा जी की वैदिक सेवाएँ"
      className="
        relative isolate overflow-hidden
        bg-[#170d0b]
        text-[#FFF9EF]

        min-h-[100svh]

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
        loop
        muted
        playsInline
        poster="/ujjain-hero-ai.png"
        className="
          absolute inset-0 -z-30
          h-full w-full
          object-cover
          object-center
        "
      >
        <source src="/ujjain-hero-ai.mp4" type="video/mp4" />
      </video>

      {/* Overall dark overlay */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-20
          bg-[#120806]/55
        "
      />

      {/* Desktop left readability */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-20

          bg-[linear-gradient(
            90deg,
            rgba(10,5,4,0.98)_0%,
            rgba(15,7,5,0.94)_25%,
            rgba(22,10,7,0.72)_48%,
            rgba(18,8,6,0.28)_72%,
            rgba(10,5,4,0.38)_100%
          )]

          max-lg:bg-[linear-gradient(
            180deg,
            rgba(10,5,4,0.70)_0%,
            rgba(12,6,5,0.74)_45%,
            rgba(10,5,4,0.94)_100%
          )]
        "
      />

      {/* Bottom cinematic fade */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0 -z-10
          h-72
          bg-gradient-to-t
          from-[#0d0705]/95
          via-[#0d0705]/35
          to-transparent
        "
      />

      {/* Top fade */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 top-0 -z-10
          h-40
          bg-gradient-to-b
          from-[#080403]/60
          to-transparent
        "
      />

      {/* Warm ambient glow */}
      <div
        aria-hidden="true"
        className="
          absolute
          left-[-8rem]
          top-[18%]
          -z-10
          h-80
          w-80
          rounded-full
          bg-[#C69A42]/10
          blur-[120px]

          sm:left-[3%]
        "
      />

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div
        className="
          mx-auto
          flex
          min-h-[100svh]
          w-full
          max-w-7xl
          items-center

          px-5
          pb-36
          pt-28

          sm:px-8
          sm:pb-40
          sm:pt-32

          lg:px-12
          lg:pb-32
          lg:pt-36
        "
      >
        <div
          className="
            w-full
            max-w-3xl

            lg:max-w-[760px]
          "
        >
          {/* =====================================================
              SLIDER CONTENT
          ====================================================== */}

          <div
            aria-live="polite"
            className="
              min-h-[500px]

              min-[400px]:min-h-[465px]

              sm:min-h-[430px]

              lg:min-h-[410px]
            "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.heading}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -16,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* =================================================
                    BADGE
                ================================================== */}

                <div className="mb-6 sm:mb-7">
                  <div
                    className="
                      inline-flex
                      max-w-full
                      items-center
                      gap-2.5
                      rounded-full
                      border
                      border-[#E8C98C]/25
                      bg-[#fff5df]/[0.08]
                      px-3.5
                      py-2

                      shadow-[0_8px_30px_rgba(0,0,0,0.18)]
                      backdrop-blur-xl

                      sm:gap-3
                      sm:px-4
                      sm:py-2.5
                    "
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span
                        className="
                          absolute
                          inline-flex
                          h-full
                          w-full
                          animate-ping
                          rounded-full
                          bg-[#D8AD5E]/50
                        "
                      />

                      <span
                        className="
                          relative
                          inline-flex
                          h-2
                          w-2
                          rounded-full
                          bg-[#D8AD5E]
                        "
                      />
                    </span>

                    <span
                      className="
                        truncate
                        text-[11px]
                        font-bold
                        tracking-wide
                        text-[#F8E9CA]

                        sm:text-sm
                      "
                    >
                      {slide.badge}
                    </span>
                  </div>
                </div>

                {/* =================================================
                    HEADING
                ================================================== */}

                <h1
                  className="
                    max-w-[700px]

                    text-[2.45rem]
                    font-extrabold
                    leading-[1.12]
                    tracking-[-0.04em]

                    text-[#FFF9EF]

                    min-[400px]:text-[2.65rem]

                    sm:text-5xl
                    sm:leading-[1.1]

                    lg:text-[4.25rem]
                    lg:leading-[1.06]
                  "
                >
                  {slide.heading}
                </h1>

                {/* Gold signature */}
                <div className="mt-6 flex items-center gap-2.5 sm:mt-7 sm:gap-3">
                  <span className="h-px w-12 bg-[#C69A42] sm:w-16" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C69A42]" />
                  <span className="h-px w-6 bg-[#C69A42]/45 sm:w-7" />
                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                <p
                  className="
                    mt-5
                    max-w-2xl

                    text-[14px]
                    leading-6
                    text-[#F7EBDD]/80

                    sm:mt-6
                    sm:text-lg
                    sm:leading-8
                  "
                >
                  {slide.description}
                </p>

                {/* =================================================
                    CTA
                ================================================== */}

                <div
                  className="
                    mt-7
                    grid
                    grid-cols-1
                    gap-3

                    min-[430px]:grid-cols-2

                    sm:mt-9
                    sm:flex
                  "
                >
                  <Link
                    href={slide.primaryHref}
                    className="
                      group
                      inline-flex
                      min-h-12
                      items-center
                      justify-center
                      gap-3
                      rounded-xl
                      bg-[#A94317]
                      px-5
                      text-sm
                      font-extrabold
                      text-white

                      shadow-[0_12px_35px_rgba(82,26,8,0.35)]

                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:bg-[#BD4E1B]

                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#E8C98C]
                      focus:ring-offset-2
                      focus:ring-offset-[#21110D]

                      sm:min-h-14
                      sm:px-7
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
                      min-h-12
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#F7EBDD]/25
                      bg-[#fff8ec]/[0.07]
                      px-5
                      text-sm
                      font-bold
                      text-[#FFF8EC]

                      backdrop-blur-xl

                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:border-[#F7EBDD]/40
                      hover:bg-[#fff8ec]/[0.13]

                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#E8C98C]
                      focus:ring-offset-2
                      focus:ring-offset-[#21110D]

                      sm:min-h-14
                      sm:px-7
                      sm:text-base
                    "
                  >
                    {slide.secondaryLabel}
                  </Link>
                </div>

                {/* =================================================
                    LOCATION
                ================================================== */}

                <div className="mt-6 flex items-center gap-2.5 sm:mt-8 sm:gap-3">
                  <span
                    className="
                      grid
                      h-7
                      w-7
                      shrink-0
                      place-items-center
                      rounded-full
                      border
                      border-[#D8AD5E]/30
                      bg-[#D8AD5E]/10
                      text-[#E5C37E]
                    "
                  >
                    <LocationIcon />
                  </span>

                  <span
                    className="
                      text-[11px]
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
            className="
              mt-1
              flex
              items-center
              gap-2.5
              sm:gap-3
            "
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
                  relative
                  h-1.5
                  overflow-hidden
                  rounded-full
                  transition-all
                  duration-500

                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#E8C98C]

                  ${
                    index === activeIndex
                      ? "w-10 bg-[#D8AD5E] sm:w-12"
                      : "w-2.5 bg-[#FFF8EC]/30 hover:bg-[#FFF8EC]/60"
                  }
                `}
              >
                {index === activeIndex && (
                  <motion.span
                    layoutId="hero-progress"
                    className="
                      absolute
                      inset-y-0
                      left-0
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
                ml-1
                text-[9px]
                font-bold
                tracking-[0.16em]
                text-[#F7EBDD]/45

                sm:ml-2
                sm:text-[10px]
              "
            >
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          PANCHANG CARD
      ========================================================== */}

      <Link
        href="/panchang"
        aria-label="आज का पंचांग और पूरा कैलेंडर खोलें"
        className="
          group
          absolute
          z-30

          /* ================= MOBILE ================= */

          bottom-4
          left-4
          right-4
          w-auto

          rounded-2xl
          border
          border-[#E8C98C]/25
          bg-[#42170D]/95
          p-3.5

          text-[#FFF8EC]

          shadow-[0_18px_50px_rgba(18,6,2,0.5)]
          backdrop-blur-2xl

          transition-all
          duration-300

          active:scale-[0.98]

          hover:border-[#E8C98C]/50

          focus:outline-none
          focus:ring-2
          focus:ring-[#E8C98C]
          focus:ring-offset-2
          focus:ring-offset-[#21110D]

          /* ================= SMALL MOBILE ================= */

          max-[380px]:bottom-3
          max-[380px]:left-3
          max-[380px]:right-3
          max-[380px]:rounded-xl
          max-[380px]:p-3

          /* ================= TABLET ================= */

          sm:left-auto
          sm:right-6
          sm:bottom-6
          sm:w-[250px]
          sm:rounded-[1.35rem]
          sm:p-4

          /* ================= DESKTOP ================= */

          lg:bottom-auto
          lg:left-auto
          lg:right-[max(2rem,calc((100vw-80rem)/2))]
          lg:top-1/2
          lg:w-[225px]
          lg:-translate-y-1/2
          lg:rounded-[1.5rem]
          lg:p-4
        "
      >
        {/* Glow */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-8
            -top-8
            h-24
            w-24
            rounded-full
            bg-[#D8AD5E]/10
            blur-3xl

            transition-all
            duration-500

            group-hover:bg-[#D8AD5E]/20
          "
        />

        {/* =====================================================
            MOBILE / TABLET HORIZONTAL HEADER
        ====================================================== */}

        <div
          className="
            relative
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              grid
              h-10
              w-10
              shrink-0
              place-items-center
              rounded-xl
              border
              border-[#F2D79F]/20
              bg-[#FFF5DF]/10
              text-[#F5D89B]

              sm:h-11
              sm:w-11
            "
          >
            <CalendarSymbol />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#EACB91]/65
                "
              >
                दैनिक वैदिक गणना
              </p>

              <span
                className="
                  shrink-0
                  rounded-full
                  border
                  border-[#F2D79F]/15
                  bg-[#FFF5DF]/[0.06]
                  px-2
                  py-1
                  text-[8px]
                  font-bold
                  tracking-[0.1em]
                  text-[#EACB91]/80
                "
              >
                पंचांग
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span
                  className="
                    text-base
                    font-extrabold
                    leading-none
                    text-[#FFF8EC]

                    sm:text-lg
                  "
                >
                  आज का
                </span>

                <span
                  className="
                    text-base
                    font-extrabold
                    leading-none
                    text-[#EACB91]

                    sm:text-lg
                  "
                >
                  पंचांग
                </span>
              </div>

              <span
                aria-hidden="true"
                className="
                  ml-2
                  text-lg
                  text-[#D8AD5E]/60
                  transition-transform
                  duration-300
                  group-hover:rotate-12
                "
              >
                ✦
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            relative
            my-3
            h-px
            bg-[#F2D79F]/15
          "
        />

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div
          className="
            relative
            flex
            items-center
            justify-between
            gap-3
          "
        >
          <div className="flex items-center gap-2">
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#D8AD5E]
              "
            />

            <span
              className="
                text-[9px]
                font-medium
                text-[#FFF8EC]/55

                sm:text-[10px]
              "
            >
              उज्जैन
            </span>
          </div>

          <span
            className="
              inline-flex
              items-center
              gap-1.5
              text-[9px]
              font-bold
              text-[#F2D79F]

              transition-all
              duration-300

              group-hover:gap-2

              sm:text-[10px]
            "
          >
            पूरा कैलेंडर
            <ArrowIcon />
          </span>
        </div>
      </Link>

      {/* =========================================================
          BOTTOM BORDER
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          bottom-0
          h-px
          bg-[#D8AD5E]/25
        "
      />
    </section>
  );
}


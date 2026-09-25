"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeAbout() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const imageInnerRef = useRef<HTMLDivElement | null>(null);
  const imageFrameRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const imageInner = imageInnerRef.current;
    const imageFrame = imageFrameRef.current;
    const content = contentRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;
    const quote = quoteRef.current;
    const button = buttonRef.current;

    if (
      !section ||
      !image ||
      !imageInner ||
      !imageFrame ||
      !content ||
      !timeline ||
      !line ||
      !quote ||
      !button
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      /*
       * IMAGE REVEAL
       */
      gsap.fromTo(
        image,
        {
          opacity: 0,
          x: -45,
          y: 25,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );

      /*
       * IMAGE ZOOM
       */
      gsap.fromTo(
        imageInner,
        {
          scale: 1.12,
        },
        {
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );

      /*
       * GOLD FRAME REVEAL
       */
      gsap.fromTo(
        imageFrame,
        {
          opacity: 0,
          scale: 0.94,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );

      /*
       * CONTENT STAGGER
       */
      gsap.fromTo(
        content.children,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: content,
            start: "top 82%",
            once: true,
          },
        },
      );

      /*
       * TIMELINE REVEAL
       */
      gsap.fromTo(
        timeline.children,
        {
          opacity: 0,
          x: 18,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          stagger: 0.16,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timeline,
            start: "top 82%",
            once: true,
          },
        },
      );

      /*
       * CONNECTING LINE
       */
      gsap.fromTo(
        line,
        {
          scaleY: 0,
          transformOrigin: "top",
        },
        {
          scaleY: 1,
          duration: 1.15,
          delay: 0.25,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: timeline,
            start: "top 78%",
            once: true,
          },
        },
      );

      /*
       * QUOTE
       */
      gsap.fromTo(
        quote,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.35,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quote,
            start: "top 88%",
            once: true,
          },
        },
      );

      /*
       * BUTTON
       */
      const buttonArrow = button.querySelector("[data-arrow]");

      const enter = () => {
        gsap.to(button, {
          y: -3,
          duration: 0.3,
          ease: "power2.out",
        });

        if (buttonArrow) {
          gsap.to(buttonArrow, {
            x: 5,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      };

      const leave = () => {
        gsap.to(button, {
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        });

        if (buttonArrow) {
          gsap.to(buttonArrow, {
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      };

      button.addEventListener("mouseenter", enter);
      button.addEventListener("mouseleave", leave);

      /*
       * IMAGE HOVER
       */
      const imageEnter = () => {
        gsap.to(imageInner, {
          scale: 1.045,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      const imageLeave = () => {
        gsap.to(imageInner, {
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      image.addEventListener("mouseenter", imageEnter);
      image.addEventListener("mouseleave", imageLeave);

      return () => {
        button.removeEventListener("mouseenter", enter);
        button.removeEventListener("mouseleave", leave);

        image.removeEventListener("mouseenter", imageEnter);
        image.removeEventListener("mouseleave", imageLeave);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-about-title"
      className="relative overflow-hidden bg-[#fffaf2] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    >
      {/* Very subtle background detail */}
      <div className="pointer-events-none absolute -right-48 top-20 h-[500px] w-[500px] rounded-full bg-[#d7a34a]/[0.045] blur-3xl" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#8b3516]/[0.035] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* =====================================================
              LEFT — GURUJI IMAGE
          ====================================================== */}
          <div
            ref={imageRef}
            className="relative mx-auto w-full max-w-[480px]"
          >
            {/* Decorative frame */}
            <div
              ref={imageFrameRef}
              className="absolute -inset-3 rounded-[2.2rem] border border-[#d9b56a]/60 bg-[#fff0cf]"
            />

            {/* Small top label */}
            <div className="absolute -top-5 left-6 z-20 rounded-full border border-[#dfc28a] bg-[#fffaf2] px-4 py-2 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b4518]">
                गुरु परंपरा
              </p>
            </div>

            {/* Image */}
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-[#ead9bd] shadow-[0_25px_65px_rgba(80,42,12,0.18)]">
              <div
                ref={imageInnerRef}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src="/pandit-img.jpeg"
                  alt="पूज्य गुरुजी बंशीधर शास्त्री जी का चित्र"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-center"
                  priority={false}
                />
              </div>

              {/* Soft image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#321507]/70 via-transparent to-transparent" />

              {/* Image bottom identity */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                <div className="h-px w-10 bg-[#d9b56a]" />

                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e4c98e]">
                  श्रद्धा एवं स्मृति में
                </p>

                <h3 className="mt-1 text-lg font-semibold text-[#fffaf2] sm:text-xl">
                  पूज्य गुरुजी बंशीधर शास्त्री जी
                </h3>

                <p className="mt-1 text-sm text-[#f4dfc5]/80">
                  उज्जैन, मध्य प्रदेश
                </p>
              </div>
            </div>

            {/* Floating Sanskrit / Om detail */}
            <div className="absolute -bottom-6 -right-4 grid h-16 w-16 place-items-center rounded-2xl border border-[#d9b56a]/60 bg-[#fffaf2] shadow-[0_12px_30px_rgba(80,42,12,0.12)] sm:-right-7">
              <span className="font-serif text-3xl text-[#a35420]">ॐ</span>
            </div>
          </div>

          {/* =====================================================
              RIGHT — STORY / GURU PARAMPARA
          ====================================================== */}
          <div ref={contentRef}>
            {/* Eyebrow */}
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#a85e25]">
              गुरु से मिली विरासत
            </p>

            {/* Heading */}
            <h2
              id="home-about-title"
              className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.12] tracking-[-0.035em] text-[#51230f] sm:text-4xl lg:text-[3.45rem]"
            >
              एक परंपरा,
              <br />
              <span className="text-[#8b3516]">जो आज भी आगे बढ़ रही है।</span>
            </h2>

            {/* Intro */}
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[#70401f] sm:text-base">
              पंडित सुमित शर्मा जी ने वैदिक ज्योतिष, पूजा-विधान और पारंपरिक
              अनुष्ठानों का ज्ञान अपने पूज्य गुरुजी बंशीधर शास्त्री जी से
              सीखा। गुरुजी के सान्निध्य में प्राप्त यह शिक्षा आज भी उनकी
              साधना और कार्य की आधारशिला है।
            </p>

            {/* =================================================
                GURU PARAMPARA TIMELINE
            ================================================== */}
            <div
              ref={timelineRef}
              className="relative mt-9 space-y-8 pl-8"
            >
              {/* Connecting line */}
              <div
                ref={lineRef}
                className="absolute bottom-5 left-[7px] top-5 w-px bg-[#d6ad61]"
              />

              {/* Guru */}
              <div className="relative">
                <div className="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-[#fffaf2] bg-[#b98632] shadow-[0_0_0_4px_rgba(185,134,50,0.14)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a85e25]">
                  गुरु
                </p>

                <h3 className="mt-1.5 text-lg font-semibold text-[#51230f]">
                  पूज्य गुरुजी बंशीधर शास्त्री जी
                </h3>

                <p className="mt-1.5 max-w-xl text-sm leading-6 text-[#79502e]">
                  जिनसे वैदिक परंपरा, पूजा-विधान और ज्योतिषीय ज्ञान की शिक्षा
                  एवं मार्गदर्शन प्राप्त हुआ।
                </p>
              </div>

              {/* Student */}
              <div className="relative">
                <div className="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-[#fffaf2] bg-[#8b3516] shadow-[0_0_0_4px_rgba(139,53,22,0.12)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a85e25]">
                  शिष्य
                </p>

                <h3 className="mt-1.5 text-lg font-semibold text-[#51230f]">
                  पंडित सुमित शर्मा जी
                </h3>

                <p className="mt-1.5 max-w-xl text-sm leading-6 text-[#79502e]">
                  गुरु से प्राप्त ज्ञान और परंपरा को अपनी साधना एवं सेवाओं के
                  माध्यम से आगे बढ़ाने का प्रयास।
                </p>
              </div>
            </div>

            {/* Quote */}
            <div
              ref={quoteRef}
              className="relative mt-9 overflow-hidden rounded-2xl border border-[#e5cfa8] bg-[#fff6e4] px-5 py-5 sm:px-6"
            >
              {/* Gold accent */}
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#c69a42]" />

              <div className="flex gap-4">
                <span className="font-serif text-4xl leading-none text-[#c69a42]/60">
                  “
                </span>

                <div>
                  <p className="text-[15px] font-semibold leading-7 text-[#643015]">
                    गुरु से प्राप्त ज्ञान केवल सीखा नहीं जाता, उसे साधना,
                    सम्मान और सेवा के माध्यम से आगे बढ़ाया जाता है।
                  </p>

                  <p className="mt-2 text-xs font-medium text-[#916039]">
                    — गुरु परंपरा के प्रति श्रद्धा
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              ref={buttonRef}
              href="/about"
              className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl bg-[#8b3516] px-6 py-3 text-sm font-bold text-[#fffaf1] shadow-[0_10px_24px_rgba(110,45,16,0.18)] transition-colors duration-300 hover:bg-[#a9481e] focus:outline-none focus:ring-2 focus:ring-[#b56a28] focus:ring-offset-2"
            >
              <span>गुरु परंपरा के बारे में जानें</span>

              <span data-arrow className="inline-flex">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M4 10h11" />
                  <path d="m10.5 5.5 4.5 4.5-4.5 4.5" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
    
      </div>
    </section>
  );
}
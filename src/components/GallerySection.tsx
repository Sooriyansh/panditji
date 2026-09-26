"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const galleryItems = [
  {
    src: "/G1.png",
    title: "पूजा अनुष्ठान",
    category: "पूजा",
    aspect: "aspect-[5/4]",
  },
  {
    src: "/G2.png",
    title: "हवन एवं संकल्प",
    category: "अनुष्ठान",
    aspect: "aspect-[5/3.8]",
  },
  {
    src: "/G3.png",
    title: "नवग्रह शांति",
    category: "पूजा",
    aspect: "aspect-[5/4]",
  },
  {
    src: "/G4.png",
    title: "वैदिक ज्योतिष",
    category: "ज्योतिष",
    aspect: "aspect-[5/3.8]",
  },
  {
    src: "/images/services/dosha-shanti.png",
    title: "दोष शांति",
    category: "दोष निवारण",
    aspect: "aspect-[5/4]",
  },
  {
    src: "/images/services/shiv-puja.png",
    title: "शिव पूजा",
    category: "पूजा",
    aspect: "aspect-[5/3.8]",
  },
  {
    src: "/images/services/navgraha-shanti.png",
    title: "नवग्रह शांति",
    category: "अनुष्ठान",
    aspect: "aspect-[5/4]",
  },
  {
    src: "/G1.png",
    title: "विधिवत पूजा",
    category: "अनुष्ठान",
    aspect: "aspect-[5/3.8]",
  },
];

const leftColumn = galleryItems.slice(0, 4);
const rightColumn = galleryItems.slice(4, 8);

const ease = [0.22, 1, 0.36, 1] as const;

function GalleryCard({
  item,
  index,
}: {
  item: (typeof galleryItems)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.65,
        delay: Math.min(index * 0.04, 0.2),
        ease,
      }}
      className="group relative w-full shrink-0 overflow-hidden rounded-[18px] bg-[#241B17]"
    >
      <div className={`relative w-full ${item.aspect} overflow-hidden`}>
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 600px"
          className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.045]"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />

        {/* Warm hover layer */}
        <div className="absolute inset-0 bg-[#A52A16]/0 transition-colors duration-700 group-hover:bg-[#A52A16]/10" />

        {/* Number */}
        <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
          <span className="flex h-7 min-w-7 items-center justify-center rounded-full border border-white/20 bg-black/25 px-2 text-[9px] font-medium tracking-[0.18em] text-white/80 backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Card content */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-[#E5BD78]">
                {item.category}
              </p>

              <h3 className="truncate text-lg font-medium leading-tight tracking-[-0.02em] text-white sm:text-xl">
                {item.title}
              </h3>
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover:border-[#E5BD78]/60 group-hover:bg-[#E5BD78] group-hover:text-[#18120F]">
              <ArrowUpRight
                size={14}
                strokeWidth={1.7}
                className="transition-transform duration-500 group-hover:rotate-45"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const leftTrackRef = useRef<HTMLDivElement | null>(null);
  const rightTrackRef = useRef<HTMLDivElement | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  const headerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    const leftTrack = leftTrackRef.current;
    const rightTrack = rightTrackRef.current;
    const mobileTrack = mobileTrackRef.current;

    const header = headerRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
       * ----------------------------------------------------
       * DESKTOP ANIMATION
       * ----------------------------------------------------
       */

      let leftAnimation: gsap.core.Tween | null = null;
      let rightAnimation: gsap.core.Tween | null = null;

      if (leftTrack && rightTrack) {
        const leftHeight = leftTrack.scrollHeight / 2;
        const rightHeight = rightTrack.scrollHeight / 2;

        /*
         * LEFT
         * Starts slightly above and moves downward.
         */
        leftAnimation = gsap.fromTo(
          leftTrack,
          {
            y: -leftHeight,
          },
          {
            y: 0,
            duration: 32,
            ease: "none",
            repeat: -1,
          },
        );

        /*
         * RIGHT
         * Starts from top and moves upward.
         */
        rightAnimation = gsap.fromTo(
          rightTrack,
          {
            y: 0,
          },
          {
            y: -rightHeight,
            duration: 36,
            ease: "none",
            repeat: -1,
          },
        );
      }

      /*
       * ----------------------------------------------------
       * MOBILE ANIMATION
       * ----------------------------------------------------
       */

      let mobileAnimation: gsap.core.Tween | null = null;

      if (mobileTrack) {
        /*
         * We duplicate the complete gallery list.
         *
         * The first half and second half are identical.
         * Once the first half has moved completely out,
         * GSAP jumps back to 0 invisibly because the second
         * half looks exactly the same.
         */

        const mobileHeight = mobileTrack.scrollHeight / 2;

        mobileAnimation = gsap.fromTo(
          mobileTrack,
          {
            y: 0,
          },
          {
            y: -mobileHeight,
            duration: 42,
            ease: "none",
            repeat: -1,
          },
        );
      }

      /*
       * ----------------------------------------------------
       * HEADER ANIMATION
       * ----------------------------------------------------
       */

      if (header) {
        gsap.fromTo(
          header,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
        );
      }

      /*
       * ----------------------------------------------------
       * DESKTOP HOVER CONTROL
       * ----------------------------------------------------
       */

      const slowDown = () => {
        if (leftAnimation) {
          leftAnimation.timeScale(0.15);
        }

        if (rightAnimation) {
          rightAnimation.timeScale(0.15);
        }

        if (mobileAnimation) {
          mobileAnimation.timeScale(0.15);
        }
      };

      const speedUp = () => {
        if (leftAnimation) {
          leftAnimation.timeScale(1);
        }

        if (rightAnimation) {
          rightAnimation.timeScale(1);
        }

        if (mobileAnimation) {
          mobileAnimation.timeScale(1);
        }
      };

      section.addEventListener("mouseenter", slowDown);
      section.addEventListener("mouseleave", speedUp);

      /*
       * ----------------------------------------------------
       * CLEANUP
       * ----------------------------------------------------
       */

      return () => {
        section.removeEventListener("mouseenter", slowDown);
        section.removeEventListener("mouseleave", speedUp);

        leftAnimation?.kill();
        rightAnimation?.kill();
        mobileAnimation?.kill();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative overflow-hidden bg-[#18120F] py-20 sm:py-24 lg:py-28"
    >
      {/* ==================================================
          BACKGROUND AMBIENCE
      ================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[18%] h-[320px] w-[320px] rounded-full bg-[#8B2415]/10 blur-[110px]" />

        <div className="absolute right-[-8%] top-[50%] h-[380px] w-[380px] rounded-full bg-[#C69A42]/8 blur-[130px]" />

        <div className="absolute bottom-[-10%] left-[35%] h-[300px] w-[300px] rounded-full bg-[#A52A16]/8 blur-[120px]" />
      </div>

      {/* ==================================================
          MAIN CONTAINER
      ================================================== */}

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          ref={headerRef}
          data-gallery-header
          className="mb-12 flex flex-col justify-between gap-8 opacity-0 sm:mb-14 lg:flex-row lg:items-end"
        >
          <div className="max-w-[760px]">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-[10px] font-medium tracking-[0.28em] text-[#C69A42]">
                ०५
              </span>

              <span className="h-px w-10 bg-[#C69A42]/40" />

              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
                दृश्य संग्रह
              </span>
            </div>

            <h2 className="text-[clamp(2.4rem,6vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#FFF9EF]">
              परंपरा के
              <br />
              <span className="text-white/40">कुछ दृश्य।</span>
            </h2>
          </div>

          <Link
            href="/gallery"
            className="group inline-flex w-fit items-center gap-3 border-b border-white/20 pb-2 text-sm text-white/70 transition-colors duration-300 hover:border-[#C69A42] hover:text-[#C69A42]"
          >
            <span>पूरा संग्रह देखें</span>

            <ArrowUpRight
              size={15}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* ==================================================
            GALLERY VIEWPORT
        ================================================== */}

        <div
          className="
            relative
            mx-auto
            max-w-[1250px]
            overflow-hidden
          "
        >
          {/* ==================================================
              DESKTOP / TABLET VIEWPORT
          ================================================== */}

          <div
            className="
              relative
              hidden
              h-[680px]
              grid-cols-2
              gap-4
              overflow-hidden
              sm:grid
            "
          >
            {/* Top fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-28 bg-gradient-to-b from-[#18120F] via-[#18120F]/70 to-transparent" />

            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-32 bg-gradient-to-t from-[#18120F] via-[#18120F]/70 to-transparent" />

            {/* ==================================================
                LEFT COLUMN
            ================================================== */}

            <div className="relative overflow-hidden">
              <div
                ref={leftTrackRef}
                className="flex flex-col gap-4 will-change-transform"
              >
                {[...leftColumn, ...leftColumn].map((item, index) => (
                  <GalleryCard
                    key={`left-${item.title}-${index}`}
                    item={item}
                    index={index % leftColumn.length}
                  />
                ))}
              </div>
            </div>

            {/* ==================================================
                RIGHT COLUMN
            ================================================== */}

            <div className="relative overflow-hidden">
              <div
                ref={rightTrackRef}
                className="flex flex-col gap-4 will-change-transform"
              >
                {[...rightColumn, ...rightColumn].map((item, index) => (
                  <GalleryCard
                    key={`right-${item.title}-${index}`}
                    item={item}
                    index={(index % rightColumn.length) + 4}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ==================================================
              MOBILE VIEW
          ================================================== */}

          <div className="relative h-[620px] overflow-hidden sm:hidden">
            {/* Mobile top fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-24 bg-gradient-to-b from-[#18120F] via-[#18120F]/65 to-transparent" />

            {/* Mobile bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-28 bg-gradient-to-t from-[#18120F] via-[#18120F]/65 to-transparent" />

            {/* Mobile animated track */}
            <div
              ref={mobileTrackRef}
              className="flex flex-col gap-4 will-change-transform px-1"
            >
              {/* FIRST SET */}
              {galleryItems.map((item, index) => (
                <GalleryCard
                  key={`mobile-first-${item.title}-${index}`}
                  item={item}
                  index={index}
                />
              ))}

              {/* DUPLICATED SET FOR SEAMLESS LOOP */}
              {galleryItems.map((item, index) => (
                <GalleryCard
                  key={`mobile-second-${item.title}-${index}`}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ==================================================
            BOTTOM DETAILS
        ================================================== */}

        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
            Ujjain · Madhya Pradesh
          </p>

          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
            Vedic Tradition
          </p>
        </div>
      </div>
    </section>
  );
}
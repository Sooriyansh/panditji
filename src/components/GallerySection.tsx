"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const galleryItems = [
  {
    src: "/G1.png",
    title: "पूजा अनुष्ठान",
    category: "पूजा",
    width: "w-[280px] sm:w-[360px] lg:w-[420px]",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/G2.png",
    title: "हवन एवं संकल्प",
    category: "अनुष्ठान",
    width: "w-[340px] sm:w-[440px] lg:w-[520px]",
    aspect: "aspect-[5/4]",
  },
  {
    src: "/G3.png",
    title: "नवग्रह शांति",
    category: "पूजा",
    width: "w-[280px] sm:w-[360px] lg:w-[420px]",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/G4.png",
    title: "वैदिक ज्योतिष",
    category: "ज्योतिष",
    width: "w-[340px] sm:w-[440px] lg:w-[520px]",
    aspect: "aspect-[5/4]",
  },
  {
    src: "/images/services/dosha-shanti.png",
    title: "दोष शांति",
    category: "दोष निवारण",
    width: "w-[280px] sm:w-[360px] lg:w-[420px]",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/services/shiv-puja.png",
    title: "शिव पूजा",
    category: "पूजा",
    width: "w-[340px] sm:w-[440px] lg:w-[520px]",
    aspect: "aspect-[5/4]",
  },
  {
    src: "/images/services/navgraha-shanti.png",
    title: "नवग्रह शांति",
    category: "अनुष्ठान",
    width: "w-[280px] sm:w-[360px] lg:w-[420px]",
    aspect: "aspect-[4/5]",
  },
];

const duplicatedItems = [...galleryItems, ...galleryItems];

const ease = [0.22, 1, 0.36, 1] as const;

export default function GallerySection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const ctx = gsap.context(() => {
      const animation = gsap.to(track, {
        xPercent: -50,
        duration: 38,
        ease: "none",
        repeat: -1,
      });

      const pause = () => {
        gsap.to(animation, {
          timeScale: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const resume = () => {
        gsap.to(animation, {
          timeScale: 1,
          duration: 0.7,
          ease: "power2.out",
        });
      };

      track.addEventListener("mouseenter", pause);
      track.addEventListener("mouseleave", resume);

      return () => {
        track.removeEventListener("mouseenter", pause);
        track.removeEventListener("mouseleave", resume);
      };
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <section className="overflow-hidden bg-[#18120F] py-24 text-[#FFF9EF] sm:py-28 lg:py-36">
      {/* Header */}
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#C69A42]" />

                <span className="text-[10px] font-medium tracking-[0.18em] text-[#C69A42]">
                  ०५ / दृश्य संग्रह
                </span>
              </div>

              <h2 className="mt-7 max-w-2xl font-serif text-[clamp(3rem,5.5vw,5.5rem)] leading-[0.9] tracking-[-0.04em]">
                परंपरा के
                <br />
                <span className="text-[#C69A42]">कुछ दृश्य।</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="max-w-md lg:pb-1"
            >
              <p className="text-sm leading-7 text-[#FFF9EF]/45 sm:text-base">
                पूजा, अनुष्ठान और वैदिक ज्योतिष से जुड़े कुछ
                चुनिंदा क्षण — श्रद्धा और परंपरा के साथ।
              </p>

              <Link
                href="/gallery"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#C69A42] transition-colors duration-300 hover:text-[#FFF9EF]"
              >
                <span>पूरी गैलरी देखें</span>

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gallery marquee */}
      <div className="relative mt-14 overflow-hidden sm:mt-16 lg:mt-20">
        {/* Left fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#18120F] to-transparent sm:w-28 lg:w-40"
        />

        {/* Right fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#18120F] to-transparent sm:w-28 lg:w-40"
        />

        <div
          ref={trackRef}
          className="flex w-max gap-4 will-change-transform sm:gap-5"
        >
          {duplicatedItems.map((item, index) => (
            <motion.div
              key={`${item.src}-${index}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: Math.min(index, 4) * 0.06,
                ease,
              }}
              className={`${item.width} shrink-0`}
            >
              <div
                className={`group relative overflow-hidden rounded-2xl bg-[#241B17] ${item.aspect}`}
              >
                <Image
                  src={item.src}
                  alt={`${item.title} — सुमित शर्मा`}
                  fill
                  sizes="520px"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-[9px] font-medium tracking-[0.18em] text-[#E8C46C]">
                        {item.category}
                      </p>

                      <h3 className="mt-2 font-serif text-2xl leading-none text-white sm:text-3xl">
                        {item.title}
                      </h3>
                    </div>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/15 text-white backdrop-blur-sm transition-all duration-400 group-hover:border-[#E8C46C]/60 group-hover:bg-[#E8C46C] group-hover:text-[#18120F]">
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </div>

                {/* Top number */}
                <span className="absolute left-5 top-5 font-mono text-[9px] tracking-[0.15em] text-white/45 sm:left-6 sm:top-6">
                  {String((index % galleryItems.length) + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1280px] border-t border-[#FFF9EF]/10 pt-5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] tracking-[0.16em] text-[#FFF9EF]/25">
              पूजा • अनुष्ठान • ज्योतिष
            </span>

            <div className="flex items-center gap-2 text-[#FFF9EF]/25">
              <span className="h-1 w-1 rounded-full bg-[#C69A42]" />

              <span className="text-[9px] tracking-[0.14em]">
                दृश्य संग्रह
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
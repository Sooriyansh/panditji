"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LOADER_DURATION = 2100;
const EXIT_DURATION = 0.55;

const BG_COLOR = "#5A120E";
const GOLD = "#C69A42";
const GOLD_LIGHT = "#D9B866";
const CREAM = "#F3E4C7";
const WHITE = "#FFFDF8";

const DEVANAGARI_FONT =
  '"Noto Serif Devanagari", "Noto Sans Devanagari", serif';

const EASE = [0.22, 1, 0.36, 1];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, LOADER_DURATION);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.015,
            transition: {
              duration: EXIT_DURATION,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            overflow-hidden
          "
          style={{
            backgroundColor: BG_COLOR,
          }}
          role="status"
          aria-label="Loading website"
        >
          {/* =====================================================
              BACKGROUND ATMOSPHERE
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.2,
              ease: EASE,
            }}
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[280px]
              w-[280px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              blur-[90px]
              lg:h-[400px]
              lg:w-[400px]
              lg:blur-[120px]
            "
            style={{
              backgroundColor: "rgba(198,154,66,0.055)",
            }}
          />

          {/* =====================================================
              CENTER CONTENT
          ====================================================== */}

          <div className="relative flex flex-col items-center text-center">

            {/* =================================================
                OM
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.84,
                y: 5,
                filter: "blur(5px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.72,
                ease: EASE,
              }}
              className="relative"
            >
              {/* OM glow */}

              <motion.div
                animate={{
                  opacity: [0.10, 0.22, 0.10],
                  scale: [1, 1.12, 1],
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  scale-150
                  rounded-full
                  bg-[#C69A42]
                  blur-2xl
                  lg:blur-3xl
                "
              />

              {/* OM */}

              <motion.span
                animate={{
                  opacity: [0.92, 1, 0.92],
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative
                  block
                  text-[72px]
                  leading-none
                  sm:text-[82px]
                  lg:text-[110px]
                  xl:text-[120px]
                "
                style={{
                  fontFamily: DEVANAGARI_FONT,
                  color: GOLD_LIGHT,
                  textShadow:
                    "0 5px 24px rgba(198,154,66,0.16)",
                }}
              >
                ॐ
              </motion.span>
            </motion.div>

            {/* =================================================
                BRAND NAME
            ================================================== */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 8,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                delay: 0.22,
                duration: 0.58,
                ease: EASE,
              }}
              className="
                mt-5
                text-center
                text-[22px]
                font-medium
                leading-tight
                sm:text-[26px]
                lg:mt-7
                lg:text-[34px]
                xl:text-[38px]
              "
              style={{
                fontFamily: DEVANAGARI_FONT,
                color: WHITE,
              }}
            >
              पंडित सुमित शर्मा
            </motion.h1>

            {/* =================================================
                TAGLINE
            ================================================== */}

            <motion.p
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 0.72,
                y: 0,
              }}
              transition={{
                delay: 0.38,
                duration: 0.5,
                ease: EASE,
              }}
              className="
                mt-2
                text-[13px]
                sm:text-sm
                lg:mt-3
                lg:text-[17px]
                xl:text-[18px]
              "
              style={{
                fontFamily: DEVANAGARI_FONT,
                color: CREAM,
              }}
            >
              वैदिक परंपरा • आध्यात्मिक मार्गदर्शन
            </motion.p>

            {/* =================================================
                PROGRESS
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.55,
                duration: 0.4,
              }}
              className="
                mt-8
                h-[2px]
                w-36
                overflow-hidden
                rounded-full
                lg:mt-10
                lg:w-[180px]
              "
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
              }}
            >
              <motion.div
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  delay: 0.35,
                  duration: 1.45,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className="h-full"
                style={{
                  backgroundColor: GOLD,
                }}
              />
            </motion.div>
          </div>

          {/* =====================================================
              SUBTLE FOOTER
          ====================================================== */}

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.28,
            }}
            transition={{
              delay: 0.9,
              duration: 0.5,
            }}
            className="
              absolute
              bottom-6
              left-0
              right-0
              text-center
              text-[8px]
              tracking-[0.22em]
              sm:text-[9px]
            "
            style={{
              fontFamily: DEVANAGARI_FONT,
              color: CREAM,
            }}
          >
            श्रद्धा • संकल्प • साधना
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import Image from "next/image";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "पूज्य गुरुजी बंशीधर शास्त्री जी | पावन स्मृति | उज्जैन",
  description:
    "पूज्य गुरुजी बंशीधर शास्त्री जी की पावन स्मृति, वैदिक परंपरा, पूजा-विधान और ज्योतिषीय ज्ञान के प्रति उनके योगदान एवं गुरु-शिष्य परंपरा के बारे में जानें।",
  path: "/about",
  image: "/pandit-img.jpeg",
});

/* =========================================================
   ICONS
========================================================= */

function OmSymbol({ dark = false }) {
  return (
    <div
      className={`relative grid h-20 w-20 place-items-center rounded-full border ${
        dark
          ? "border-[#d8ad63]/40 bg-[#fffaf2]/10 text-[#e7bd6d]"
          : "border-[#c9943d]/40 bg-[#fffaf2] text-[#9b6426]"
      } shadow-[0_0_60px_rgba(216,154,61,0.15)]`}
    >
      <span
        className="relative z-10 text-[38px] leading-none"
        style={{
          fontFamily:
            '"Noto Serif Devanagari", "Nirmala UI", serif',
        }}
      >
        ॐ
      </span>

      <span
        className={`absolute inset-[-8px] rounded-full border ${
          dark ? "border-[#d8ad63]/20" : "border-[#c9943d]/20"
        }`}
      />

      <span
        className={`absolute inset-[-17px] rounded-full border ${
          dark ? "border-[#d8ad63]/10" : "border-[#c9943d]/10"
        }`}
      />
    </div>
  );
}

function LotusMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 20c-4.8 0-8-2.7-9-6 2.2.2 4 .7 5.3 1.6C7.5 12.2 8.4 8.3 12 4c3.6 4.3 4.5 8.2 3.7 11.6 1.3-.9 3.1-1.4 5.3-1.6-1 3.3-4.2 6-9 6Z" />
      <path d="M12 7v13M7 18.5c2.1-.3 3.7-1.1 5-2.5 1.3 1.4 2.9 2.2 5 2.5" />
    </svg>
  );
}

function QuoteMark() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="h-10 w-10"
      aria-hidden="true"
    >
      <path
        d="M7 26.5C7 19.3 10.6 13.7 18 9.8v5.1c-2.6 1.9-4.2 4-4.7 6.2h5.1V31H7v-4.5Zm15.6 0c0-7.2 3.6-12.8 11-16.7v5.1c-2.6 1.9-4.2 4-4.7 6.2H34V31H22.6v-4.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fcf5e8]">

      {/* =====================================================
          HERO / MEMORIAL HEADER
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-[#ead7af] bg-[#fffaf2] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full border border-[#c9943d]/10" />

        <div className="pointer-events-none absolute -left-32 -top-32 h-[360px] w-[360px] rounded-full border border-[#c9943d]/10" />

        <div className="pointer-events-none absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-[#d89a3d]/8 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">

          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#c9943d]" />

            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#a85e25]">
              गुरु स्मरण • उज्जैन
            </span>

            <span className="h-px w-12 bg-[#c9943d]" />
          </div>

          <div className="mt-8 flex justify-center">
            <OmSymbol />
          </div>

          <h1
            className="mt-9 text-4xl font-bold tracking-tight text-[#51230f] sm:text-5xl lg:text-6xl"
            style={{
              fontFamily:
                '"Noto Serif Devanagari", "Nirmala UI", serif',
            }}
          >
            पूज्य गुरुजी
            <span className="mt-2 block text-[#a85e25]">
              बंशीधर शास्त्री जी
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base font-medium leading-8 text-[#70401f] sm:text-lg">
            वैदिक ज्ञान, पूजा-विधान और संस्कारों की उस गुरु परंपरा की
            पावन स्मृति, जिसे श्रद्धा और सम्मान के साथ आज भी संजोया जाता है।
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 text-xs font-semibold text-[#98704b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9943d]" />
            श्रद्धा
            <span className="text-[#c9943d]">•</span>
            स्मृति
            <span className="text-[#c9943d]">•</span>
            परंपरा
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9943d]" />
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">

        {/* ===================================================
            GURUJI IMAGE + INTRO
        =================================================== */}

        <section className="overflow-hidden rounded-[2rem] border border-[#d8bd88] bg-[#f4e6cc] shadow-[0_25px_70px_rgba(80,42,12,0.12)]">

          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">

            {/* IMAGE */}

            <div className="group relative min-h-[500px] overflow-hidden sm:min-h-[650px]">

              <Image
                src="/pandit-img.jpeg"
                alt="पूज्य गुरुजी बंशीधर शास्त्री जी"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center transition duration-[1600ms] ease-out group-hover:scale-[1.025]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#291307]/90 via-[#291307]/15 to-transparent" />

              {/* Om */}
              <div className="absolute left-6 top-6">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-[#f4d18b]/40 bg-[#fffaf2]/15 text-2xl text-[#ffe0a0] backdrop-blur-md">
                  ॐ
                </div>
              </div>

              {/* Image caption */}

              <div className="absolute bottom-7 left-6 right-6">

                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#fffaf2]/90 px-4 py-2 text-xs font-bold text-[#653016] backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#c68b2c]" />
                  पावन स्मृति
                </div>

                <h2
                  className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl"
                  style={{
                    fontFamily:
                      '"Noto Serif Devanagari", "Nirmala UI", serif',
                  }}
                >
                  बंशीधर शास्त्री जी
                </h2>

                <p className="mt-2 text-sm font-medium text-amber-100/90">
                  वैदिक परंपरा • ज्ञान • संस्कार
                </p>
              </div>
            </div>

            {/* CONTENT */}

            <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-14">

              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#c9943d]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#94621f]">
                  गुरु स्मरण
                </span>
              </div>

              <h2
                className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#4c200d] sm:text-4xl"
                style={{
                  fontFamily:
                    '"Noto Serif Devanagari", "Nirmala UI", serif',
                }}
              >
                ज्ञान और संस्कार की
                <span className="mt-2 block text-[#9b5a20]">
                  पावन विरासत
                </span>
              </h2>

              <div className="mt-6 h-px w-20 bg-[#c9943d]" />

              <p className="mt-7 text-base leading-8 text-[#69401f]">
                पूज्य गुरुजी बंशीधर शास्त्री जी का स्मरण उस वैदिक
                परंपरा के प्रति श्रद्धा का प्रतीक है, जिसमें ज्ञान,
                साधना, अनुशासन और सेवा को विशेष महत्व दिया जाता है।
              </p>

              <p className="mt-5 text-base leading-8 text-[#69401f]">
                उनके सान्निध्य में प्राप्त वैदिक ज्योतिष, पूजा-विधान
                और पारंपरिक धार्मिक ज्ञान की शिक्षा एवं मार्गदर्शन
                गुरु-शिष्य परंपरा की उस भावना को दर्शाते हैं जिसमें
                ज्ञान को केवल सीखा नहीं जाता, बल्कि सम्मान और साधना
                के साथ आगे बढ़ाया जाता है।
              </p>

              {/* Highlights */}

              <div className="mt-9 grid gap-3 sm:grid-cols-3">

                <div className="rounded-2xl border border-[#dfc99e] bg-[#fff9ec] p-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff1d4] text-[#a85e25]">
                    <LotusMark />
                  </div>

                  <h3 className="mt-4 font-bold text-[#51230f]">
                    वैदिक ज्ञान
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#805332]">
                    वैदिक परंपरा और धार्मिक ज्ञान की शिक्षा।
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfc99e] bg-[#fff9ec] p-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff1d4] text-[#a85e25]">
                    <span className="text-lg">ॐ</span>
                  </div>

                  <h3 className="mt-4 font-bold text-[#51230f]">
                    पूजा-विधान
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#805332]">
                    पारंपरिक पूजा एवं धार्मिक विधियों की समझ।
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dfc99e] bg-[#fff9ec] p-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff1d4] text-[#a85e25]">
                    <span className="text-lg">✦</span>
                  </div>

                  <h3 className="mt-4 font-bold text-[#51230f]">
                    संस्कार
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#805332]">
                    श्रद्धा, अनुशासन और सेवा की भावना।
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            ABOUT GURUJI
        =================================================== */}

        <section className="mt-14 sm:mt-20">

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">

            {/* LEFT */}

            <div className="rounded-[2rem] bg-[#51230f] p-8 shadow-[0_20px_55px_rgba(80,42,12,0.14)] sm:p-10">

              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#d3a653]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e7bd6d]">
                  गुरु परंपरा
                </span>
              </div>

              <h2
                className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl"
                style={{
                  fontFamily:
                    '"Noto Serif Devanagari", "Nirmala UI", serif',
                }}
              >
                गुरु का ज्ञान
                <span className="mt-2 block text-[#f1cb7d]">
                  जीवन का संस्कार
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-[#f1dfc3]">
                भारतीय परंपरा में गुरु को ज्ञान और मार्गदर्शन का
                स्रोत माना गया है। गुरु-शिष्य संबंध केवल शिक्षा
                तक सीमित नहीं होता, बल्कि उसमें संस्कार, अनुशासन,
                श्रद्धा और सेवा भी सम्मिलित होते हैं।
              </p>

              <div className="mt-9 h-px bg-[#c9943d]/30" />

              <div className="mt-7 flex items-center gap-4">

                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d8ad63]/30 bg-[#fffaf2]/10 text-xl text-[#e7bd6d]">
                  ॐ
                </div>

                <div>
                  <p className="text-sm font-bold text-[#f5d99c]">
                    श्रद्धा एवं नमन
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#d9c09a]">
                    पूज्य गुरुजी बंशीधर शास्त्री जी की पावन स्मृति को
                    समर्पित
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT */}

            <div className="rounded-[2rem] border border-[#dfc99e] bg-[#fffdf9] p-7 shadow-[0_15px_45px_rgba(80,42,12,0.07)] sm:p-10">

              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#c9943d]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a85e25]">
                  जीवन एवं परंपरा
                </span>
              </div>

              <h2
                className="mt-5 text-3xl font-bold leading-tight text-[#51230f] sm:text-4xl"
                style={{
                  fontFamily:
                    '"Noto Serif Devanagari", "Nirmala UI", serif',
                }}
              >
                एक गुरु,
                <span className="block text-[#a85e25]">
                  एक अमूल्य विरासत
                </span>
              </h2>

              <div className="mt-6 space-y-5 text-[15px] leading-8 text-[#69401f]">

                <p>
                  पूज्य गुरुजी बंशीधर शास्त्री जी से प्राप्त शिक्षा
                  वैदिक ज्योतिष, पूजा-विधान और पारंपरिक धार्मिक
                  अनुष्ठानों की समझ पर आधारित रही।
                </p>

                <p>
                  गुरुजी की स्मृति उस ज्ञान और परंपरा की याद दिलाती
                  है जिसे श्रद्धा, अनुशासन और निरंतर साधना के माध्यम
                  से आगे बढ़ाया जाता है।
                </p>

                <p>
                  गुरु के प्रति सम्मान केवल शब्दों में नहीं, बल्कि
                  उनके द्वारा दिए गए संस्कारों और मूल्यों को अपने
                  आचरण और सेवा में स्थान देने से प्रकट होता है।
                </p>

              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">

                <div className="rounded-2xl border border-[#ead7af] bg-[#fff9ec] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a85e25]">
                    शिक्षा
                  </p>

                  <p className="mt-2 font-semibold leading-7 text-[#51230f]">
                    वैदिक ज्योतिष एवं पारंपरिक ज्ञान
                  </p>
                </div>

                <div className="rounded-2xl border border-[#ead7af] bg-[#fff9ec] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a85e25]">
                    संस्कार
                  </p>

                  <p className="mt-2 font-semibold leading-7 text-[#51230f]">
                    श्रद्धा, अनुशासन एवं सेवा
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            QUOTE
        =================================================== */}

        <section className="relative mt-14 overflow-hidden rounded-[2rem] border border-[#d8bd88] bg-[#f4e6cc] px-6 py-14 text-center sm:mt-20 sm:px-10 sm:py-20">

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9943d]/10" />

          <div className="relative mx-auto max-w-3xl">

            <div className="mx-auto flex justify-center text-[#b9822e]">
              <QuoteMark />
            </div>

            <blockquote
              className="mt-7 text-2xl font-bold leading-[1.7] text-[#51230f] sm:text-3xl lg:text-4xl"
              style={{
                fontFamily:
                  '"Noto Serif Devanagari", "Nirmala UI", serif',
              }}
            >
              गुरु से प्राप्त ज्ञान केवल सीखा नहीं जाता,
              <span className="block text-[#9b5a20]">
                उसे श्रद्धा, साधना और सेवा के माध्यम से आगे बढ़ाया जाता है।
              </span>
            </blockquote>

            <div className="mx-auto mt-8 h-px w-16 bg-[#c9943d]" />

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[#94621f]">
              पूज्य गुरुजी बंशीधर शास्त्री जी की पावन स्मृति में
            </p>
          </div>
        </section>

        {/* ===================================================
            VALUES
        =================================================== */}

        <section className="mt-14 sm:mt-20">

          <div className="mx-auto max-w-3xl text-center">

            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#c9943d]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a85e25]">
                गुरु से प्राप्त संस्कार
              </span>

              <span className="h-px w-10 bg-[#c9943d]" />
            </div>

            <h2
              className="mt-5 text-3xl font-bold tracking-tight text-[#51230f] sm:text-4xl"
              style={{
                fontFamily:
                  '"Noto Serif Devanagari", "Nirmala UI", serif',
              }}
            >
              परंपरा के चार आधार
            </h2>

            <p className="mt-4 leading-7 text-[#70401f]">
              गुरु-शिष्य परंपरा में ज्ञान के साथ उन मूल्यों का भी
              महत्व है जो जीवन और सेवा को दिशा देते हैं।
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* 01 */}

            <div className="group rounded-[1.5rem] border border-[#ead7af] bg-[#fffdf9] p-6 text-center shadow-[0_10px_30px_rgba(80,42,12,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#c9943d]">

              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#fff1d4] text-[#a85e25] transition duration-300 group-hover:scale-105">
                <span className="text-xl">ॐ</span>
              </div>

              <p className="mt-5 text-[10px] font-bold tracking-[0.2em] text-[#b17a35]">
                01
              </p>

              <h3 className="mt-2 text-lg font-bold text-[#51230f]">
                ज्ञान
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#805332]">
                वैदिक एवं पारंपरिक ज्ञान के प्रति सम्मान।
              </p>
            </div>

            {/* 02 */}

            <div className="group rounded-[1.5rem] border border-[#ead7af] bg-[#fffdf9] p-6 text-center shadow-[0_10px_30px_rgba(80,42,12,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#c9943d]">

              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#fff1d4] text-[#a85e25] transition duration-300 group-hover:scale-105">
                <LotusMark />
              </div>

              <p className="mt-5 text-[10px] font-bold tracking-[0.2em] text-[#b17a35]">
                02
              </p>

              <h3 className="mt-2 text-lg font-bold text-[#51230f]">
                श्रद्धा
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#805332]">
                गुरु और परंपरा के प्रति विनम्रता एवं सम्मान।
              </p>
            </div>

            {/* 03 */}

            <div className="group rounded-[1.5rem] border border-[#ead7af] bg-[#fffdf9] p-6 text-center shadow-[0_10px_30px_rgba(80,42,12,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#c9943d]">

              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#fff1d4] text-[#a85e25] transition duration-300 group-hover:scale-105">
                <span className="text-xl">✦</span>
              </div>

              <p className="mt-5 text-[10px] font-bold tracking-[0.2em] text-[#b17a35]">
                03
              </p>

              <h3 className="mt-2 text-lg font-bold text-[#51230f]">
                साधना
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#805332]">
                निरंतर अभ्यास, अनुशासन और आत्मिक साधना।
              </p>
            </div>

            {/* 04 */}

            <div className="group rounded-[1.5rem] border border-[#ead7af] bg-[#fffdf9] p-6 text-center shadow-[0_10px_30px_rgba(80,42,12,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#c9943d]">

              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#fff1d4] text-[#a85e25] transition duration-300 group-hover:scale-105">
                <span className="text-xl">✧</span>
              </div>

              <p className="mt-5 text-[10px] font-bold tracking-[0.2em] text-[#b17a35]">
                04
              </p>

              <h3 className="mt-2 text-lg font-bold text-[#51230f]">
                सेवा
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#805332]">
                प्राप्त ज्ञान और संस्कारों को सेवा के माध्यम से आगे बढ़ाना।
              </p>
            </div>

          </div>
        </section>

        {/* ===================================================
            FINAL MEMORIAL
        =================================================== */}

        <section className="relative mt-14 overflow-hidden rounded-[2rem] bg-[#51230f] px-6 py-16 text-center shadow-[0_25px_65px_rgba(80,42,12,0.18)] sm:mt-20 sm:px-10 sm:py-20">

          <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#d89a3d]/15 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#a85e25]/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">

            <div className="flex justify-center">
              <OmSymbol dark />
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-[#e7bd6d]">
              श्रद्धांजलि • नमन • स्मरण
            </p>

            <h2
              className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
              style={{
                fontFamily:
                  '"Noto Serif Devanagari", "Nirmala UI", serif',
              }}
            >
              पूज्य गुरुजी
              <span className="block text-[#f1cb7d]">
                बंशीधर शास्त्री जी
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-[#f5dfbd]">
              उनकी पावन स्मृति, उनके द्वारा दिए गए ज्ञान और संस्कारों
              के प्रति श्रद्धा एवं सम्मान के साथ।
            </p>

            <div className="mx-auto mt-9 h-px w-20 bg-[#d8ad63]" />

            <p className="mt-6 text-sm font-semibold tracking-wide text-[#e7c98f]">
              ॐ शांति • ॐ शांति • ॐ शांति
            </p>

          </div>
        </section>

      </div>
    </main>
  );
}
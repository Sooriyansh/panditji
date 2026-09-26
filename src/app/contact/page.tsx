import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  AtSign,
} from "lucide-react";
import { generatePageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "संपर्क करें | उज्जैन",
  description:
    "पंडित सुमित शर्मा जी से पूजा, अनुष्ठान और पारंपरिक ज्योतिषीय मार्गदर्शन के लिए संपर्क करें।",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fff9f0] text-[#24150e]">

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[#35170d] px-5 py-24 text-[#fff9ec] sm:px-8 sm:py-28 lg:px-12 lg:py-36">

        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[600px]
            w-[600px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#c69a42]/10
            blur-[120px]
          "
        />

        {/* Subtle pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #e8c46c 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-5xl text-center">

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#c69a42]" />

            <span className="text-[10px] font-medium tracking-[0.2em] text-[#e8c46c]">
              उज्जैन • संपर्क
            </span>

            <span className="h-px w-10 bg-[#c69a42]" />
          </div>

          {/* OM */}
          <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#e8c46c]/30 bg-white/[0.04] text-3xl text-[#e8c46c]">
            ॐ
          </div>

          {/* Title */}
          <h1 className="mt-8 font-serif text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            संपर्क
            <span className="text-[#e8c46c]"> करें</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#fff9ec]/65 sm:text-base sm:leading-8">
            पूजा, अनुष्ठान या पारंपरिक ज्योतिषीय मार्गदर्शन से
            संबंधित अपनी आवश्यकता साझा करें।
          </p>

          {/* Keywords */}
          <div className="mt-10 flex items-center justify-center gap-3 text-[10px] tracking-[0.16em] text-[#fff9ec]/40">
            <span>पूजा</span>

            <span className="h-1 w-1 rounded-full bg-[#c69a42]" />

            <span>अनुष्ठान</span>

            <span className="h-1 w-1 rounded-full bg-[#c69a42]" />

            <span>मार्गदर्शन</span>
          </div>

        </div>
      </section>

      {/* ===================================================== */}
      {/* CONTACT INFORMATION */}
      {/* ===================================================== */}

      <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">

        {/* Section heading */}

        <div className="mb-14 max-w-3xl">

          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#c69a42]" />

            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#9b681f]">
              ०१ / संपर्क जानकारी
            </span>
          </div>

          <h2 className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#2a160d] sm:text-5xl lg:text-6xl">
            सही जानकारी,
            <br />
            <span className="text-[#8b3516]">
              सही मार्गदर्शन।
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#704f3c]">
            पूजा, अनुष्ठान अथवा ज्योतिषीय मार्गदर्शन के लिए नीचे दिए गए
            माध्यमों से संपर्क किया जा सकता है। उपलब्धता और आगे की
            प्रक्रिया संपर्क के बाद निर्धारित की जाती है।
          </p>

        </div>

        {/* ================================================= */}
        {/* CONTACT GRID */}
        {/* ================================================= */}

        <div className="grid gap-5 md:grid-cols-2">

          {/* ================================================= */}
          {/* LOCATION */}
          {/* ================================================= */}

          <div className="group rounded-[28px] border border-[#ead6b9] bg-[#fffdf9] p-7 shadow-[0_12px_40px_rgba(94,52,18,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#c69a42]/60 hover:shadow-[0_20px_50px_rgba(94,52,18,0.1)] sm:p-8">

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ead6b9] bg-[#fff8eb] text-[#8b3516] transition-all duration-500 group-hover:border-[#e8c46c] group-hover:bg-[#e8c46c] group-hover:text-[#35170d]">
                <MapPin size={20} strokeWidth={1.5} />
              </div>

              <span className="font-mono text-xs tracking-[0.16em] text-[#a58268]">
                01
              </span>

            </div>

            <p className="mt-8 text-[10px] font-semibold tracking-[0.2em] text-[#a06b24]">
              स्थान
            </p>

            <h3 className="mt-3 font-serif text-3xl font-semibold text-[#32170d]">
              उज्जैन
            </h3>

            <p className="mt-3 text-base leading-7 text-[#70401f]">
              {siteConfig.location}
            </p>

          </div>

          {/* ================================================= */}
          {/* PHONE */}
          {/* ================================================= */}

          <div className="group rounded-[28px] border border-[#ead6b9] bg-[#fffdf9] p-7 shadow-[0_12px_40px_rgba(94,52,18,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#c69a42]/60 hover:shadow-[0_20px_50px_rgba(94,52,18,0.1)] sm:p-8">

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ead6b9] bg-[#fff8eb] text-[#8b3516] transition-all duration-500 group-hover:border-[#e8c46c] group-hover:bg-[#e8c46c] group-hover:text-[#35170d]">
                <Phone size={20} strokeWidth={1.5} />
              </div>

              <span className="font-mono text-xs tracking-[0.16em] text-[#a58268]">
                02
              </span>

            </div>

            <p className="mt-8 text-[10px] font-semibold tracking-[0.2em] text-[#a06b24]">
              फोन
            </p>

            <a
              href={`tel:${siteConfig.phone}`}
              className="mt-3 block font-serif text-3xl font-semibold text-[#32170d] transition-colors hover:text-[#8b3516]"
            >
              {siteConfig.phoneDisplay}
            </a>

            <p className="mt-3 text-sm leading-7 text-[#70401f]">
              सीधे संपर्क के लिए फोन करें।
            </p>

          </div>

          {/* ================================================= */}
          {/* EMAIL */}
          {/* ================================================= */}

          <div className="group rounded-[28px] border border-[#ead6b9] bg-[#fffdf9] p-7 shadow-[0_12px_40px_rgba(94,52,18,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#c69a42]/60 hover:shadow-[0_20px_50px_rgba(94,52,18,0.1)] sm:p-8">

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ead6b9] bg-[#fff8eb] text-[#8b3516] transition-all duration-500 group-hover:border-[#e8c46c] group-hover:bg-[#e8c46c] group-hover:text-[#35170d]">
                <Mail size={20} strokeWidth={1.5} />
              </div>

              <span className="font-mono text-xs tracking-[0.16em] text-[#a58268]">
                03
              </span>

            </div>

            <p className="mt-8 text-[10px] font-semibold tracking-[0.2em] text-[#a06b24]">
              ईमेल
            </p>

            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 block break-all font-serif text-2xl font-semibold text-[#32170d] transition-colors hover:text-[#8b3516] sm:text-3xl"
            >
              {siteConfig.email}
            </a>

            <p className="mt-3 text-sm leading-7 text-[#70401f]">
              विस्तृत जानकारी या अनुरोध साझा करने के लिए ईमेल करें।
            </p>

          </div>

          {/* ================================================= */}
          {/* INSTAGRAM */}
          {/* ================================================= */}

          <div className="group rounded-[28px] border border-[#ead6b9] bg-[#fffdf9] p-7 shadow-[0_12px_40px_rgba(94,52,18,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#c69a42]/60 hover:shadow-[0_20px_50px_rgba(94,52,18,0.1)] sm:p-8">

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ead6b9] bg-[#fff8eb] text-[#8b3516] transition-all duration-500 group-hover:border-[#e8c46c] group-hover:bg-[#e8c46c] group-hover:text-[#35170d]">
                <AtSign size={20} strokeWidth={1.5} />
              </div>

              <span className="font-mono text-xs tracking-[0.16em] text-[#a58268]">
                04
              </span>

            </div>

            <p className="mt-8 text-[10px] font-semibold tracking-[0.2em] text-[#a06b24]">
              Instagram
            </p>

            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block font-serif text-2xl font-semibold text-[#32170d] transition-colors hover:text-[#8b3516] sm:text-3xl"
            >
              astrologer_.sumit_.sharma
            </a>

            <p className="mt-3 text-sm leading-7 text-[#70401f]">
              पूजा एवं ज्योतिष संबंधी अपडेट और जानकारी देखें।
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* CTA */}
        {/* ================================================= */}

        <section className="relative mt-16 overflow-hidden rounded-[32px] bg-[#35170d] px-6 py-14 text-center text-[#fff9ec] sm:px-10 sm:py-16 lg:mt-20">

          {/* Left glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-20
              top-1/2
              h-64
              w-64
              -translate-y-1/2
              rounded-full
              bg-[#c69a42]/10
              blur-3xl
            "
          />

          {/* Right glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-20
              top-1/2
              h-64
              w-64
              -translate-y-1/2
              rounded-full
              bg-[#7a1717]/30
              blur-3xl
            "
          />

          <div className="relative mx-auto max-w-3xl">

            <span className="text-3xl text-[#e8c46c]">
              ॐ
            </span>

            <p className="mt-5 text-[10px] font-semibold tracking-[0.2em] text-[#e8c46c]">
              पंडित सुमित शर्मा जी
            </p>

            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              अपनी आवश्यकता
              <br />
              <span className="text-[#e8c46c]">
                साझा करें।
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              पूजा, अनुष्ठान या पारंपरिक ज्योतिषीय मार्गदर्शन के लिए
              अपनी आवश्यकता बताएं। आगे की प्रक्रिया संपर्क के बाद
              समझाई जाएगी।
            </p>

            <Link
              href="/online-puja"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-[#e8c46c]
                px-6
                py-3.5
                text-sm
                font-semibold
                text-[#35170d]
                transition-all
                duration-300
                hover:bg-[#fff1c7]
                hover:shadow-[0_15px_40px_rgba(232,196,108,0.18)]
              "
            >
              पूजा बुकिंग अनुरोध भेजें

              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>

          </div>
        </section>

        {/* ================================================= */}
        {/* FOOT DETAIL */}
        {/* ================================================= */}

        <div className="mt-10 flex items-center justify-center gap-3 text-[9px] font-medium tracking-[0.18em] text-[#9a806e]">
          <span className="h-px w-8 bg-[#c69a42]/40" />

          <span>श्रद्धा • संकल्प • साधना</span>

          <span className="h-px w-8 bg-[#c69a42]/40" />
        </div>

      </section>
    </main>
  );
}
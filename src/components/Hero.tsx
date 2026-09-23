"use client";

import Link from "next/link";
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
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className="h-9 w-9 sm:h-11 sm:w-11"><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M7.5 3v4m9-4v4M3.5 9.5h17M7.5 13h.01m4.5 0h.01m4.5 0h.01M7.5 16.5h.01m4.5 0h.01m4.5 0h.01" strokeLinecap="round" /></svg>;
}

const slides: HeroSlide[] = [
  {
    badge: "शुभ मुहूर्त के अनुसार",
    heading: "वैदिक ज्योतिष से अपने जीवन को समझें।",
    description: "जन्म कुंडली, ग्रहों और जीवन की परिस्थितियों को समझकर व्यक्तिगत मार्गदर्शन प्राप्त करें।",
    primaryLabel: "पूजा बुक करें",
    primaryHref: "/online-puja",
    secondaryLabel: "ज्योतिष परामर्श",
    secondaryHref: "/kundali-analysis",
    location: "उज्जैन से वैदिक सेवाएँ",
  },
  {
    badge: "उज्जैन से वैदिक सेवाएँ",
    heading: "महाकाल की नगरी से श्रद्धा और शांति की ओर बढ़ें।",
    description: "उज्जैन की पावन भूमि से पारंपरिक पूजा, अनुष्ठान और ज्योतिषीय परामर्श प्राप्त करें।",
    primaryLabel: "पूजा बुक करें",
    primaryHref: "/online-puja",
    secondaryLabel: "ज्योतिष परामर्श",
    secondaryHref: "/kundali-analysis",
    location: "उज्जैन · मध्य प्रदेश",
  },
  {
    badge: "पारंपरिक विधि-विधान के साथ",
    heading: "महाकाल की भक्ति से जीवन में नई ऊर्जा पाएँ।",
    description: "पारंपरिक पूजा-अनुष्ठान और आध्यात्मिक मार्गदर्शन के साथ अपने महत्वपूर्ण चरणों के लिए सही दिशा खोजें।",
    primaryLabel: "पूजा बुक करें",
    primaryHref: "/online-puja",
    secondaryLabel: "ज्योतिष परामर्श",
    secondaryHref: "/kundali-analysis",
    location: "उज्जैन · मध्य प्रदेश",
  },
  {
    badge: "आपकी आस्था, हमारा मार्गदर्शन",
    heading: "सही पूजा, सही संकल्प और सही मार्गदर्शन।",
    description: "विधि-विधान और श्रद्धा के साथ सम्पन्न पूजा अनुष्ठानों के माध्यम से अपने संकल्प को एक नई दिशा दें।",
    primaryLabel: "पूजा बुक करें",
    primaryHref: "/online-puja",
    secondaryLabel: "ज्योतिष परामर्श",
    secondaryHref: "/kundali-analysis",
    location: "उज्जैन से वैदिक सेवाएँ",
  },
  {
    badge: "व्यक्तिगत ज्योतिषीय मार्गदर्शन",
    heading: "ग्रहों को समझें, अपने जीवन को नई दृष्टि से देखें।",
    description: "जन्म कुंडली और वैदिक ज्योतिष की परंपराओं के आधार पर अपने प्रश्नों को समझने के लिए व्यक्तिगत परामर्श प्राप्त करें।",
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
    const rotation = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), 4000);
    return () => window.clearInterval(rotation);
  }, []);

  return (
    <section
      aria-label="पंडित सुमित शर्मा जी की वैदिक सेवाएँ"
      className="relative isolate flex min-h-[calc(100svh-88px)] items-center overflow-hidden bg-[#1e1420] lg:-mt-24 lg:min-h-screen"
    >
      <video
        aria-hidden="true"
        autoPlay
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        loop
        muted
        playsInline
        poster="/ujjain-hero-ai.png"
      >
        <source src="/ujjain-hero-ai.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(19,14,22,0.94)_0%,rgba(27,17,22,0.78)_42%,rgba(20,13,18,0.27)_76%,rgba(19,14,22,0.48)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(219,145,48,0.2),transparent_32%)]" />

      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <div className="max-w-2xl">
          <div aria-live="polite" className="min-h-[375px] sm:min-h-[345px]">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-amber-100/10 px-4 py-2 text-sm font-semibold text-amber-100 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              {slide.badge}
            </p>
            <h1 className="max-w-xl text-4xl font-bold leading-[1.24] tracking-tight text-[#fff8ec] transition-opacity duration-500 motion-reduce:transition-none sm:text-5xl lg:text-6xl">
              {slide.heading}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-amber-50/85 sm:text-lg">
              {slide.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={slide.primaryHref} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#b44718] px-6 text-base font-bold text-white shadow-[0_8px_24px_rgba(104,35,11,0.35)] transition hover:-translate-y-0.5 hover:bg-[#d05a22] focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-[#392018]">
                {slide.primaryLabel}
              </Link>
              <Link href={slide.secondaryHref} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-amber-100/40 bg-white/10 px-6 text-base font-bold text-amber-50 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-[#392018]">
                {slide.secondaryLabel}
              </Link>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm font-medium text-amber-100/90"><span className="text-base">✦</span>{slide.location}</p>
          </div>

          <div className="mt-4 flex items-center gap-2" aria-label="हीरो संदेश चुनें">
            {slides.map((item, index) => <button key={item.heading} type="button" onClick={() => setActiveIndex(index)} aria-label={`${index + 1}वाँ संदेश दिखाएँ`} aria-current={index === activeIndex ? "true" : undefined} className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-amber-100 focus:ring-offset-2 focus:ring-offset-[#392018] ${index === activeIndex ? "w-7 bg-amber-200" : "w-2.5 bg-amber-100/45 hover:bg-amber-100/80"}`} />)}
          </div>
        </div>
      </div>

      <Link href="/panchang" aria-label="आज का पंचांग और पूरा कैलेंडर खोलें" className="group absolute bottom-7 right-5 z-10 flex items-center gap-3 rounded-2xl border border-amber-100/50 bg-[#8b3516]/95 p-3 text-amber-50 shadow-[0_14px_32px_rgba(27,12,7,0.35)] backdrop-blur-md transition hover:-translate-y-1 hover:bg-[#a9481e] focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-[#392018] sm:right-8 sm:p-4 lg:bottom-auto lg:right-[max(2rem,calc((100vw-80rem)/2))] lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:gap-2 lg:p-5">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-100/15 text-amber-100 sm:h-14 sm:w-14"><CalendarSymbol /></span>
        <span className="pr-1 text-sm font-bold leading-tight lg:px-1 lg:text-center">आज का<br />पंचांग</span>
      </Link>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ServiceIcon = "yantra" | "planet" | "trishul" | "home" | "kundali";

interface Service {
  category: string;
  title: string;
  services: string[];
  description: string;
  purposeLabel: string;
  purpose: string;
  icon: ServiceIcon;
  image: string;
  alt: string;
  href: string;
  cta: string;
  reveal: "up" | "left" | "right";
}

const services: Service[] = [
  {
    category: "दोष निवारण पूजा",
    title: "दोष निवारण पूजा",
    services: [
      "कालसर्प दोष पूजा",
      "मंगल दोष पूजा",
      "अंगारक दोष पूजा",
      "गुरु चांडाल दोष पूजा",
      "ग्रहण दोष पूजा",
      "पितृ दोष पूजा",
    ],
    description:
      "जन्म कुंडली में बताए गए पारंपरिक ज्योतिषीय दोषों और संबंधित धार्मिक मान्यताओं को समझने के लिए वैदिक मार्गदर्शन एवं पारंपरिक शांति अनुष्ठान।",
    purposeLabel: "उद्देश्य",
    purpose:
      "दोष संबंधी मान्यताओं को समझना और उपयुक्त पारंपरिक अनुष्ठान के लिए मार्गदर्शन प्राप्त करना।",
    icon: "yantra",
    image: "/images/services/dosha-shanti.png",
    alt: "शिवलिंग, दीपक और पूजा सामग्री के साथ दोष निवारण पूजा का दृश्य",
    href: "/puja-services",
    cta: "अधिक जानकारी",
    reveal: "up",
  },
  {
    category: "नवग्रह शांति पूजा",
    title: "नवग्रह शांति पूजा",
    services: ["नवग्रह शांति अनुष्ठान"],
    description:
      "नवग्रहों से संबंधित वैदिक पूजा, मंत्र जाप और पारंपरिक शांति अनुष्ठान।",
    purposeLabel: "उद्देश्य",
    purpose:
      "ग्रहों से संबंधित ज्योतिषीय मान्यताओं और शांति अनुष्ठान की प्रक्रिया को समझना।",
    icon: "planet",
    image: "/images/services/navgraha-shanti.png",
    alt: "दीपक और पूजा सामग्री के साथ नवग्रह शांति पूजा का वेदी दृश्य",
    href: "/puja-services/navgrah-shanti",
    cta: "अधिक जानकारी",
    reveal: "left",
  },
  {
    category: "भगवान शिव की पूजा",
    title: "भगवान शिव की पूजा",
    services: ["रुद्राभिषेक", "महामृत्युंजय मंत्र जाप"],
    description:
      "भगवान शिव की उपासना, रुद्राभिषेक विधि और महामृत्युंजय मंत्र के पारंपरिक जाप एवं अनुष्ठान।",
    purposeLabel: "उद्देश्य",
    purpose:
      "शिव आराधना, आध्यात्मिक साधना और पारंपरिक धार्मिक अनुष्ठान के माध्यम से मार्गदर्शन प्राप्त करना।",
    icon: "trishul",
    image: "/images/services/shiv-puja.png",
    alt: "फूल, जलपात्र और दीपक से सुसज्जित शिव पूजा का शांत दृश्य",
    href: "/puja-services/rudrabhishek",
    cta: "अधिक जानकारी",
    reveal: "right",
  },
  {
    category: "वास्तु शांति पूजा",
    title: "वास्तु शांति पूजा",
    services: ["वैदिक वास्तु शांति"],
    description:
      "घर, नए गृह प्रवेश या कार्यस्थल के लिए पारंपरिक वास्तु शांति अनुष्ठान एवं वैदिक मार्गदर्शन।",
    purposeLabel: "उद्देश्य",
    purpose:
      "गृह या कार्यस्थल से संबंधित वास्तु मान्यताओं के संदर्भ में पारंपरिक शांति अनुष्ठान कराना।",
    icon: "home",
    image: "/images/services/vastu-shanti.png",
    alt: "दीपक, कलश और फूलों से सजा भारतीय घर का प्रवेश द्वार",
    href: "/puja-services/vastu-shanti",
    cta: "अधिक जानकारी",
    reveal: "left",
  },
  {
    category: "कुंडली एवं ज्योतिषीय परामर्श",
    title: "कुंडली एवं ज्योतिषीय परामर्श",
    services: [
      "कुंडली विश्लेषण",
      "जन्म कुंडली अध्ययन",
      "वैदिक ज्योतिषीय परामर्श",
      "करियर, विवाह, व्यवसाय व परिवार पर परामर्श",
    ],
    description:
      "जन्म तिथि, जन्म समय और जन्म स्थान के आधार पर वैदिक ज्योतिषीय अध्ययन एवं व्यक्तिगत मार्गदर्शन।",
    purposeLabel: "परामर्श विषय",
    purpose:
      "करियर, विवाह, व्यवसाय, परिवार, दोष संबंधी विषय और जीवन के महत्वपूर्ण प्रश्न।",
    icon: "kundali",
    image: "/images/services/kundali-consultation.png",
    alt: "कुंडली, दीपक और खगोलीय उपकरणों के साथ ज्योतिषीय परामर्श का दृश्य",
    href: "/kundali-analysis",
    cta: "परामर्श बुक करें",
    reveal: "up",
  },
];

function ServiceSymbol({ name }: { name: ServiceIcon }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    "aria-hidden": true,
  };

  if (name === "yantra") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m12 4 5.7 9.8H6.3L12 4Zm0 16-5.7-9.8h11.4L12 20Z" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    );
  }

  if (name === "planet") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M4 12c0-2.8 3.6-5 8-5s8 2.2 8 5-3.6 5-8 5-8-2.2-8-5Z" />
        <path d="M12 3v2m0 14v2m9-9h-2M5 12H3" />
      </svg>
    );
  }

  if (name === "trishul") {
    return (
      <svg {...props}>
        <path d="M12 21V4" />
        <path d="M12 4c-2.7 0-4 1.9-4 4.2 2.3 0 4-1.4 4-4.2Z" />
        <path d="M12 4c2.7 0 4 1.9 4 4.2-2.3 0-4-1.4-4-4.2Z" />
        <path d="M8.2 13.4c1.1 1.1 2.3 1.6 3.8 1.6s2.7-.5 3.8-1.6" />
        <path d="M9 21h6" />
      </svg>
    );
  }

  if (name === "home") {
    return (
      <svg {...props}>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" />
        <path d="M8 12h8" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v17M3.5 12h17" />
      <path d="M6.1 6.1c3.3 2.3 8.5 2.3 11.8 0m0 11.8c-3.3-2.3-8.5-2.3-11.8 0" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function Checkmark() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path d="m3 8 3 3 7-7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
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
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const imageInnerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  const imageFirstOnDesktop = index % 2 === 1;

  useLayoutEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const imageInner = imageInnerRef.current;
    const content = contentRef.current;
    const icon = iconRef.current;
    const list = listRef.current;
    const button = buttonRef.current;

    if (!card || !image || !imageInner || !content || !icon || !list || !button) {
      return;
    }

    const ctx = gsap.context(() => {
      const revealY = service.reveal === "up" ? 55 : 0;
      const revealX =
        service.reveal === "left"
          ? -70
          : service.reveal === "right"
            ? 70
            : 0;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: revealY,
          x: revealX,
          scale: 0.985,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        imageInner,
        {
          scale: 1.12,
          yPercent: -2,
        },
        {
          scale: 1,
          yPercent: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        content.children,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          delay: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        list.children,
        {
          opacity: 0,
          x: -10,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 78%",
            once: true,
          },
        },
      );

      const enter = () => {
        gsap.to(card, {
          y: -6,
          duration: 0.35,
          ease: "power2.out",
        });

        gsap.to(imageInner, {
          scale: 1.055,
          duration: 0.7,
          ease: "power2.out",
        });

        gsap.to(icon, {
          rotate: 6,
          scale: 1.06,
          duration: 0.35,
          ease: "power2.out",
        });

        gsap.to(button, {
          x: 3,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const leave = () => {
        gsap.to(card, {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });

        gsap.to(imageInner, {
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
        });

        gsap.to(icon, {
          rotate: 0,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
        });

        gsap.to(button, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);

      return () => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      };
    }, card);

    return () => ctx.revert();
  }, [service.reveal]);

  return (
    <article
      ref={cardRef}
      className="service-card group relative grid overflow-hidden rounded-[2rem] border border-[#e3cfaa] bg-[#fffdf9] shadow-[0_16px_45px_rgba(74,37,12,0.07)] transition-shadow duration-500 hover:shadow-[0_28px_70px_rgba(74,37,12,0.14)] lg:grid-cols-2"
    >
      {/* Content */}
      <div
        ref={contentRef}
        className={`relative z-10 flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-14 ${
          imageFirstOnDesktop ? "lg:order-2" : "lg:order-1"
        }`}
      >
        {/* Category */}
        <div className="flex items-center gap-3">
          <span
            ref={iconRef}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#e5c77f] bg-[#fff6df] text-[#8b4518] shadow-sm transition-colors duration-300 group-hover:bg-[#fdf0cb]"
          >
            <ServiceSymbol name={service.icon} />
          </span>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a45b22]">
              {String(index + 1).padStart(2, "0")}
            </p>

            <p className="mt-0.5 text-sm font-bold text-[#a35420]">
              {service.category}
            </p>
          </div>
        </div>

        {/* Heading */}
        <h3 className="mt-6 max-w-xl text-[1.8rem] font-semibold leading-[1.2] tracking-[-0.025em] text-[#51230f] sm:text-3xl lg:text-[2.15rem]">
          {service.title}
        </h3>

        {/* Services */}
        <ul
          ref={listRef}
          className="mt-6 grid gap-x-6 gap-y-2.5 text-sm leading-6 text-[#70401f] sm:grid-cols-2"
        >
          {service.services.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 text-[#b86d20]">
                <Checkmark />
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-[0.96rem] leading-7 text-[#71421f]">
          {service.description}
        </p>

        {/* Purpose */}
        <div className="mt-6 rounded-r-xl border-l-2 border-[#c69a42] bg-[#fff9ec] px-4 py-3.5">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8b4518]">
            {service.purposeLabel}
          </p>

          <p className="mt-1.5 text-sm leading-6 text-[#76502f]">
            {service.purpose}
          </p>
        </div>

        {/* CTA */}
        <Link
          ref={buttonRef}
          href={service.href}
          className="mt-7 inline-flex min-h-11 w-fit items-center gap-3 rounded-xl bg-[#8b3516] px-5 py-3 text-sm font-bold text-[#fffaf1] shadow-[0_9px_22px_rgba(110,45,16,0.18)] transition-colors duration-300 hover:bg-[#a9481e] focus:outline-none focus:ring-2 focus:ring-[#b56a28] focus:ring-offset-2"
        >
          <span>{service.cta}</span>

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>
      </div>

      {/* Image */}
      <div
        ref={imageRef}
        className={`relative min-h-[290px] overflow-hidden bg-[#4b2413] sm:min-h-[380px] lg:min-h-full ${
          imageFirstOnDesktop ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div ref={imageInnerRef} className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3f1d0c]/55 via-[#3f1d0c]/5 to-transparent" />

        {/* Image number */}
        <div className="absolute right-5 top-5 rounded-full border border-white/25 bg-black/15 px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-white/90 backdrop-blur-md">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(services.length).padStart(2, "0")}
        </div>

        {/* Bottom image label */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="h-px w-12 bg-[#d9b56a]" />
          <p className="mt-2 text-xs font-medium tracking-wide text-white/85">
            वैदिक परंपरा • उज्जैन
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;

    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading.children,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className="relative overflow-hidden bg-[#fcf5e8] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    >
      {/* Very subtle background detail */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#d9a34a]/[0.045] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div
          ref={headingRef}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#a85e25]">
            वैदिक परंपरा के साथ
          </p>

          <h2
            id="services-title"
            className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#51230f] sm:text-4xl lg:text-[3.5rem] lg:leading-[1.08]"
          >
            आपकी आवश्यकता के अनुसार
            <br className="hidden sm:block" />
            <span className="text-[#8b3516]"> वैदिक सेवाएँ</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-[#75441f] sm:text-base sm:leading-8">
            आस्था, परंपरा और वैदिक ज्ञान के साथ जीवन के महत्वपूर्ण चरणों के
            लिए पारंपरिक पूजा एवं ज्योतिषीय मार्गदर्शन।
          </p>

          {/* Decorative divider */}
          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#c69a42]/50" />
            <span className="text-xs text-[#c69a42]">✦</span>
            <span className="h-px w-10 bg-[#c69a42]/50" />
          </div>
        </div>

        {/* Services */}
        <div className="mt-14 grid gap-7 sm:mt-20 lg:gap-10">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
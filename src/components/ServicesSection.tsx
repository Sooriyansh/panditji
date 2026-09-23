"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
    services: ["कालसर्प दोष पूजा", "मंगल दोष पूजा", "अंगारक दोष पूजा", "गुरु चांडाल दोष पूजा", "ग्रहण दोष पूजा", "पितृ दोष पूजा"],
    description: "जन्म कुंडली में बताए गए पारंपरिक ज्योतिषीय दोषों और संबंधित धार्मिक मान्यताओं को समझने के लिए वैदिक मार्गदर्शन एवं पारंपरिक शांति अनुष्ठान।",
    purposeLabel: "उद्देश्य",
    purpose: "दोष संबंधी मान्यताओं को समझना और उपयुक्त पारंपरिक अनुष्ठान के लिए मार्गदर्शन प्राप्त करना।",
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
    description: "नवग्रहों से संबंधित वैदिक पूजा, मंत्र जाप और पारंपरिक शांति अनुष्ठान।",
    purposeLabel: "उद्देश्य",
    purpose: "ग्रहों से संबंधित ज्योतिषीय मान्यताओं और शांति अनुष्ठान की प्रक्रिया को समझना।",
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
    description: "भगवान शिव की उपासना, रुद्राभिषेक विधि और महामृत्युंजय मंत्र के पारंपरिक जाप एवं अनुष्ठान।",
    purposeLabel: "उद्देश्य",
    purpose: "शिव आराधना, आध्यात्मिक साधना और पारंपरिक धार्मिक अनुष्ठान के माध्यम से मार्गदर्शन प्राप्त करना।",
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
    description: "घर, नए गृह प्रवेश या कार्यस्थल के लिए पारंपरिक वास्तु शांति अनुष्ठान एवं वैदिक मार्गदर्शन।",
    purposeLabel: "उद्देश्य",
    purpose: "गृह या कार्यस्थल से संबंधित वास्तु मान्यताओं के संदर्भ में पारंपरिक शांति अनुष्ठान कराना।",
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
    services: ["कुंडली विश्लेषण", "जन्म कुंडली अध्ययन", "वैदिक ज्योतिषीय परामर्श", "करियर, विवाह, व्यवसाय व परिवार पर परामर्श"],
    description: "जन्म तिथि, जन्म समय और जन्म स्थान के आधार पर वैदिक ज्योतिषीय अध्ययन एवं व्यक्तिगत मार्गदर्शन।",
    purposeLabel: "परामर्श विषय",
    purpose: "करियर, विवाह, व्यवसाय, परिवार, दोष संबंधी विषय और जीवन के महत्वपूर्ण प्रश्न।",
    icon: "kundali",
    image: "/images/services/kundali-consultation.png",
    alt: "कुंडली, दीपक और खगोलीय उपकरणों के साथ ज्योतिषीय परामर्श का दृश्य",
    href: "/kundali-analysis",
    cta: "परामर्श बुक करें",
    reveal: "up",
  },
];

function ServiceSymbol({ name }: { name: ServiceIcon }) {
  const props = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, "aria-hidden": true };
  if (name === "yantra") return <svg {...props}><circle cx="12" cy="12" r="8.5" /><path d="m12 4 5.7 9.8H6.3L12 4Zm0 16-5.7-9.8h11.4L12 20Z" /><circle cx="12" cy="12" r="1.5" /></svg>;
  if (name === "planet") return <svg {...props}><circle cx="12" cy="12" r="3.5" /><path d="M4 12c0-2.8 3.6-5 8-5s8 2.2 8 5-3.6 5-8 5-8-2.2-8-5Z" /><path d="M12 3v2m0 14v2m9-9h-2M5 12H3" /></svg>;
  if (name === "trishul") return <svg {...props}><path d="M12 21V4m0 0c-2.7 0-4 1.9-4 4.2 2.3 0 4-1.4 4-4.2Zm0 0c2.7 0 4 1.9 4 4.2-2.3 0-4-1.4-4-4.2ZM8.2 13.4c1.1 1.1 2.3 1.6 3.8 1.6s2.7-.5 3.8-1.6M9 21h6" /></svg>;
  if (name === "home") return <svg {...props}><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" /><path d="M8 12h8" /></svg>;
  return <svg {...props}><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5v17M3.5 12h17M6.1 6.1c3.3 2.3 8.5 2.3 11.8 0m0 11.8c-3.3-2.3-8.5-2.3-11.8 0" /><circle cx="12" cy="12" r="2" /></svg>;
}

function Checkmark() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0"><path d="m3 8 3 3 7-7" /></svg>;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !window.IntersectionObserver) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const hiddenTransform = service.reveal === "left" ? "-translate-x-8" : service.reveal === "right" ? "translate-x-8" : "translate-y-8";
  const imageFirstOnDesktop = index % 2 === 1;

  return (
    <article
      ref={cardRef}
      className={`grid overflow-hidden rounded-[1.75rem] border border-[#dfc99e] bg-[#fffdf9] shadow-[0_18px_45px_rgba(80,42,12,0.10)] transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 lg:grid-cols-2 ${revealed ? "translate-x-0 translate-y-0 scale-100 opacity-100" : `${hiddenTransform} scale-[0.985] opacity-0`}`}
      style={{ transitionDelay: `${Math.min(index * 80, 240)}ms` }}
    >
      <div className={`flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12 ${imageFirstOnDesktop ? "lg:order-2" : "lg:order-1"}`}>
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#e7c77b] bg-[#fff4d8] text-[#8b4518]"><ServiceSymbol name={service.icon} /></span>
          <p className="text-sm font-bold tracking-wide text-[#a35420]">{service.category}</p>
        </div>
        <h3 className="mt-5 text-2xl font-bold leading-tight text-[#51230f] sm:text-3xl">{service.title}</h3>
        <ul className="mt-5 grid gap-2 text-sm leading-6 text-[#70401f] sm:grid-cols-2">
          {service.services.map((item) => <li key={item} className="flex gap-2"><span className="text-[#b86d20]"><Checkmark /></span>{item}</li>)}
        </ul>
        <p className="mt-5 text-[0.97rem] leading-7 text-[#71421f]">{service.description}</p>
        <div className="mt-5 border-l-2 border-[#d89a3d] pl-4">
          <p className="text-sm font-bold text-[#643015]">{service.purposeLabel}</p>
          <p className="mt-1 text-sm leading-6 text-[#7e512d]">{service.purpose}</p>
        </div>
        <Link href={service.href} className="mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-xl bg-[#8b3516] px-5 py-2.5 text-sm font-bold text-[#fffaf1] shadow-[0_8px_18px_rgba(110,45,16,0.2)] transition hover:-translate-y-0.5 hover:bg-[#a9481e] focus:outline-none focus:ring-2 focus:ring-[#b56a28] focus:ring-offset-2">
          {service.cta}<span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className={`relative min-h-[280px] sm:min-h-[350px] lg:min-h-full ${imageFirstOnDesktop ? "lg:order-1" : "lg:order-2"}`}>
        <Image src={service.image} alt={service.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3f1d0c]/30 via-transparent to-transparent" />
      </div>
    </article>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="overflow-hidden bg-[#fcf5e8] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-[0.16em] text-[#a85e25]">वैदिक परंपरा के साथ</p>
          <h2 id="services-title" className="mt-3 text-3xl font-bold tracking-tight text-[#51230f] sm:text-4xl lg:text-5xl">हमारी प्रमुख सेवाएँ</h2>
          <p className="mt-5 text-base leading-8 text-[#75441f] sm:text-lg">आस्था, परंपरा और वैदिक ज्ञान के साथ आपके जीवन के महत्वपूर्ण चरणों के लिए पारंपरिक पूजा एवं ज्योतिषीय मार्गदर्शन।</p>
        </div>
        <div className="mt-12 grid gap-7 sm:mt-16 lg:gap-10">
          {services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} />)}
        </div>
      </div>
    </section>
  );
}

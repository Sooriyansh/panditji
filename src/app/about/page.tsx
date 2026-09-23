import Image from "next/image";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({ title: "पंडित सुमित शर्मा जी के बारे में | उज्जैन", description: "पंडित सुमित शर्मा जी द्वारा उज्जैन से उपलब्ध वैदिक पूजा, अनुष्ठान और पारंपरिक ज्योतिषीय मार्गदर्शन के बारे में जानें।", path: "/about", image: "/pandit-img.jpeg" });

const services = [
  "कालसर्प दोष पूजा", "मंगल दोष पूजा", "नवग्रह शांति पूजा", "महामृत्युंजय मंत्र जाप",
  "रुद्राभिषेक", "पितृ दोष पूजा", "अंगारक दोष पूजा", "गुरु चांडाल दोष पूजा",
  "ग्रहण दोष पूजा", "वैदिक वास्तु शांति", "कुंडली विश्लेषण", "ऑनलाइन पूजा बुकिंग",
];

function LotusMark() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden="true"><path d="M12 20c-4.8 0-8-2.7-9-6 2.2.2 4 .7 5.3 1.6C7.5 12.2 8.4 8.3 12 4c3.6 4.3 4.5 8.2 3.7 11.6 1.3-.9 3.1-1.4 5.3-1.6-1 3.3-4.2 6-9 6Z" /><path d="M12 7v13M7 18.5c2.1-.3 3.7-1.1 5-2.5 1.3 1.4 2.9 2.2 5 2.5" /></svg>;
}

function Check() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>;
}

export default function AboutPage() {
  return (
    <div className="bg-[#fcf5e8] pb-20">
      <section className="border-b border-[#ead7af] bg-[#fffaf2] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold tracking-[0.16em] text-[#a85e25]">महाकाल की नगरी उज्जैन से</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#51230f] sm:text-5xl">पंडित सुमित शर्मा जी</h1>
          <p className="mt-4 text-lg font-semibold text-[#8b4518]">वैदिक ज्योतिष <span className="px-1.5 text-[#ca8a38]">•</span> पूजा अनुष्ठान <span className="px-1.5 text-[#ca8a38]">•</span> दोष निवारण</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 pt-12 sm:px-8 sm:pt-16 lg:px-12">
        <section className="grid overflow-hidden rounded-[1.75rem] border border-[#dfc99e] bg-[#fffdf9] shadow-[0_18px_45px_rgba(80,42,12,0.10)] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative min-h-[420px] sm:min-h-[540px] lg:min-h-[660px]">
            <Image src="/pandit-img.jpeg" alt="पूज्य गुरुजी बंशीधर शास्त्री जी का चित्र" fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#3e1b0b]/45 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-2"><p className="inline-flex items-center gap-2 rounded-full bg-[#fffaf2]/90 px-4 py-2 text-sm font-bold text-[#653016] shadow-sm backdrop-blur"><LotusMark />पूज्य गुरुजी बंशीधर शास्त्री जी</p><p className="rounded-full bg-[#fffaf2]/90 px-4 py-2 text-sm font-semibold text-[#653016] shadow-sm backdrop-blur">उज्जैन, मध्य प्रदेश</p></div>
          </div>
          <div className="flex flex-col justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
            <p className="text-sm font-bold tracking-[0.14em] text-[#a85e25]">हमारे बारे में</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#51230f] sm:text-4xl">आस्था के साथ सरल और व्यक्तिगत मार्गदर्शन</h2>
            <p className="mt-6 leading-8 text-[#70401f]">महाकाल की नगरी उज्जैन से वैदिक ज्योतिष, पूजा अनुष्ठान और पारंपरिक धार्मिक मार्गदर्शन की सेवाएँ।</p>
            <p className="mt-4 leading-8 text-[#70401f]">पंडित सुमित शर्मा जी का उद्देश्य वैदिक परंपराओं और धार्मिक अनुष्ठानों को सरल, सम्मानजनक एवं व्यक्तिगत आवश्यकताओं के अनुरूप प्रस्तुत करना है। प्रत्येक पूजा और ज्योतिषीय परामर्श में व्यक्ति की परिस्थिति, उद्देश्य और आवश्यकताओं को समझने पर ध्यान दिया जाता है।</p>
            <div className="mt-7 border-l-2 border-[#d89a3d] bg-[#fff6e4] py-3 pl-4 pr-3"><p className="font-bold leading-7 text-[#643015]">परंपरा के साथ मार्गदर्शन, आस्था के साथ सम्मान।</p></div>
          </div>
        </section>

        <section className="pt-16 sm:pt-24" aria-labelledby="services-title">
          <div className="max-w-2xl"><p className="text-sm font-bold tracking-[0.14em] text-[#a85e25]">वैदिक सेवाएँ</p><h2 id="services-title" className="mt-3 text-3xl font-bold text-[#51230f] sm:text-4xl">हमारी सेवाएँ</h2><p className="mt-4 leading-8 text-[#70401f]">पूजा, अनुष्ठान और ज्योतिषीय मार्गदर्शन की उपलब्ध सेवाएँ।</p></div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => <li key={service} className="flex min-h-14 items-center gap-3 rounded-xl border border-[#ead7af] bg-[#fffdf9] px-4 py-3 text-sm font-semibold text-[#653719] shadow-sm"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#fff0ce] text-[#ad621d]"><Check /></span>{service}</li>)}
          </ul>
        </section>

        <section className="mt-16 grid gap-6 sm:mt-24 lg:grid-cols-2" aria-label="दृष्टिकोण और संपर्क">
          <div className="rounded-[1.5rem] border border-[#e5cca1] bg-[#fffdf9] p-7 sm:p-9"><p className="text-sm font-bold tracking-[0.14em] text-[#a85e25]">हमारा दृष्टिकोण</p><h2 className="mt-3 text-2xl font-bold text-[#51230f]">पूजा से पहले आपकी आवश्यकता को समझना</h2><p className="mt-4 leading-8 text-[#70401f]">पूजा, अनुष्ठान और ज्योतिषीय परामर्श से पहले आपकी आवश्यकता और उद्देश्य को समझना महत्वपूर्ण है। हमारा प्रयास है कि पूजा की प्रक्रिया, उपलब्ध सेवाओं और आवश्यक जानकारी को स्पष्ट एवं सरल तरीके से प्रस्तुत किया जाए।</p></div>
          <div className="rounded-[1.5rem] bg-[#6c2d13] p-7 text-[#fff8ea] shadow-[0_16px_35px_rgba(92,35,12,0.22)] sm:p-9"><p className="text-sm font-bold tracking-[0.14em] text-amber-200">उज्जैन से धार्मिक सेवाएँ</p><h2 className="mt-3 text-2xl font-bold">पूजा बुकिंग एवं परामर्श के लिए संपर्क करें</h2><p className="mt-4 leading-8 text-amber-50/90">महाकालेश्वर की पावन नगरी उज्जैन में पूजा अनुष्ठान एवं वैदिक मार्गदर्शन के लिए संपर्क करें। पूजा की उपलब्धता, तिथि और प्रक्रिया की जानकारी सीधे बातचीत के माध्यम से प्राप्त करें।</p><div className="mt-7 rounded-xl border border-amber-100/20 bg-white/10 p-4"><p className="font-bold">पंडित सुमित शर्मा जी</p><a href="tel:+918871928175" className="mt-2 block w-fit font-semibold text-amber-100 underline decoration-amber-200/60 underline-offset-4">मोबाइल नंबर: 8871928175</a><p className="mt-2 text-sm text-amber-50/85">उज्जैन, मध्य प्रदेश</p></div><a href="tel:+918871928175" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#f4c76d] px-5 py-2.5 text-sm font-bold text-[#5a260e] transition hover:-translate-y-0.5 hover:bg-[#ffe0a0] focus:outline-none focus:ring-2 focus:ring-amber-100 focus:ring-offset-2 focus:ring-offset-[#6c2d13]">पूजा बुकिंग के लिए पूछें</a></div>
        </section>
        <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-7 text-[#8b5b35]">नोट: पंडित जी के अनुभव, प्रशिक्षण, प्रमाणपत्र और अन्य व्यक्तिगत विवरण उपलब्ध होने पर इस पेज में जोड़े जा सकते हैं।</p>
      </main>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function HomeAbout() {
  return (
    <section aria-labelledby="home-about-title" className="bg-[#fffaf2] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-3 rounded-[2rem] border border-[#e5c47d] bg-[#fff0cf]" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] shadow-[0_20px_45px_rgba(80,42,12,0.18)]">
            <Image src="/pandit-img.jpeg" alt="पूज्य गुरुजी बंशीधर शास्त्री जी का चित्र" fill sizes="(min-width: 1024px) 36vw, 90vw" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#3e1b0b]/45 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
              <p className="rounded-full bg-[#fffaf2]/90 px-3 py-1.5 text-sm font-bold text-[#653016] backdrop-blur">पूज्य गुरुजी बंशीधर शास्त्री जी</p>
              <p className="rounded-full bg-[#fffaf2]/90 px-3 py-1.5 text-sm font-semibold text-[#653016] backdrop-blur">उज्जैन, मध्य प्रदेश</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold tracking-[0.16em] text-[#a85e25]">हमारे बारे में</p>
          <h2 id="home-about-title" className="mt-3 text-3xl font-bold leading-tight text-[#51230f] sm:text-4xl lg:text-5xl">पंडित सुमित शर्मा जी</h2>
          <p className="mt-4 text-lg font-semibold text-[#8b4518]">वैदिक ज्योतिष <span className="px-1.5 text-[#ca8a38]">•</span> पूजा अनुष्ठान <span className="px-1.5 text-[#ca8a38]">•</span> दोष निवारण</p>
          <p className="mt-6 max-w-2xl leading-8 text-[#70401f]">महाकाल की नगरी उज्जैन से वैदिक ज्योतिष, पूजा अनुष्ठान और पारंपरिक धार्मिक मार्गदर्शन की सेवाएँ। प्रत्येक पूजा और ज्योतिषीय परामर्श में व्यक्ति की परिस्थिति, उद्देश्य और आवश्यकताओं को समझने पर ध्यान दिया जाता है।</p>
          <div className="mt-6 max-w-2xl border-l-2 border-[#d89a3d] bg-[#fff6e4] py-3 pl-4 pr-3"><p className="font-bold leading-7 text-[#643015]">परंपरा के साथ मार्गदर्शन, आस्था के साथ सम्मान।</p></div>
          <Link href="/about" className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-[#8b3516] px-6 py-3 text-sm font-bold text-[#fffaf1] shadow-[0_8px_18px_rgba(110,45,16,0.2)] transition hover:-translate-y-0.5 hover:bg-[#a9481e] focus:outline-none focus:ring-2 focus:ring-[#b56a28] focus:ring-offset-2">पंडित जी के बारे में जानें <span aria-hidden="true" className="ml-2">→</span></Link>
        </div>
      </div>
    </section>
  );
}

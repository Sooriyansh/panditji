import Image from "next/image";
import PujaBookingForm from "@/components/booking/PujaBookingForm";
import { getPujaService } from "@/data/puja-services";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "ऑनलाइन पूजा बुकिंग | उज्जैन",
  description: "उज्जैन में पूजा एवं अनुष्ठान के लिए ऑनलाइन बुकिंग अनुरोध भेजें। सेवा, पसंदीदा तिथि और आवश्यकताओं की जानकारी साझा करें।",
  path: "/online-puja",
  image: "/tmple.jpg",
});

type PageProps = { searchParams: Promise<{ puja?: string }> };

export default async function OnlinePujaPage({ searchParams }: PageProps) {
  const { puja } = await searchParams;
  const initialPujaService = getPujaService(puja)?.id ?? "";

  return (
    <div className="relative isolate overflow-hidden bg-[#fff9f0] pb-16 pt-10 sm:pt-16 lg:pb-24 lg:pt-20">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[410px] bg-[radial-gradient(ellipse_at_top,rgba(222,168,81,0.28),transparent_68%)]" />
      <div aria-hidden="true" className="absolute right-[-6rem] top-24 -z-10 h-72 w-72 rounded-full border-[28px] border-[#efd7ad]/45" />
      <header className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#e8c993] bg-[#fffdf8] px-4 py-2 text-sm font-bold text-[#8b3c18] shadow-sm"><span aria-hidden="true">ॐ</span> उज्जैन से वैदिक सेवाएँ</p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#4d230e] sm:text-5xl">पूजा बुकिंग</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#6d482c] sm:text-lg">अपनी आवश्यकता के अनुसार पूजा का चयन करें और बुकिंग अनुरोध भेजें।</p>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-[#826245]">उज्जैन से पारंपरिक पूजा एवं वैदिक अनुष्ठान के लिए अपनी जानकारी साझा करें।</p>
      </header>
      <main className="mx-auto mt-10 grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:px-8">
        <aside className="order-2 overflow-hidden rounded-3xl border border-[#ead6b9] bg-[#4c2513] shadow-[0_18px_60px_rgba(94,52,18,0.16)] lg:order-1 lg:sticky lg:top-28">
          <div className="relative h-64"><Image src="/tmple.jpg" alt="उज्जैन का मंदिर" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover opacity-75" priority /><div className="absolute inset-0 bg-gradient-to-t from-[#4c2513] via-transparent to-transparent" /></div>
          <div className="-mt-14 relative p-6 text-[#fff8e9] sm:p-8"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#d79b42] text-xl text-[#54200a] shadow-lg" aria-hidden="true">ॐ</span><h2 className="mt-5 text-2xl font-bold">श्रद्धा के साथ अपना अनुरोध भेजें</h2><p className="mt-3 leading-7 text-amber-50/85">पंडित सुमित शर्मा जी की टीम आपकी आवश्यकता और पसंदीदा तिथि की समीक्षा कर उपलब्धता के संबंध में संपर्क करेगी।</p><ul className="mt-6 grid gap-3 border-t border-amber-100/20 pt-6 text-sm text-amber-50/90"><li className="flex gap-3"><span aria-hidden="true">✦</span> पारंपरिक विधि-विधान के लिए अनुरोध</li><li className="flex gap-3"><span aria-hidden="true">✦</span> तिथि और समय की पुष्टि संपर्क के बाद</li><li className="flex gap-3"><span aria-hidden="true">✦</span> केवल आवश्यक जानकारी साझा करें</li></ul></div>
        </aside>
        <div className="order-1 lg:order-2"><PujaBookingForm initialPujaService={initialPujaService} /></div>
      </main>
    </div>
  );
}

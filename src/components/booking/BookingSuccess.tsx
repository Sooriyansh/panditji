"use client";

type BookingSuccessProps = {
  whatsappUrl?: string;
  onNewBooking: () => void;
};

export default function BookingSuccess({ whatsappUrl, onNewBooking }: BookingSuccessProps) {
  return (
    <section aria-live="polite" className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 text-center shadow-sm sm:p-10">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-600 text-2xl text-white" aria-hidden="true">✓</div>
      <h2 className="mt-5 text-2xl font-bold text-[#44200e]">बुकिंग अनुरोध प्राप्त हो गया है</h2>
      <p className="mx-auto mt-3 max-w-lg leading-7 text-[#67513d]">तिथि और उपलब्धता की पुष्टि के लिए आपसे संपर्क किया जाएगा। यह अभी पुष्टि की गई बुकिंग नहीं है।</p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1d8b4f] px-5 font-bold text-white transition hover:bg-[#167441] focus:outline-none focus:ring-2 focus:ring-[#1d8b4f] focus:ring-offset-2">WhatsApp पर संपर्क करें</a>}
        <button type="button" onClick={onNewBooking} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#cba979] bg-white px-5 font-bold text-[#683216] transition hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-[#9b491d] focus:ring-offset-2">नया अनुरोध भेजें</button>
      </div>
    </section>
  );
}

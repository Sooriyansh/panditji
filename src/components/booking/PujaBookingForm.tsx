"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import BookingSuccess from "@/components/booking/BookingSuccess";
import { getPujaService, pujaServices } from "@/data/puja-services";

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  pujaService: string;
  preferredDate: string;
  preferredTime: string;
  locationType: string;
  otherLocation: string;
  purpose: string;
  additionalInfo: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
};

type FieldName = keyof FormValues;
type Errors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = {
  fullName: "", phone: "", email: "", city: "", pujaService: "", preferredDate: "", preferredTime: "", locationType: "", otherLocation: "", purpose: "", additionalInfo: "", birthDate: "", birthTime: "", birthPlace: "",
};

const inputClass = "mt-2 block min-h-12 w-full rounded-xl border bg-white px-4 text-[15px] text-[#3f210f] outline-none transition placeholder:text-[#9a806c] focus:border-[#a74e1f] focus:ring-4 focus:ring-[#f3d8b1]";

function today() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

function FieldError({ id, error }: { id: string; error?: string }) {
  return error ? <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-red-700">{error}</p> : null;
}

export default function PujaBookingForm({ initialPujaService = "" }: { initialPujaService?: string }) {
  const { data: session } = useSession();
  const [values, setValues] = useState<FormValues>({ ...initialValues, pujaService: getPujaService(initialPujaService)?.id ?? "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "serverUnavailable">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [loginRequired, setLoginRequired] = useState(false);
  const selectedService = useMemo(() => getPujaService(values.pujaService), [values.pujaService]);
  const needsOtherLocation = values.locationType === "other";

  useEffect(() => {
    let timer: number | undefined;
    try {
      const saved = sessionStorage.getItem("panditji-booking-draft");
      if (saved) {
        const draft = JSON.parse(saved) as Partial<FormValues>;
        timer = window.setTimeout(() => setValues((current) => ({ ...current, ...draft })), 0);
      }
    } catch { /* An unavailable or invalid browser draft can be ignored. */ }
    return () => { if (timer !== undefined) window.clearTimeout(timer); };
  }, []);

  const update = (field: FieldName, value: string) => {
    setValues((current) => {
      const next = { ...current, [field]: value };
      try { sessionStorage.setItem("panditji-booking-draft", JSON.stringify(next)); } catch { /* Storage can be unavailable in private contexts. */ }
      return next;
    });
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === "serverUnavailable") { setStatus("idle"); setFormMessage(""); }
  };

  const validate = () => {
    const next: Errors = {};
    if (!values.fullName.trim()) next.fullName = "कृपया अपना नाम दर्ज करें।";
    if (!/^[6-9]\d{9}$/.test(values.phone.replace(/[\s-]/g, ""))) next.phone = "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "कृपया सही ईमेल पता दर्ज करें।";
    if (!values.city.trim()) next.city = "कृपया अपना शहर या स्थान दर्ज करें।";
    if (!getPujaService(values.pujaService)) next.pujaService = "कृपया पूजा का चयन करें।";
    if (!values.preferredDate) next.preferredDate = "कृपया पूजा की तिथि चुनें।";
    else if (values.preferredDate < today()) next.preferredDate = "कृपया आज या भविष्य की तिथि चुनें।";
    if (!values.preferredTime) next.preferredTime = "कृपया पसंदीदा समय चुनें।";
    if (!values.locationType) next.locationType = "कृपया पूजा का स्थान चुनें।";
    if (needsOtherLocation && !values.otherLocation.trim()) next.otherLocation = "कृपया पूजा का स्थान दर्ज करें।";
    if (values.purpose.trim().length < 10) next.purpose = "कृपया अपनी आवश्यकता के बारे में थोड़ा विस्तार से लिखें।";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !validate()) return;
    if (!session?.user) {
      try { sessionStorage.setItem("panditji-booking-draft", JSON.stringify(values)); } catch { /* Storage can be unavailable in private contexts. */ }
      setLoginRequired(true);
      return;
    }
    setStatus("submitting");
    setFormMessage("");
    try {
      const response = await fetch("/api/puja-bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result: { success?: boolean; message?: string } = await response.json();
      if (!response.ok || !result.success) {
        setStatus("serverUnavailable");
        setFormMessage(result.message ?? "अनुरोध अभी भेजा नहीं जा सका। कृपया बाद में पुनः प्रयास करें। ");
        return;
      }
      setStatus("success");
      try { sessionStorage.removeItem("panditji-booking-draft"); } catch { /* Storage can be unavailable in private contexts. */ }
    } catch {
      setStatus("serverUnavailable");
      setFormMessage("अनुरोध अभी भेजा नहीं जा सका। कृपया अपना इंटरनेट कनेक्शन जाँचकर पुनः प्रयास करें।");
    }
  }

  if (status === "success") return <BookingSuccess onNewBooking={() => { setValues({ ...initialValues }); setStatus("idle"); }} />;

  return (
    <><form noValidate onSubmit={handleSubmit} className="rounded-3xl border border-[#ead6b9] bg-[#fffdf9] p-5 shadow-[0_18px_60px_rgba(94,52,18,0.12)] sm:p-8" aria-describedby="privacy-note">
      <SectionTitle number="१" title="व्यक्तिगत जानकारी" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="पूरा नाम" name="fullName" required value={values.fullName} onChange={update} error={errors.fullName} placeholder="अपना पूरा नाम दर्ज करें" />
        <Field label="मोबाइल नंबर" name="phone" required type="tel" inputMode="numeric" value={values.phone} onChange={update} error={errors.phone} placeholder="10 अंकों का मोबाइल नंबर" />
        <Field label="ईमेल पता" name="email" type="email" value={values.email} onChange={update} error={errors.email} placeholder="अपना ईमेल दर्ज करें" optional />
        <Field label="शहर / स्थान" name="city" required value={values.city} onChange={update} error={errors.city} placeholder="अपना शहर दर्ज करें" />
      </div>

      <div className="my-8 border-t border-[#eadfcf]" />
      <SectionTitle number="२" title="पूजा का चयन" />
      <div>
        <label htmlFor="pujaService" className="text-sm font-bold text-[#542710]">पूजा का चयन करें <span aria-hidden="true" className="text-[#af3d20]">*</span></label>
        <select id="pujaService" name="pujaService" value={values.pujaService} onChange={(e) => update("pujaService", e.target.value)} aria-describedby={errors.pujaService ? "pujaService-error" : undefined} aria-invalid={Boolean(errors.pujaService)} className={`${inputClass} ${errors.pujaService ? "border-red-500" : "border-[#d8b98b]"}`}>
          <option value="">पूजा चुनें</option>
          {pujaServices.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}
        </select>
        <FieldError id="pujaService-error" error={errors.pujaService} />
      </div>

      <div className="my-8 border-t border-[#eadfcf]" />
      <SectionTitle number="३" title="बुकिंग विवरण" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="पूजा की पसंदीदा तिथि" name="preferredDate" required type="date" min={today()} value={values.preferredDate} onChange={update} error={errors.preferredDate} />
        <SelectField label="पसंदीदा समय" name="preferredTime" required value={values.preferredTime} onChange={update} error={errors.preferredTime} options={[["morning", "सुबह"], ["afternoon", "दोपहर"], ["evening", "शाम"], ["discuss", "समय पंडित जी से तय करें"]]} />
        <div className={needsOtherLocation ? "sm:col-span-2" : "sm:col-span-2"}><SelectField label="पूजा का स्थान" name="locationType" required value={values.locationType} onChange={update} error={errors.locationType} options={[["ujjain", "उज्जैन में पूजा"], ["online", "ऑनलाइन मार्गदर्शन"], ["other", "अन्य स्थान"], ["discuss", "पंडित जी से चर्चा करें"]]} /></div>
        {needsOtherLocation && <div className="sm:col-span-2"><Field label="पूजा का विस्तृत स्थान" name="otherLocation" required value={values.otherLocation} onChange={update} error={errors.otherLocation} placeholder="शहर और क्षेत्र दर्ज करें" /></div>}
      </div>
      <p className="mt-3 text-sm leading-6 text-[#80654d]">आपका चुना हुआ समय केवल प्राथमिकता है; उपलब्धता की पुष्टि संपर्क के बाद की जाएगी।</p>

      <div className="my-8 border-t border-[#eadfcf]" />
      <SectionTitle number="४" title="अतिरिक्त जानकारी" />
      <div className="grid gap-5">
        <TextArea label="पूजा का उद्देश्य / आपकी आवश्यकता" name="purpose" required value={values.purpose} onChange={update} error={errors.purpose} placeholder="अपनी आवश्यकता या पूजा के उद्देश्य के बारे में लिखें..." />
        <TextArea label="अतिरिक्त जानकारी" name="additionalInfo" value={values.additionalInfo} onChange={update} error={errors.additionalInfo} optional placeholder="यदि कोई अन्य जानकारी साझा करना चाहते हैं..." />
      </div>
      {selectedService?.isAstrologyService && <fieldset className="mt-6 rounded-2xl border border-[#ead6b9] bg-[#fffbf4] p-5"><legend className="px-2 text-sm font-bold text-[#542710]">जन्म संबंधी जानकारी (वैकल्पिक)</legend><p className="mb-4 text-sm text-[#80654d]">यह जानकारी केवल चुनी हुई ज्योतिष सेवा के लिए साझा करें।</p><div className="grid gap-5 sm:grid-cols-3"><Field label="जन्म तिथि" name="birthDate" type="date" value={values.birthDate} onChange={update} error={errors.birthDate} /><Field label="जन्म समय" name="birthTime" type="time" value={values.birthTime} onChange={update} error={errors.birthTime} /><Field label="जन्म स्थान" name="birthPlace" value={values.birthPlace} onChange={update} error={errors.birthPlace} placeholder="जन्म स्थान" /></div></fieldset>}

      {status === "serverUnavailable" && <div role="alert" className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-[#70401f]">{formMessage}</div>}
      <p id="privacy-note" className="mt-7 text-sm leading-6 text-[#80654d]">आपकी दी गई जानकारी का उपयोग पूजा बुकिंग अनुरोध और संपर्क के लिए किया जाएगा।</p>
      <button type="submit" disabled={status === "submitting"} className="mt-5 inline-flex min-h-13 w-full items-center justify-center rounded-xl bg-[#963a16] px-6 py-3 font-bold text-white shadow-[0_10px_22px_rgba(120,46,15,0.2)] transition hover:bg-[#7b2d10] disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#963a16] focus:ring-offset-2">{status === "submitting" ? "अनुरोध भेजा जा रहा है…" : "बुकिंग अनुरोध भेजें"}</button>
    </form>{loginRequired && <BookingAuthDialog onClose={() => setLoginRequired(false)} />}</>
  );
}

function BookingAuthDialog({ onClose }: { onClose: () => void }) {
  const callbackUrl = typeof window === "undefined" ? "/online-puja" : window.location.pathname;
  return <div role="dialog" aria-modal="true" aria-labelledby="booking-login-title" className="fixed inset-0 z-[70] grid place-items-center bg-[#2b1608]/50 p-4"><div className="w-full max-w-md rounded-3xl bg-[#fffdf9] p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between gap-4"><div><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f7e5c7] text-xl text-[#873514]">ॐ</span><h2 id="booking-login-title" className="mt-4 text-2xl font-extrabold text-[#51230f]">पहले लॉगिन करें</h2></div><button type="button" onClick={onClose} aria-label="डायलॉग बंद करें" className="rounded-xl px-3 py-2 text-xl text-[#6d371b] hover:bg-amber-50">×</button></div><p className="mt-3 text-sm leading-6 text-[#795a41]">बुकिंग पूरी करने के लिए कृपया पहले लॉगिन करें। आपका भरा हुआ फॉर्म इसी ब्राउज़र में सुरक्षित रखा गया है।</p><div className="mt-6 grid gap-3"><Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="rounded-xl bg-[#963a16] px-5 py-3 text-center font-bold text-white hover:bg-[#7b2d10]">लॉगिन करें</Link><Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="rounded-xl border border-[#d8b98b] px-5 py-3 text-center font-bold text-[#542710] hover:bg-amber-50">नया अकाउंट बनाएं</Link><button type="button" onClick={() => void signIn("google", { callbackUrl })} className="rounded-xl border border-[#d8b98b] px-5 py-3 font-bold text-[#542710] hover:bg-amber-50">G&nbsp;&nbsp;Google से जारी रखें</button></div></div></div>;
}

function SectionTitle({ number, title }: { number: string; title: string }) { return <h2 className="mb-5 flex items-center gap-3 text-lg font-bold text-[#51230f]"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#f7e5c7] text-sm text-[#8b3516]">{number}</span>{title}</h2>; }

type CommonProps = { label: string; name: FieldName; value: string; onChange: (name: FieldName, value: string) => void; error?: string; required?: boolean; optional?: boolean; placeholder?: string; type?: string; inputMode?: "numeric"; min?: string; };
function Field({ label, name, value, onChange, error, required, optional, placeholder, type = "text", inputMode, min }: CommonProps) { const id = String(name); return <div><label htmlFor={id} className="text-sm font-bold text-[#542710]">{label} {required && <span aria-hidden="true" className="text-[#af3d20]">*</span>}{optional && <span className="font-normal text-[#80654d]"> (वैकल्पिक)</span>}</label><input id={id} name={id} type={type} value={value} min={min} inputMode={inputMode} onChange={(e) => onChange(name, e.target.value)} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`${inputClass} ${error ? "border-red-500" : "border-[#d8b98b]"}`} /> <FieldError id={`${id}-error`} error={error} /></div>; }
function TextArea({ label, name, value, onChange, error, required, optional, placeholder }: CommonProps) { const id = String(name); return <div><label htmlFor={id} className="text-sm font-bold text-[#542710]">{label} {required && <span aria-hidden="true" className="text-[#af3d20]">*</span>}{optional && <span className="font-normal text-[#80654d]"> (वैकल्पिक)</span>}</label><textarea id={id} name={id} value={value} onChange={(e) => onChange(name, e.target.value)} placeholder={placeholder} rows={4} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`${inputClass} min-h-28 resize-y py-3 ${error ? "border-red-500" : "border-[#d8b98b]"}`} /> <FieldError id={`${id}-error`} error={error} /></div>; }
function SelectField({ label, name, value, onChange, error, required, options }: CommonProps & { options: [string, string][] }) { const id = String(name); return <div><label htmlFor={id} className="text-sm font-bold text-[#542710]">{label} {required && <span aria-hidden="true" className="text-[#af3d20]">*</span>}</label><select id={id} name={id} value={value} onChange={(e) => onChange(name, e.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className={`${inputClass} ${error ? "border-red-500" : "border-[#d8b98b]"}`}><option value="">चुनें</option>{options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select><FieldError id={`${id}-error`} error={error} /></div>; }

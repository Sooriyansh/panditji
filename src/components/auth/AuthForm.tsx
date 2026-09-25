"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

type Mode = "login" | "signup";

export default function AuthForm({ mode, adminOnly = false, googleEnabled = false }: { mode: Mode; adminOnly?: boolean; googleEnabled?: boolean }) {
  const router = useRouter(); const searchParams = useSearchParams();
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); const [loading, setLoading] = useState(false); const [message, setMessage] = useState("");
  const callback = searchParams.get("callbackUrl");
  const callbackUrl = callback?.startsWith("/") && !callback.startsWith("//") ? callback : adminOnly ? "/admin" : "/";
  const isSignup = mode === "signup";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage("");
    const cleanEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) { setMessage("कृपया सही ईमेल पता दर्ज करें।"); return; }
    if (isSignup) {
      if (!name.trim()) { setMessage("कृपया अपना पूरा नाम दर्ज करें।"); return; }
      if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) { setMessage("पासवर्ड कम-से-कम 8 अक्षर का हो और उसमें अक्षर व अंक हों।"); return; }
      if (password !== confirmPassword) { setMessage("दोनों पासवर्ड एक जैसे नहीं हैं।"); return; }
    }
    setLoading(true);
    try {
      if (isSignup) {
        const response = await fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email: cleanEmail, password }) });
        const data = await response.json() as { message?: string };
        if (!response.ok) throw new Error(data.message || "अकाउंट नहीं बन सका।");
      }
      const result = await signIn("credentials", { email: cleanEmail, password, admin: adminOnly ? "true" : "false", redirect: false });
      if (result?.error) throw new Error(adminOnly ? "एडमिन ईमेल या पासवर्ड सही नहीं है।" : "ईमेल या पासवर्ड सही नहीं है।");
      router.replace(callbackUrl); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "कृपया फिर प्रयास करें।"); }
    finally { setLoading(false); }
  }

  return <form noValidate onSubmit={submit} className="rounded-3xl border border-[#ead6b9] bg-[#fffdf9] p-6 shadow-[0_18px_60px_rgba(94,52,18,0.12)] sm:p-8">
    {isSignup && <Field id="name" label="पूरा नाम" value={name} onChange={setName} autoComplete="name" />}
    <Field id="email" label="ईमेल पता" type="email" value={email} onChange={setEmail} autoComplete="email" />
    <div className="mt-5"><label htmlFor="password" className="text-sm font-bold text-[#542710]">पासवर्ड</label><div className="relative mt-2"><input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={isSignup ? "new-password" : "current-password"} className="min-h-12 w-full rounded-xl border border-[#d8b98b] bg-white px-4 pr-16 text-[15px] text-[#3f210f] outline-none focus:border-[#a74e1f] focus:ring-4 focus:ring-[#f3d8b1]" required /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-bold text-[#8b3516]">{showPassword ? "छिपाएं" : "दिखाएं"}</button></div>{isSignup && <p className="mt-1.5 text-xs text-[#80654d]">कम-से-कम 8 अक्षर, एक अक्षर और एक अंक रखें।</p>}</div>
    {isSignup && <Field id="confirm-password" label="पासवर्ड की पुष्टि करें" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={setConfirmPassword} autoComplete="new-password" />}
    {message && <p role="alert" className="mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">{message}</p>}
    <button disabled={loading} className="mt-6 min-h-12 w-full rounded-xl bg-[#963a16] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#7b2d10] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "कृपया प्रतीक्षा करें…" : isSignup ? "अकाउंट बनाएं" : adminOnly ? "एडमिन लॉगिन करें" : "लॉगिन करें"}</button>
    {!adminOnly && googleEnabled && <><div className="my-5 flex items-center gap-3 text-xs font-bold text-[#9b6a3a]"><span className="h-px flex-1 bg-[#eadfcf]" />या<span className="h-px flex-1 bg-[#eadfcf]" /></div><button type="button" disabled={loading} onClick={() => void signIn("google", { callbackUrl })} className="min-h-12 w-full rounded-xl border border-[#d8b98b] bg-white px-5 py-3 font-bold text-[#542710] transition hover:bg-amber-50">G&nbsp;&nbsp;Google से जारी रखें</button></>}
    {!adminOnly && <p className="mt-6 text-center text-sm text-[#795a41]">{isSignup ? "पहले से अकाउंट है?" : "नया अकाउंट बनाना है?"} <Link href={isSignup ? "/login" : "/signup"} className="font-bold text-[#8b3516]">{isSignup ? "लॉगिन करें" : "साइन अप करें"}</Link></p>}
  </form>;
}

function Field({ id, label, value, onChange, type = "text", autoComplete }: { id: string; label: string; value: string; onChange: (value: string) => void; type?: string; autoComplete: string }) { return <div className={id === "name" ? "" : "mt-5"}><label htmlFor={id} className="text-sm font-bold text-[#542710]">{label}</label><input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} required className="mt-2 min-h-12 w-full rounded-xl border border-[#d8b98b] bg-white px-4 text-[15px] text-[#3f210f] outline-none focus:border-[#a74e1f] focus:ring-4 focus:ring-[#f3d8b1]" /></div>; }

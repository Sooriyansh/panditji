import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "लॉगिन", robots: { index: false, follow: false } };
export default function LoginPage() { return <AuthPage title="अपने अकाउंट में लॉगिन करें" subtitle="बुकिंग और आपकी जानकारी सुरक्षित रूप से देखें।"><Suspense fallback={<AuthFormFallback />}><AuthForm mode="login" googleEnabled={Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)} /></Suspense></AuthPage>; }
function AuthPage({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) { return <section className="mx-auto max-w-md px-5 py-14 sm:py-20"><div className="mb-7 text-center"><span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-[#873514] text-xl text-amber-100">ॐ</span><h1 className="mt-4 text-3xl font-extrabold text-[#51230f]">{title}</h1><p className="mt-2 text-sm leading-6 text-[#795a41]">{subtitle}</p></div>{children}</section>; }
function AuthFormFallback() { return <div className="min-h-80 rounded-3xl border border-[#ead6b9] bg-[#fffdf9] p-6 shadow-[0_18px_60px_rgba(94,52,18,0.12)]" aria-busy="true" />; }

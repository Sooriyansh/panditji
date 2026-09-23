import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import { currentAdmin } from "@/lib/permissions";

export const metadata: Metadata = { title: "एडमिन लॉगिन | पंडित सुमित शर्मा जी", robots: { index: false, follow: false } };
export default async function AdminLoginPage() { if (await currentAdmin()) redirect("/admin"); return <section className="min-h-screen bg-[#fffaf2] px-5 py-14 sm:py-20"><div className="mx-auto max-w-md"><div className="mb-7 text-center"><span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-[#873514] text-xl text-amber-100">ॐ</span><h1 className="mt-4 text-3xl font-extrabold text-[#51230f]">एडमिन लॉगिन</h1><p className="mt-2 text-sm leading-6 text-[#795a41]">केवल अधिकृत व्यवस्थापक के लिए।</p></div><AuthForm mode="login" adminOnly /></div></section>; }

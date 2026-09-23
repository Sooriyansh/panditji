import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AccountBookings from "@/components/account/AccountBookings";
import { currentUser } from "@/lib/permissions";

export const metadata: Metadata = { title: "मेरा अकाउंट | पंडित सुमित शर्मा जी", robots: { index: false, follow: false } };
export default async function AccountPage() { const user = await currentUser(); if (!user) redirect("/login?callbackUrl=/account"); return <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16"><p className="text-sm font-bold text-[#a46c35]">मेरा अकाउंट</p><h1 className="mt-2 text-3xl font-extrabold text-[#51230f]">नमस्ते, {user.name || "श्रद्धालु"} जी</h1><p className="mt-2 text-sm text-[#795a41]">{user.email}</p><h2 className="mt-10 text-xl font-extrabold text-[#51230f]">मेरी बुकिंग</h2><div className="mt-4"><AccountBookings /></div></section>; }

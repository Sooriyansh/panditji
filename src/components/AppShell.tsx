"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import RatingSection from "@/components/RatingSection";
import SiteLanguageControl from "@/components/SiteLanguage";

const Chatbot = dynamic(() => import("@/components/ai/Chatbot"), { ssr: false });

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <SessionProvider><main className="min-h-screen">{children}</main></SessionProvider>;
  return <SessionProvider><SiteLanguageControl /><Navbar /><main className="min-h-screen pb-[88px] pt-0 lg:pb-0 lg:pt-24">{children}</main><RatingSection /><SiteFooter /><Chatbot /></SessionProvider>;
}

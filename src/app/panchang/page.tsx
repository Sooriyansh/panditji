import type { Metadata } from "next";
import PanchangDashboard from "@/components/panchang/PanchangDashboard";

export const metadata: Metadata = {
  title: "आज का पंचांग | तिथि, नक्षत्र, चौघड़िया और शुभ मुहूर्त | पंडित सुमित शर्मा जी",
  description: "आज का हिंदू पंचांग देखें — तिथि, वार, नक्षत्र, योग, करण, सूर्योदय, सूर्यास्त, चौघड़िया, राहु काल और शुभ मुहूर्त की जानकारी।",
  alternates: { canonical: "/panchang" },
};

export default function PanchangPage() { return <PanchangDashboard />; }

import type { Metadata } from "next";
import KundaliAnalysis from "@/components/kundali/KundaliAnalysis";

const title = "कुंडली विश्लेषण | जन्म कुंडली एवं वैदिक ज्योतिष | पंडित सुमित शर्मा जी";
const description = "जन्म तिथि, समय और स्थान के आधार पर वैदिक कुंडली विश्लेषण प्राप्त करें। करियर, नौकरी, विवाह, प्रेम संबंध और अन्य जीवन क्षेत्रों के बारे में ज्योतिषीय मार्गदर्शन जानें।";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/kundali-analysis" },
  openGraph: { title, description, type: "website", url: "/kundali-analysis", locale: "hi_IN" },
  twitter: { card: "summary", title, description },
};

export default function KundaliAnalysisPage() {
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "होम", item: "/" }, { "@type": "ListItem", position: 2, name: "कुंडली विश्लेषण", item: "/kundali-analysis" }] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><KundaliAnalysis /></>;
}

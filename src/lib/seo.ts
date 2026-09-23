import type { Metadata } from "next";
import type { PujaService } from "@/data/puja-services";

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXTAUTH_URL;
  try { return new URL(configuredUrl?.trim() || "http://localhost:8080").origin; } catch { return "http://localhost:8080"; }
}

export const siteConfig = {
  name: "Pandit Sumit Sharma Ji", hindiName: "पंडित सुमित शर्मा जी",
  description: "उज्जैन से वैदिक ज्योतिष, पूजा, अनुष्ठान और ऑनलाइन पूजा बुकिंग की जानकारी।",
  location: "Ujjain, Madhya Pradesh, India", phone: "+918871928175", phoneDisplay: "8871928175",
  email: "panditsumitsharmaji1@gmail.com", instagram: "https://www.instagram.com/astrologer_.sumit_.sharma/",
  // Set NEXT_PUBLIC_SITE_URL to the final HTTPS domain before production deployment.
  url: getSiteUrl(),
} as const;

export const siteUrl = new URL(siteConfig.url);
export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();

type PageMetadataInput = { title: string; description: string; path: string; image?: string; noIndex?: boolean };
export function generatePageMetadata({ title, description, path, image = "/ujjain-hero-ai.png", noIndex = false }: PageMetadataInput): Metadata {
  return { title, description, alternates: { canonical: path }, robots: noIndex ? { index: false, follow: false } : { index: true, follow: true }, openGraph: { type: "website", locale: "hi_IN", url: path, siteName: siteConfig.name, title, description, images: [{ url: image, width: 1200, height: 630, alt: siteConfig.hindiName }] }, twitter: { card: "summary_large_image", title, description, images: [image] } };
}

export function generateServiceMetadata(service: PujaService): Metadata {
  return generatePageMetadata({ title: `${service.title} | उज्जैन`, description: `${service.title} से जुड़ी पारंपरिक जानकारी, सामान्य प्रक्रिया, तैयारी और बुकिंग विवरण। उज्जैन में पंडित सुमित शर्मा जी से संपर्क करें।`, path: `/puja-services/${service.id}`, image: service.image });
}

export type NavigationItem = {
  label: string;
  href: string;
  icon: "home" | "sparkles" | "chart" | "calendar" | "menu" | "user" | "phone" | "clock" | "book";
};

export const pujaServices: NavigationItem[] = [
  { label: "काल सर्प दोष पूजा", href: "/puja-services/kaal-sarp-dosh", icon: "sparkles" },
  { label: "मंगल दोष पूजा", href: "/puja-services/mangal-dosh", icon: "sparkles" },
  { label: "अंगारक दोष पूजा", href: "/puja-services/angarak-dosh", icon: "sparkles" },
  { label: "गुरु चांडाल दोष पूजा", href: "/puja-services/guru-chandal-dosh", icon: "sparkles" },
  { label: "ग्रहण दोष पूजा", href: "/puja-services/grahan-dosh", icon: "sparkles" },
  { label: "नवग्रह शांति पूजा", href: "/puja-services/navgrah-shanti", icon: "sparkles" },
  { label: "महामृत्युंजय जाप", href: "/puja-services/mahamrityunjay-jaap", icon: "sparkles" },
  { label: "रुद्राभिषेक", href: "/puja-services/rudrabhishek", icon: "sparkles" },
  { label: "पितृ दोष पूजा", href: "/puja-services/pitri-dosh", icon: "sparkles" },
  { label: "वैदिक वास्तु शांति", href: "/puja-services/vastu-shanti", icon: "sparkles" },
];

export const pujaServicesOverview: NavigationItem = {
  label: "सभी पूजा सेवाएँ देखें",
  href: "/puja-services",
  icon: "sparkles",
};

export const mainNavigation: NavigationItem[] = [
  { label: "होम", href: "/", icon: "home" },
  { label: "पंडित जी के बारे में", href: "/about", icon: "user" },
  { label: "कुंडली विश्लेषण", href: "/kundali-analysis", icon: "chart" },
  { label: "ऑनलाइन पूजा बुकिंग", href: "/online-puja", icon: "calendar" },
  { label: "दोष विश्लेषक", href: "/dosh-analyzer", icon: "sparkles" },
  { label: "पूजा मुहूर्त", href: "/puja-muhurat", icon: "clock" },
  { label: "संपर्क करें", href: "/contact", icon: "phone" },
  { label: "परामर्श बुक करें", href: "/book-consultation", icon: "book" },
];

export const mobilePrimaryNavigation = [
  mainNavigation[0],
  { label: "पूजा सेवाएँ", href: "/puja-services", icon: "sparkles" as const },
  { label: "कुंडली", href: "/kundali-analysis", icon: "chart" as const },
  { label: "बुकिंग", href: "/online-puja", icon: "calendar" as const },
];

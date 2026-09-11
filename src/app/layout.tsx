import { siteImages, imageBackgrounds } from "@/content/image-registry";
import { encodeAssetPath } from "@/lib/assets";
import type { Metadata, Viewport } from "next";
import { CookieConsent } from "@/components/site/CookieConsent";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import "./globals.css";
import "./shared-site.css";

const siteUrl = "https://perfecthouse.spb.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Стеклянные ограждения и конструкции в СПб | Идеальный Дом", template: "%s | Идеальный Дом" },
  description: "Проектирование, изготовление и монтаж стеклянных ограждений, перегородок, дверей, козырьков и душевых в Санкт-Петербурге. Работаем с 2015 года.",
  keywords: ["стеклянные ограждения СПб", "стеклянные перегородки", "душевые ограждения", "ограждения лестниц из стекла", "изделия из стекла"],
  authors: [{ name: "Идеальный Дом" }], creator: "Идеальный Дом", publisher: "Идеальный Дом",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "ru_RU", url: siteUrl, siteName: "Идеальный Дом",
    title: "Стеклянные ограждения и конструкции в Санкт-Петербурге",
    description: "Проектируем, производим и монтируем изделия из стекла любой сложности.",
    images: [{ url: encodeAssetPath(siteImages.defaults.social.src), alt: siteImages.defaults.social.alt }],
  },
  twitter: { card: "summary_large_image", title: "Стеклянные конструкции | Идеальный Дом", description: "Проектирование, изготовление и монтаж изделий из стекла в СПб.", images: [encodeAssetPath(siteImages.defaults.social.src)] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  category: "construction",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#111b20" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", name: "Идеальный Дом", alternateName: "Perfect House", url: siteUrl, telephone: "+7-812-920-00-80", email: "grana@grana-as.ru", foundingDate: "2015", address: { "@type": "PostalAddress", streetAddress: "ул. Электропультовцев, д. 7, лит. В", addressLocality: "Санкт-Петербург", addressCountry: "RU" } };
  return <html lang="ru" data-scroll-behavior="smooth" style={imageBackgrounds}><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /><Header /><main>{children}</main><Footer /><CookieConsent /></body></html>;
}

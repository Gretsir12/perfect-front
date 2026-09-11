import type { Metadata } from "next";
import { siteImages, type SiteImageData } from "@/content/image-registry";
import { encodeAssetPath } from "./assets";

export function pageMetadata({ title, description, path, image = siteImages.defaults.social, keywords, publishedAt }: {
  title: string;
  description: string;
  path: string;
  image?: SiteImageData;
  keywords?: string[];
  publishedAt?: string;
}): Metadata {
  const picture = { url: encodeAssetPath(image.src), alt: image.alt };
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title, description, url: path, siteName: "Идеальный Дом", locale: "ru_RU",
      images: [picture],
      ...(publishedAt ? { type: "article" as const, publishedTime: publishedAt } : { type: "website" as const }),
    },
    twitter: { card: "summary_large_image", title, description, images: [picture] },
  };
}

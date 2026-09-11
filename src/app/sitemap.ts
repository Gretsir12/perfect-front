import type { MetadataRoute } from "next";
import { contentRepository } from "@/content/repository";
import { services } from "@/content/services";

const base = "https://perfecthouse.spb.ru";
export const dynamic = "force-static";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [items, articles] = await Promise.all([contentRepository.getCatalogItems(), contentRepository.getArticles()]);
  const pages = ["", "/izdeliya", "/uslugi", "/ograzhdayushchie-konstruktsii", "/o-kompanii", "/blog", "/kontakty", "/sotrudnichestvo", "/privacy", "/soglasie-na-obrabotku-pdn"];
  return [
    ...pages.map((path, index) => ({ url: `${base}${path}`, changeFrequency: (index === 0 ? "weekly" : "monthly") as "weekly" | "monthly", priority: index === 0 ? 1 : .8 })),
    ...items.map(({ slug }) => ({ url: `${base}/izdeliya/${slug}`, changeFrequency: "monthly" as const, priority: .8 })),
    ...services.map(({ slug }) => ({ url: `${base}/uslugi/${slug}`, changeFrequency: "monthly" as const, priority: .8 })),
    ...articles.map(({ slug, publishedAt }) => ({ url: `${base}/blog/${slug}`, lastModified: new Date(publishedAt), changeFrequency: "yearly" as const, priority: .6 })),
  ];
}

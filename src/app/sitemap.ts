import type { MetadataRoute } from "next";
import { contentRepository } from "@/content/repository";

const base = "https://perfecthouse.spb.ru";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [items, articles] = await Promise.all([contentRepository.getCatalogItems(), contentRepository.getArticles()]);
  const pages = ["", "/izdeliya", "/uslugi", "/ograzhdayushchie-konstruktsii", "/o-kompanii", "/blog", "/kontakty", "/sotrudnichestvo", "/privacy", "/soglasie-na-obrabotku-pdn"];
  return [
    ...pages.map((path, index) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: (index === 0 ? "weekly" : "monthly") as "weekly" | "monthly", priority: index === 0 ? 1 : .8 })),
    ...items.map(({ slug }) => ({ url: `${base}/izdeliya/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .8 })),
    ...articles.map(({ slug, publishedAt }) => ({ url: `${base}/blog/${slug}`, lastModified: new Date(publishedAt), changeFrequency: "yearly" as const, priority: .6 })),
  ];
}

import { pageMetadata } from "@/lib/metadata";
import { siteImages } from "@/content/image-registry";
import type { Metadata } from "next";
import { SiteImage as Image } from "@/components/site/SiteImage";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { contentRepository } from "@/content/repository";

export const metadata: Metadata = pageMetadata({ title: "Блог", description: "Интересное о стекле, ограждениях и светопрозрачных конструкциях.", path: "/blog", image: siteImages.pages["blog"].hero });

export default async function BlogPage() {
  const articles = await contentRepository.getArticles();
  return <><PageHero image={siteImages.pages["blog"].hero.src} title="Блог" subtitle="Интересное о стекле" /><Breadcrumbs items={[{ label: "Блог" }]} /><section className="blog-grid content-width">{articles.map((article) => <article key={article.slug}><Link href={`/blog/${article.slug}`}><figure><Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 700px) 100vw, 50vw" /></figure></Link><time dateTime={article.publishedAt}>{new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" }).format(new Date(article.publishedAt))}</time><h2><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link className="arrow-link" href={`/blog/${article.slug}`}>Читать <span>→</span></Link></article>)}</section></>;
}

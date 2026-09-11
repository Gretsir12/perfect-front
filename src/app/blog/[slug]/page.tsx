import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { SiteImage as Image } from "@/components/site/SiteImage";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { RequestSection } from "@/components/site/RequestSection";
import { contentRepository } from "@/content/repository";

export async function generateStaticParams() { return (await contentRepository.getArticles()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const article = await contentRepository.getArticle((await params).slug); return article ? pageMetadata({ title: article.seo.title, description: article.seo.description, path: `/blog/${article.slug}`, image: { src: article.image, alt: article.imageAlt }, publishedAt: article.publishedAt }) : {}; }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await contentRepository.getArticle((await params).slug); if (!article) notFound();
  return <><PageHero title={article.title} image={article.image} /><Breadcrumbs items={[{ label: "Блог", href: "/blog" }, { label: article.title }]} /><article className="article-page content-width"><time dateTime={article.publishedAt}>{new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" }).format(new Date(article.publishedAt))}</time><figure><Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 800px) 100vw, 55vw" /></figure>{article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article><RequestSection /></>;
}

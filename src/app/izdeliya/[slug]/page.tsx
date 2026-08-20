import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductTemplate } from "@/components/catalog/ProductTemplate";
import { contentRepository } from "@/content/repository";

export async function generateStaticParams() { return (await contentRepository.getCatalogItems()).map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = await contentRepository.getCatalogItem((await params).slug);
  if (!item) return {};
  return { title: item.seo.title, description: item.seo.description, keywords: item.seo.keywords, alternates: { canonical: `/izdeliya/${item.slug}` }, openGraph: { title: item.seo.title, description: item.seo.description, images: [item.image] } };
}

export default async function CatalogItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = await contentRepository.getCatalogItem((await params).slug);
  if (!item) notFound();
  return <ProductTemplate item={item} />;
}

import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductTemplate } from "@/components/catalog/ProductTemplate";
import { contentRepository } from "@/content/repository";

export async function generateStaticParams() { return (await contentRepository.getCatalogItems()).map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = await contentRepository.getCatalogItem((await params).slug);
  if (!item) return {};
  return pageMetadata({ title: item.seo.title, description: item.seo.description, keywords: item.seo.keywords, path: `/izdeliya/${item.slug}`, image: { src: item.image, alt: item.imageAlt } });
}

export default async function CatalogItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const item = await contentRepository.getCatalogItem((await params).slug);
  if (!item) notFound();
  return <ProductTemplate item={item} />;
}

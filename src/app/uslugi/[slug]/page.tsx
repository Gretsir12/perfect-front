import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTemplate } from "@/components/site/ServiceTemplate";
import { getService, services } from "@/content/services";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({ title: service.seo.title, description: service.seo.description, keywords: service.seo.keywords, path: `/uslugi/${service.slug}`, image: { src: service.image, alt: service.imageAlt } });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return <ServiceTemplate service={service} />;
}

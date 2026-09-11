import { pageMetadata } from "@/lib/metadata";
import { siteImages } from "@/content/image-registry";
import type { Metadata } from "next";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { RequestSection } from "@/components/site/RequestSection";
import { contentRepository } from "@/content/repository";

export const metadata: Metadata = pageMetadata({ title: "Каталог изделий из стекла и зеркал", description: "Душевые, зеркала, перегородки, двери, ограждения и другие изделия из стекла на заказ в Санкт-Петербурге.", path: "/izdeliya", image: siteImages.pages["izdeliya"].hero });

export default async function CatalogPage() {
  const items = await contentRepository.getCatalogItems();
  return <><PageHero image={siteImages.pages["izdeliya"].hero.src} title="Каталог" subtitle="Изделия из стекла и зеркала по индивидуальным размерам" /><Breadcrumbs items={[{ label: "Изделия" }]} /><section className="catalog-page content-width"><p className="section-kicker">Категории работ</p><h2>Выберите направление</h2><CatalogGrid items={items} /></section><ProcessSteps /><RequestSection /></>;
}

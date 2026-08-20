import Image from "next/image";
import Link from "next/link";
import type { CatalogItem } from "@/content/types";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { RequestSection } from "@/components/site/RequestSection";

export function ProductTemplate({ item }: { item: CatalogItem }) {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: item.title, description: item.description, image: `https://perfecthouse.spb.ru${item.image}`, provider: { "@type": "HomeAndConstructionBusiness", name: "Идеальный Дом", telephone: "+7-812-920-00-80" }, areaServed: "Санкт-Петербург и Ленинградская область" }) }} />
    <PageHero title={item.title} subtitle={item.description} image={item.image} />
    <Breadcrumbs items={[{ label: "Изделия", href: "/izdeliya" }, { label: item.shortTitle }]} />
    <section className="product-intro content-width">
      <div><p className="section-kicker">Индивидуальное изготовление</p><h2>{item.title}</h2><p>{item.intro}</p><ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><Link href="#request" className="blue-button">Оставить заявку</Link></div>
      <div className="product-main-image"><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
    </section>
    <section className="product-gallery content-width"><p className="section-kicker">Примеры работ</p><h2>Реализованные проекты</h2><div>{item.gallery.slice(0,4).map((image, index) => <figure key={`${image}-${index}`}><Image src={image} alt={`${item.shortTitle}, пример работы ${index + 1}`} fill sizes="(max-width: 700px) 50vw, 25vw" /></figure>)}</div></section>
    <ProcessSteps />
    <RequestSection />
  </>;
}

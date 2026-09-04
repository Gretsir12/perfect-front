import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/content/types";
import { Breadcrumbs } from "./Breadcrumbs";
import { PageHero } from "./PageHero";
import { ProcessSteps } from "./ProcessSteps";
import { RequestSection } from "./RequestSection";

export function ServiceTemplate({ service }: { service: Service }) {
  const url = `https://perfecthouse.spb.ru/uslugi/${service.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url,
    image: `https://perfecthouse.spb.ru${service.image}`,
    provider: { "@type": "HomeAndConstructionBusiness", name: "Идеальный Дом", telephone: "+7-812-920-00-80" },
    areaServed: "Санкт-Петербург и Ленинградская область",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <PageHero title={service.title} subtitle={service.description} image={service.image} />
    <Breadcrumbs items={[{ label: "Услуги", href: "/uslugi" }, { label: service.shortTitle }]} />
    <section className="product-intro content-width">
      <div><p className="section-kicker">Услуги Идеального Дома</p><h2>{service.title}</h2><p>{service.intro}</p><ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><Link href="#request" className="blue-button">Оставить заявку</Link></div>
      <div className="product-main-image"><Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
    </section>
    <ProcessSteps />
    <RequestSection />
  </>;
}

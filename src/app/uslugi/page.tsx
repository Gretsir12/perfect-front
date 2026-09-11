import { pageMetadata } from "@/lib/metadata";
import { siteImages } from "@/content/image-registry";
import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/site/ContentPage";
import { services } from "@/content/services";

export const metadata: Metadata = pageMetadata({ title: "Услуги", description: "Полный комплекс услуг по проектированию, обработке, изготовлению и монтажу изделий из стекла.", path: "/uslugi", image: siteImages.pages["uslugi"].hero });

export default function ServicesPage() {
  return <ContentPage image={siteImages.pages["uslugi"].hero.src} title="Услуги" subtitle="Выполняем полный комплекс услуг от полученного технического задания до реализации проекта" gallery={siteImages.pages["uslugi"].gallery}><p className="lead">Мы реализуем самые сложные изделия из стекла и металла, как по готовым проектам, так и по индивидуальным разработкам.</p><p>Наша сфера: разработка проектов светопрозрачных конструкций, согласование проектов, изготовление стеклянных ограждений и монтаж.</p><div className="service-list">{services.map((service,index) => <section key={service.slug}><span>0{index+1}</span><h2><Link href={`/uslugi/${service.slug}`}>{service.shortTitle}</Link></h2><p>{service.description}</p><Link className="service-more" href={`/uslugi/${service.slug}`} aria-label={`Подробнее: ${service.shortTitle}`}>Подробнее →</Link></section>)}</div></ContentPage>;
}

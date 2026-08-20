import Image from "next/image";
import Link from "next/link";
import type { CatalogItem } from "@/content/types";

export function CatalogGrid({ items }: { items: CatalogItem[] }) {
  return <div className="catalog-grid">{items.map((item) => <article className="catalog-card" key={item.slug}>
    <Link href={`/izdeliya/${item.slug}`} className="catalog-image"><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw" /></Link>
    <div><h2><Link href={`/izdeliya/${item.slug}`}>{item.shortTitle}</Link></h2><p>{item.description}</p><Link className="arrow-link" href={`/izdeliya/${item.slug}`}>Подробнее <span>→</span></Link></div>
  </article>)}</div>;
}

import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const allItems = [{ label: "Главная", href: "/" }, ...items];
  const jsonLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: allItems.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, ...(item.href ? { item: `https://perfecthouse.spb.ru${item.href}` } : {}) })) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><nav className="breadcrumbs content-width" aria-label="Хлебные крошки"><Link href="/">Главная</Link>{items.map((item) => <span key={item.label}>/ {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}</span>)}</nav></>;
}

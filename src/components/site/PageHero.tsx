import Image from "next/image";

export function PageHero({ title, subtitle, image = "/images/Промышленное остекление балконов/IMG_1862.jpg" }: { title: string; subtitle?: string; image?: string }) {
  return <section className="page-hero">
    <Image src={image} alt="" fill priority sizes="100vw" />
    <div className="page-hero-overlay" />
    <div className="content-width"><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
  </section>;
}

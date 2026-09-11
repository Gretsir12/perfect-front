import { siteImages } from "@/content/image-registry";
import { SiteImage as Image } from "@/components/site/SiteImage";

export function PageHero({ title, subtitle, image = siteImages.defaults.hero.src }: { title: string; subtitle?: string; image?: string }) {
  return <section className="page-hero">
    <Image src={image} alt="" fill preload sizes="100vw" />
    <div className="page-hero-overlay" />
    <div className="content-width"><span className="page-hero-label">Идеальный Дом</span><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
  </section>;
}

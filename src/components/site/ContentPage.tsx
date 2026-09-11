import { SiteImage as Image } from "@/components/site/SiteImage";
import { Breadcrumbs } from "./Breadcrumbs";
import { PageHero } from "./PageHero";
import { RequestSection } from "./RequestSection";
import type { SiteImageData } from "@/content/image-registry";

export function ContentPage({ title, subtitle, image, children, gallery = [] }: { title: string; subtitle?: string; image?: string; children: React.ReactNode; gallery?: SiteImageData[] }) {
  return <><PageHero title={title} subtitle={subtitle} image={image} /><Breadcrumbs items={[{ label: title }]} /><article className={`text-page content-width${gallery.length ? "" : " text-page-wide"}`}><div>{children}</div>{gallery.length > 0 && <aside>{gallery.map((asset,index) => <figure key={`${asset.src}-${index}`}><Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 800px) 100vw, 36vw" /></figure>)}</aside>}</article><RequestSection /></>;
}

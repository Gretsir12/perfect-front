import Image from "next/image";
import { Breadcrumbs } from "./Breadcrumbs";
import { PageHero } from "./PageHero";
import { RequestSection } from "./RequestSection";

export function ContentPage({ title, subtitle, image, children, gallery = [] }: { title: string; subtitle?: string; image?: string; children: React.ReactNode; gallery?: string[] }) {
  return <><PageHero title={title} subtitle={subtitle} image={image} /><Breadcrumbs items={[{ label: title }]} /><article className="text-page content-width"><div>{children}</div>{gallery.length > 0 && <aside>{gallery.map((src,index) => <figure key={src}><Image src={src} alt={`${title}: фотография ${index + 1}`} fill sizes="(max-width: 800px) 100vw, 36vw" /></figure>)}</aside>}</article><RequestSection /></>;
}

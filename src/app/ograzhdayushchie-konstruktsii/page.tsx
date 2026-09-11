import { pageMetadata } from "@/lib/metadata";
import { siteImages } from "@/content/image-registry";
import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";
import { ProcessSteps } from "@/components/site/ProcessSteps";

export const metadata: Metadata = pageMetadata({ title: "Производство и монтаж ограждающих конструкций", description: "Промышленное остекление, ограждения балконов, козырьки и лестничные ограждения для крупных объектов.", path: "/ograzhdayushchie-konstruktsii", image: siteImages.pages["ograzhdayushchie-konstruktsii"].hero });

export default function IndustrialPage() {
  return <><ContentPage image={siteImages.pages["ograzhdayushchie-konstruktsii"].hero.src} title="Производство и монтаж ограждающих конструкций" subtitle="Промышленное остекление" gallery={siteImages.pages["ograzhdayushchie-konstruktsii"].gallery}><p className="lead">Остекление балконов, уличные козырьки зданий, лестничные ограждения промышленных и коммерческих помещений.</p><h2>Спортивный комплекс «Академия единоборств»</h2><p>Комплекс строительно-монтажных работ по отделке торца перекрытий на балконах гостиницы и монтаж перегородок. Краснодарский край, г. Сочи, Адлерский район, в районе Олимпийского парка.</p><h2>Национальный медицинский исследовательский центр имени В.А. Алмазова</h2><p>Комплекс строительно-монтажных работ по установке стеклянных козырьков и ограждений балконов корпусов 1, 4, 5, 6, 7.</p><h2>Жилой комплекс в Санкт-Петербурге</h2><p>Комплекс строительно-монтажных работ по остеклению террасы на объекте «Жилой комплекс Петровский пр., 26Ж».</p><h2>Новгородская техническая школа</h2><p>Комплекс работ по устройству стеклянных ограждений в Великом Новгороде.</p></ContentPage><ProcessSteps /></>;
}

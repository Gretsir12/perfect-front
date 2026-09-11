import { pageMetadata } from "@/lib/metadata";
import { siteImages } from "@/content/image-registry";
import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";

export const metadata: Metadata = pageMetadata({ title: "Сотрудничество", description: "Информация для архитекторов, дизайнеров, застройщиков и подрядчиков.", path: "/sotrudnichestvo", image: siteImages.pages["sotrudnichestvo"].hero });

export default function CooperationPage() {
  return <ContentPage image={siteImages.pages["sotrudnichestvo"].hero.src} title="Сотрудничество" subtitle="Реализуем проекты из стекла и металла любой сложности"><p className="lead">Приглашаем к сотрудничеству архитекторов, дизайнеров, строительные компании и комплектаторов.</p><p>Собственный инженерно-проектный и монтажный отделы позволяют нам работать с готовыми проектами и разрабатывать индивидуальные решения. Выполняем замер, расчёт, производство, доставку и монтаж.</p><p>Для обсуждения проекта направьте техническое задание на <a href="mailto:grana@grana-as.ru">grana@grana-as.ru</a> или позвоните по телефону <a href="tel:+78129200080">+7 (812) 920-00-80</a>.</p></ContentPage>;
}

import { pageMetadata } from "@/lib/metadata";
import { siteImages } from "@/content/image-registry";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { RequestSection } from "@/components/site/RequestSection";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = pageMetadata({ title: "Контакты", description: "Контакты компании Идеальный Дом в Санкт-Петербурге.", path: "/kontakty", image: siteImages.pages["kontakty"].hero });

export default function ContactsPage() {
  return <><PageHero image={siteImages.pages["kontakty"].hero.src} title="Контакты" subtitle="Свяжитесь с нами удобным способом" /><Breadcrumbs items={[{ label: "Контакты" }]} /><section className="contacts-page content-width"><div><p className="section-kicker">Контакты</p><h2>Мы на связи</h2><p className="contacts-intro">Обсудим ваш проект, поможем с выбором конструкции и подготовим расчёт.</p></div><dl><div><dt>Телефон</dt><dd><a href="tel:+78129200080">+7 (812) 920 00 80</a></dd></div><div><dt>Email</dt><dd><a href="mailto:grana@grana-as.ru">grana@grana-as.ru</a></dd></div><div><dt>Адрес</dt><dd>Санкт-Петербург,<br />Электропультовцев ул., д. 7, лит. В</dd></div><div><dt>VKontakte</dt><dd><a href="https://vk.com/perfecthouse_ph">perfecthouse_ph</a></dd></div></dl></section><RequestSection /></>;
}

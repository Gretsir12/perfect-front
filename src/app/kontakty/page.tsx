import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { LeadForm } from "@/components/site/LeadForm";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Контакты", description: "Контакты компании Идеальный Дом в Санкт-Петербурге.", alternates: { canonical: "/kontakty" } };

export default function ContactsPage() {
  return <><PageHero title="Контакты" subtitle="Свяжитесь с нами удобным способом" /><Breadcrumbs items={[{ label: "Контакты" }]} /><section className="contacts-page content-width"><div><p className="section-kicker">Идеальный Дом</p><h2>Мы на связи</h2><dl><dt>Телефон</dt><dd><a href="tel:+78129200080">+7 (812) 920 00 80</a></dd><dt>Email</dt><dd><a href="mailto:grana@grana-as.ru">grana@grana-as.ru</a></dd><dt>Адрес</dt><dd>Санкт-Петербург,<br />Электропультовцев ул., д. 7, лит. В</dd><dt>VKontakte</dt><dd><a href="https://vk.com/perfecthouse_ph">perfecthouse_ph</a></dd></dl></div><div id="request"><h2>Оставьте заявку</h2><p>Оставьте заявку на проект или замер, а также вопросы связанные с уточнением деталей для заказа.</p><LeadForm /></div></section></>;
}

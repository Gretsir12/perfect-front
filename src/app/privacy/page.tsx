import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Политика конфиденциальности", description: "Политика обработки персональных данных компании Идеальный Дом.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <><PageHero title="Политика конфиденциальности" /><Breadcrumbs items={[{ label: "Политика конфиденциальности" }]} /><article className="legal-page content-width"><h2>Общие положения</h2><p>Настоящая политика описывает порядок обработки персональных данных посетителей сайта компании «Идеальный Дом».</p><h2>Какие данные мы обрабатываем</h2><p>Имя, номер телефона, адрес электронной почты и сведения, которые пользователь добровольно указывает при обращении в компанию.</p><h2>Цель обработки</h2><p>Ответ на обращение, подготовка расчёта, согласование замера и оказание заказанных услуг. Данные не передаются третьим лицам, кроме случаев, предусмотренных законодательством Российской Федерации.</p><h2>Контакты</h2><p>По вопросам обработки данных напишите на <a href="mailto:grana@grana-as.ru">grana@grana-as.ru</a>.</p><p><Link href="/soglasie-na-obrabotku-pdn">Согласие на обработку персональных данных</Link></p></article></>;
}

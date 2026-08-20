import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = { title: "Согласие на обработку персональных данных", robots: { index: true, follow: true }, alternates: { canonical: "/soglasie-na-obrabotku-pdn" } };

export default function ConsentPage() {
  return <><PageHero title="Согласие на обработку персональных данных" /><Breadcrumbs items={[{ label: "Согласие на обработку ПДн" }]} /><article className="legal-page content-width"><p>Пользователь, заполняя формы на сайте, свободно, своей волей и в своем интересе предоставляет согласие компании «Идеальный Дом» на обработку указанных им персональных данных.</p><h2>Перечень данных</h2><p>Имя, телефон, электронная почта, содержание обращения и технические данные, необходимые для обработки заявки.</p><h2>Цели обработки</h2><p>Обратная связь, подготовка коммерческого предложения, согласование замера, заключение и исполнение договора.</p><h2>Отзыв согласия</h2><p>Согласие может быть отозвано путем направления письма на адрес grana@grana-as.ru.</p></article></>;
}

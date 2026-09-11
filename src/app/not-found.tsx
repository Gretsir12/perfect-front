import { siteImages } from "@/content/image-registry";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";

export default function NotFound() {
  return <>
    <PageHero image={siteImages.pages["not-found"].hero.src} title="Страница не найдена" subtitle="Возможно, ссылка устарела или страница была перемещена." />
    <section className="not-found-content content-width">
      <span className="section-kicker">Ошибка 404</span>
      <h2>Найдём то, что вам нужно</h2>
      <p>Посмотрите каталог изделий из стекла или вернитесь на главную страницу.</p>
      <div><Link className="blue-button" href="/izdeliya">В каталог →</Link><Link className="outline-button" href="/">На главную</Link></div>
    </section>
  </>;
}

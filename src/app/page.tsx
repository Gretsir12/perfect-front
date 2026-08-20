import Image from "next/image";
import Link from "next/link";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { RequestSection } from "@/components/site/RequestSection";
import { HeroImageSlider } from "@/components/site/HeroImageSlider";
import { contentRepository } from "@/content/repository";

const services = [
  ["Разработка проектов", "Разработка проектов для промышленного ограждения балконов, лестниц и козырьков."],
  ["Создание 3D макетов", "Возможность наиболее точно представить конечный результат проекта."],
  ["Окрашивание", "Окрашивание стекла и фурнитуры по системе RAL или выбранному цвету."],
  ["УФ-склейка стекла", "Немецкое оборудование позволяет достичь идеального качества склейки."],
];

export default async function Home() {
  const items = await contentRepository.getCatalogItems();
  return <>
    <section className="legacy-home-hero">
      <HeroImageSlider />
      <div className="legacy-hero-overlay" />
      <div className="legacy-hero-content content-width"><h1><span>Стеклянные ограждения</span>любой сложности</h1><Link href="/izdeliya">В галерею <b>›</b></Link><p>Наша работа – это сочетание идеального качества и Ваших фантазий.</p></div>
    </section>

    <RequestSection />

    <section className="legacy-about content-width">
      <div className="about-pictures"><figure><Image src="/images/Основные направления деятельности/photo_2024-02-20_11-49-39.jpg" alt="Зеркала компании Идеальный Дом" fill sizes="(max-width: 800px) 100vw, 42vw" /></figure><figure><Image src="/images/Душевые ограждения/Цельностеклянное душевое ограждение.jpg" alt="Цельностеклянное душевое ограждение" fill sizes="(max-width: 800px) 60vw, 22vw" /></figure></div>
      <div className="about-copy"><p className="section-kicker">О компании</p><h2>Компания Идеальный Дом работает на рынке стеклянных изделий с 2015 года.</h2><p>На сегодняшний день в нашем портфолио есть такие объекты как Академия единоборств в Сочи, Новгородская техническая школа, Национальный медицинский исследовательский центр имени В.А. Алмазова.</p><p>Также мы выполняем частные заказы по изготовлению и монтажу изделий из стекла высокого качества.</p><Link className="arrow-link" href="/o-kompanii">Подробнее <span>→</span></Link></div>
    </section>

    <section className="legacy-stat"><div className="content-width"><strong>Более 10 тысяч</strong><p>реализованных изделий</p><span>Продажа по всей России</span></div></section>

    <section className="home-catalog content-width"><p className="section-kicker">Категории работ</p><h2>Изделия из стекла и зеркала</h2><CatalogGrid items={items.slice(1,7)} /><Link className="blue-button catalog-all" href="/izdeliya">Смотреть весь каталог</Link></section>

    <ProcessSteps />

    <section className="home-projects"><div className="content-width"><p className="section-kicker">Реализованные проекты</p><h2>Трансформация пространства</h2><div className="home-project-grid">{["/images/Реализованные проекты/photo_2024-02-20_11-49-22.jpg","/images/Реализованные проекты/photo_2024-02-20_11-49-34.jpg","/images/Реализованные проекты/photo_2024-02-20_11-49-43.jpg","/images/Реализованные проекты/photo_2024-02-20_11-49-49.jpg"].map((src,index) => <figure key={src}><Image src={src} alt={`Реализованный проект ${index + 1}`} fill sizes="(max-width: 700px) 50vw, 25vw" /></figure>)}</div></div></section>

    <section className="home-services content-width"><p className="section-kicker">Услуги</p><h2>Выполняем полный комплекс услуг</h2><div>{services.map(([title,text], index) => <article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><Link className="blue-button" href="/uslugi">Все услуги</Link></section>
  </>;
}

import Image from "next/image";
import Link from "next/link";
import { HeroImageSlider } from "@/components/site/HeroImageSlider";
import { RequestSection } from "@/components/site/RequestSection";
import { services as allServices } from "@/content/services";

const productionSteps = ["Заявка", "Расчет", "Замер", "Согласование", "Изготовление", "Доставка", "Монтаж"];

const processDetails = [
  ["Замер", "Наши специалисты выполнят замер помещения для точного расчета и изготовления ограждений по Вашему проекту.", "/images/Фото Новгород/IMG_1332.jpg"],
  ["Профессиональная доставка", "Доставка стеклянных изделий требует особых условий. Наши специалисты доставят и поднимут изделия любого размера.", "/images/Промышленное остекление балконов/IMG_1870.jpg"],
  ["Монтаж", "Монтаж ограждений выполняют высококвалифицированные монтажники, имеющие необходимые разрешения и допуски.", "/images/Лестничные ограждения/стеклянные ограждения для лестниц.jpg"],
] as const;

const homeServiceSlugs = ["okrashivanie-stekla-i-furnitury", "uf-skleika-stekla", "3d-makety", "razrabotka-proektov"];
const services = homeServiceSlugs.map((slug) => allServices.find((service) => service.slug === slug)).filter((service) => service !== undefined);

export default function Home() {
  return <>
    <div className="legacy-home-stage"><HeroImageSlider /><section className="legacy-home-hero"><div className="legacy-hero-overlay" /><div className="legacy-hero-content content-width"><h1><span>Стеклянные ограждения</span>любой сложности</h1><div className="legacy-hero-lower"><Link href="/izdeliya">В галерею <b>›</b></Link><p>Наша работа – это сочетание идеального<br />качества и Ваших фантазий.</p></div></div></section><RequestSection /></div>

    <section className="original-about"><div className="content-width original-about-grid"><div className="original-about-images"><figure><Image src="/images/original-home/PF23.jpg" alt="Стеклянное ограждение" fill sizes="42vw" /></figure><figure><Image src="/images/original-home/PF26.jpg" alt="Изделие из стекла" fill sizes="25vw" /></figure></div><div className="original-about-copy"><span className="original-label">О нас</span><p>Компания Идеальный Дом работает на рынке стеклянных изделий с 2015 года. В нашем портфолио — Академия единоборств в Сочи, Новгородская техническая школа и НМИЦ имени В. А. Алмазова.</p><p className="original-callout">Также мы выполняем частные заказы по изготовлению и монтажу изделий из стекла высокого качества.</p><p>Мы реализуем самые сложные проекты из стекла и металла как по готовым проектам, так и по индивидуальным разработкам. У нас есть собственные инженерно-проектный и монтажный отделы.</p><p className="original-callout">Наша сфера: разработка, согласование, изготовление и монтаж светопрозрачных конструкций.</p><strong>Иван Соловьёв</strong><small>Основатель компании</small></div></div></section>

    <section className="original-stat"><h2>Более 10 тысяч реализованных изделий<br />Продажа по всей России</h2></section>
    <section className="original-cycle"><div className="content-width original-cycle-grid"><div><span className="original-label">Под ключ</span><h2>Полный цикл<br />производства</h2><ol>{productionSteps.map((step)=><li key={step}>{step}</li>)}</ol></div><div className="cycle-orbit" aria-hidden="true"><span /><i /><b /></div></div></section>
    <section className="original-projects"><div className="content-width"><span className="original-label">Каталог</span><h2>Реализованные проекты</h2><div className="original-project-row">{["/images/Реализованные проекты/photo_2024-02-20_11-49-22.jpg","/images/Реализованные проекты/photo_2024-02-20_11-49-34.jpg","/images/Реализованные проекты/photo_2024-02-20_11-49-43.jpg"].map((src,i)=><figure key={src}><Image src={src} alt={`Проект ${i+1}`} fill sizes="33vw" /></figure>)}</div></div></section>
    <section className="original-transformation"><div className="content-width transformation-grid"><div><h2>Трансформация<br />пространства</h2><figure className="transformation-image"><Image src="/images/original-home/process-result.png" alt="Трансформация пространства" fill sizes="48vw" /></figure></div><div className="process-detail-list"><span className="original-label">Процесс</span>{processDetails.map(([title,text,image])=><article key={title}><figure><Image src={image} alt="" fill sizes="110px" /></figure><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="original-services"><div className="content-width services-layout"><div className="services-title"><span className="original-label">Услуги</span><h2>Услуги</h2><Link href="/uslugi">Все услуги <b>→</b></Link></div><div className="original-service-list">{services.map((service)=><article key={service.slug}><figure><Image src={service.image} alt="" fill sizes="120px" /></figure><div><h3><Link href={`/uslugi/${service.slug}`}>{service.shortTitle}</Link></h3><p>{service.description}</p></div></article>)}</div></div></section>
  </>;
}

import { siteImages } from "@/content/image-registry";
import { SiteImage as Image } from "@/components/site/SiteImage";
import Link from "next/link";

export function Footer() {
  return <footer className="legacy-footer">
    <div className="legacy-footer-main content-width">
      <div className="footer-brand-block">
        <Image src={siteImages.brand.footer.src} alt={siteImages.brand.footer.alt} width={220} height={104} />
        <p>Более 10 тысяч реализованных изделий<br />Продажа по всей России</p>
        <a href="https://vk.com/perfecthouse_ph" target="_blank" rel="noreferrer" aria-label="Мы во ВКонтакте">VK</a>
      </div>
      <div><h2>Контакты</h2><p>Телефон: <a href="tel:+78129200080">+7 (812) 920 00 80</a></p><p>Email: <a href="mailto:grana@grana-as.ru">grana@grana-as.ru</a></p><p>Адрес: Санкт-Петербург,<br />Электропультовцев ул., д. 7, лит. В</p></div>
      <div><h2>Быстрые ссылки</h2><Link href="/o-kompanii">О нас</Link><Link href="/uslugi">Услуги</Link><Link href="/sotrudnichestvo">Информация для сотрудничества</Link><Link href="/privacy">Политика конфиденциальности</Link></div>
    </div>
    <div className="legacy-footer-bottom content-width"><span>Работаем для вас с 2015 года</span><span>Copyright {new Date().getFullYear()} Perfect House</span></div>
  </footer>;
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Главная" },
  { href: "/izdeliya", label: "Каталог" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/ograzhdayushchie-konstruktsii", label: "Ограждающие конструкции" },
  { href: "/blog", label: "Блог" },
  { href: "/kontakty", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  return <header className={`legacy-header ${isHome ? "is-home" : ""}`}>
    <div className="legacy-topbar">
      <a href="https://vk.com/perfecthouse_ph" target="_blank" rel="noreferrer"><b>vk</b> VKontakte : perfecthouse_ph</a>
      <div className="ticker"><span>НОВОСТИ</span><p>Закажите выезд замерщика</p></div>
      <a href="tel:+78129200080"><b>☎</b> +7 812 920 00 80</a>
    </div>
    <div className="legacy-navbar">
      <Link href="/" className="legacy-logo" aria-label="Идеальный Дом — главная">
        <Image src="/photo_2026-08-26_16-03-49.jpg" alt="Идеальный Дом" width={334} height={159} priority />
      </Link>
      <nav className="legacy-nav" aria-label="Основная навигация">
        {links.map((link) => <Link className={pathname === link.href ? "active" : undefined} href={link.href} key={link.href}>{link.label}</Link>)}
      </nav>
      <Link className="legacy-apply" href="/kontakty#request"><span>Оставьте<br />заявку</span></Link>
      <button className="legacy-burger" aria-label="Открыть меню" aria-expanded={open} onClick={() => setOpen(true)}><span/><span/><span/></button>
    </div>
    <div className={`legacy-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <button aria-label="Закрыть меню" onClick={() => setOpen(false)}>×</button>
      <nav>{links.map((link) => <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>
      <a href="tel:+78129200080">+7 812 920 00 80</a>
    </div>
    {open && <button className="drawer-backdrop" aria-label="Закрыть меню" onClick={() => setOpen(false)} />}
  </header>;
}

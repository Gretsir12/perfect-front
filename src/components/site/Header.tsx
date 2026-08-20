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

  return <header className="legacy-header">
    <div className="legacy-topbar">
      <a href="https://vk.com/perfecthouse_ph" target="_blank" rel="noreferrer">VKontakte : perfecthouse_ph</a>
      <div className="ticker"><span>НОВОСТИ</span><p>Закажите выезд замерщика</p></div>
      <a href="tel:+78129200080">☎ &nbsp;+7 812 920 00 80</a>
    </div>
    <div className="legacy-navbar">
      <Link href="/" className="legacy-logo" aria-label="Идеальный Дом — главная">
        <Image src="/images/Логотип/Logo only 300 BW.png" alt="Идеальный Дом" width={167} height={80} priority />
      </Link>
      <nav className="legacy-nav" aria-label="Основная навигация">
        {links.map((link) => <Link className={pathname === link.href ? "active" : undefined} href={link.href} key={link.href}>{link.label}</Link>)}
      </nav>
      <Link className="legacy-apply" href="/kontakty#request">Оставьте заявку</Link>
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

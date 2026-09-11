"use client";

import { siteImages } from "@/content/image-registry";
import { SiteImage as Image } from "@/components/site/SiteImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const burger = burgerRef.current;
    if (!drawer) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = Array.from(drawer.querySelectorAll<HTMLElement>("button, a[href]"));
    focusable[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 1051px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", closeOnDesktop);
      if (drawer.contains(document.activeElement)) burger?.focus();
    };
  }, [open]);

  return <header className="legacy-header">
    <div className="legacy-topbar">
      <a href="https://vk.com/perfecthouse_ph" target="_blank" rel="noreferrer"><b>vk</b> VKontakte : perfecthouse_ph</a>
      <a href="tel:+78129200080"><b>☎</b> +7 812 920 00 80</a>
    </div>
    <div className="legacy-navbar">
      <Link href="/" className="legacy-logo" aria-label="Идеальный Дом — главная">
        <Image src={siteImages.brand.header.src} alt={siteImages.brand.header.alt} width={334} height={159} preload />
      </Link>
      <nav className="legacy-nav" aria-label="Основная навигация">
        {links.map((link) => <Link className={isActive(link.href) ? "active" : undefined} aria-current={pathname === link.href ? "page" : undefined} href={link.href} key={link.href}>{link.label}</Link>)}
      </nav>
      <Link className="legacy-apply" href="/kontakty#request"><span>Оставьте<br />заявку</span></Link>
      <button ref={burgerRef} className="legacy-burger" type="button" aria-label="Открыть меню" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><span/><span/><span/></button>
    </div>
    <div ref={drawerRef} id="mobile-menu" className={`legacy-drawer ${open ? "open" : ""}`} role="dialog" aria-label="Меню сайта" aria-modal={open ? true : undefined} aria-hidden={!open} inert={!open}>
      <button aria-label="Закрыть меню" onClick={() => setOpen(false)}>×</button>
      <nav aria-label="Мобильная навигация">{links.map((link) => <Link className={isActive(link.href) ? "active" : undefined} aria-current={pathname === link.href ? "page" : undefined} href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>
      <a href="tel:+78129200080">+7 812 920 00 80</a>
    </div>
    {open && <button className="drawer-backdrop" aria-label="Закрыть меню" onClick={() => setOpen(false)} />}
  </header>;
}

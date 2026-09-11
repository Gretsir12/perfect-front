"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try { setVisible(localStorage.getItem("ph-cookie-consent") === null); }
      catch { setVisible(true); }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  if (!visible) return null;
  const choose = (value: string) => {
    try { localStorage.setItem("ph-cookie-consent", value); } catch { /* Storage may be disabled in the browser. */ }
    setVisible(false);
  };
  return <aside className="cookie-box" aria-label="Настройки cookie">
    <h2>Мы используем cookie, чтобы сделать сайт удобнее</h2>
    <p>Мы используем cookie-файлы для улучшения работы сайта. Подробнее — в <Link href="/privacy">политике конфиденциальности</Link>.</p>
    <div><button className="outline-button" onClick={() => choose("necessary")}>Отменить</button><button className="blue-button" onClick={() => choose("all")}>Принять все</button></div>
  </aside>;
}

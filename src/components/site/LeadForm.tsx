"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type FormState = "idle" | "sending" | "success" | "error";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [development, setDevelopment] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("sending"); setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: data.get("name"), phone: data.get("phone"), message: data.get("message"), website: data.get("website"), consent: data.get("consent") === "on", sourcePath: pathname }) });
      const result = await response.json();
      if (!response.ok) throw new Error(typeof result.error === "string" ? result.error : "Не удалось отправить заявку");
      setDevelopment(result.development === true);
      setState("success"); form.reset();
    } catch (cause) { setState("error"); setError(cause instanceof Error ? cause.message : "Произошла ошибка"); }
  }

  return <form className={`legacy-form ${compact ? "compact" : ""}`} onSubmit={submit}>
    <div className="honeypot" aria-hidden="true"><label>Сайт<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label><span>Имя *</span><input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
    <label><span>Телефон *</span><input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={40} /></label>
    {!compact && <label className="form-message"><span>Расскажите о задаче</span><textarea name="message" rows={4} maxLength={3000} /></label>}
    <label className="consent"><input type="checkbox" name="consent" required /> <span>Даю <Link href="/soglasie-na-obrabotku-pdn" target="_blank" rel="noreferrer">согласие на обработку персональных данных</Link></span></label>
    <button className="legacy-submit" disabled={state === "sending"} type="submit">{state === "sending" ? "Отправляем..." : "Отправить заявку"}</button>
    <div className="form-status" aria-live="polite">{state === "success" && (development ? "Тестовый режим: данные проверены, письмо не отправлено." : "Спасибо! Заявка отправлена.")}{state === "error" && `${error}. Позвоните нам: +7 (812) 920-00-80.`}</div>
  </form>;
}

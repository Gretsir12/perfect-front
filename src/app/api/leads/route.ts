import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type LeadPayload = { name?: unknown; phone?: unknown; message?: unknown; website?: unknown; consent?: unknown; sourcePath?: unknown };

function text(value: unknown, maxLength: number) { return typeof value === "string" ? value.trim().slice(0, maxLength) : ""; }

export async function POST(request: Request) {
  let payload: LeadPayload;
  try { payload = await request.json() as LeadPayload; } catch { return NextResponse.json({ error: "Некорректные данные" }, { status: 400 }); }
  const name = text(payload.name, 100); const phone = text(payload.phone, 40); const message = text(payload.message, 3000); const sourcePath = text(payload.sourcePath, 300);
  if (text(payload.website, 200)) return NextResponse.json({ ok: true });
  if (name.length < 2 || phone.length < 7 || payload.consent !== true) return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 422 });

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    if (process.env.NODE_ENV === "development") { console.info("Perfect House lead", { name, phone, message, sourcePath }); return NextResponse.json({ ok: true, development: true }); }
    return NextResponse.json({ error: "Отправка заявок ещё не настроена" }, { status: 503 });
  }

  try {
    const port = Number(process.env.SMTP_PORT ?? 465);
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: port === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: process.env.LEADS_TO_EMAIL ?? "grana@grana-as.ru",
      replyTo: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      subject: `Заявка с сайта: ${name}`,
      text: `Имя: ${name}\nТелефон: ${phone}\nСтраница: ${sourcePath}\n\n${message || "Комментарий не указан"}`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) { console.error("Lead delivery failed", error); return NextResponse.json({ error: "Не удалось отправить заявку" }, { status: 502 }); }
}

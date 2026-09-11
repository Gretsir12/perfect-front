import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type LeadPayload = { name?: unknown; phone?: unknown; message?: unknown; website?: unknown; consent?: unknown; sourcePath?: unknown };

function text(value: unknown, maxLength: number) { return typeof value === "string" ? value.trim().slice(0, maxLength) : ""; }

const MAX_BODY_BYTES = 16 * 1024;

async function readPayload(request: Request): Promise<unknown> {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) throw new RangeError("Payload too large");
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("Empty payload");
  const decoder = new TextDecoder();
  let length = 0;
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        void reader.cancel().catch(() => {});
        throw new RangeError("Payload too large");
      }
      body += decoder.decode(value, { stream: true });
    }
    return JSON.parse(body + decoder.decode());
  } finally { reader.releaseLock(); }
}

export async function POST(request: Request) {
  let payload: LeadPayload;
  try {
    const body = await readPayload(request);
    if (body === null || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
    }
    payload = body as LeadPayload;
  } catch (error) {
    if (error instanceof RangeError) return NextResponse.json({ error: "Слишком большой размер заявки" }, { status: 413 });
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }
  const name = text(payload.name, 100); const phone = text(payload.phone, 40); const message = text(payload.message, 3000); const sourcePath = text(payload.sourcePath, 300);
  if (text(payload.website, 200)) return NextResponse.json({ ok: true });
  const phoneDigits = phone.replace(/\D/g, "");
  if (name.length < 2 || !/^[+\d\s().-]+$/.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15 || payload.consent !== true) return NextResponse.json({ error: "Укажите имя, корректный телефон и согласие на обработку данных" }, { status: 422 });

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    if (process.env.NODE_ENV === "development") return NextResponse.json({ ok: true, development: true });
    return NextResponse.json({ error: "Отправка заявок ещё не настроена" }, { status: 503 });
  }

  try {
    const port = Number(process.env.SMTP_PORT ?? 465);
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: port === 465, connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 20_000, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
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

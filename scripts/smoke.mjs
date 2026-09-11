import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { imageSlots, validateImages } from "./images.mjs";

const base = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";
const request = (pathname, options) => fetch(new URL(pathname, base), {
  signal: AbortSignal.timeout(30_000), ...options,
});

const sitemap = await request("/sitemap.xml");
assert.equal(sitemap.status, 200);
const paths = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)]
  .map(([, url]) => new URL(url).pathname);
assert.ok(paths.length > 0, "Sitemap must contain pages");
const links = new Set();

for (const pathname of paths) {
  const response = await request(pathname);
  assert.equal(response.status, 200, pathname);
  const html = await response.text();
  const ogUrl = html.match(/property="og:url" content="([^"]+)"/)?.[1];
  assert.equal(new URL(ogUrl).pathname, pathname, `${pathname}: Open Graph URL`);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${pathname}: one h1`);
  assert.ok(html.includes(`rel="canonical" href="https://perfecthouse.spb.ru${pathname === "/" ? "" : pathname}"`)
    || html.includes(`rel="canonical" href="https://perfecthouse.spb.ru${pathname}"`), `${pathname}: canonical`);
  for (const [, href] of html.matchAll(/href="(\/(?!\/)[^"#?]*)"/g)) {
    if (!href.startsWith("/_next/") && !href.startsWith("/images/")) links.add(href);
  }
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {
    const data = JSON.parse(json);
    if (data["@type"] === "BreadcrumbList") {
      const last = data.itemListElement.at(-1);
      assert.ok(!last.item || last.item === `https://perfecthouse.spb.ru${pathname}`, `${pathname}: final breadcrumb`);
    }
  }
}

for (const pathname of links) {
  assert.equal((await request(pathname, { method: "HEAD" })).status, 200, `Link: ${pathname}`);
}
for (const pathname of ["/not-a-real-page", "/izdeliya/not-a-real-item", "/uslugi/not-a-real-service", "/blog/not-a-real-article"]) {
  assert.equal((await request(pathname)).status, 404, pathname);
}
for (const [from, to] of [
  ["/woocommerce-pages/katalog-ograzhdenij-iz-stekla/", "/izdeliya"],
  ["/service-pages/uslugi/", "/uslugi"],
  ["/about-pages/", "/o-kompanii"],
  ["/contact-pages/kontakty/", "/kontakty"],
  ["/archive-pages/blog/", "/blog"],
  ["/privacy-policy/", "/privacy"],
]) {
  const response = await request(from, { redirect: "manual" });
  assert.equal(response.status, 301, from);
  assert.equal(new URL(response.headers.get("location"), base).pathname, to, from);
}
const tracking = await request("/service-pages/uslugi/?utm_source=audit", { redirect: "manual" });
assert.equal(new URL(tracking.headers.get("location"), base).searchParams.get("utm_source"), "audit");

// All payloads are invalid or honeypots: this check never sends a real lead.
for (const [body, status] of [
  ["null", 400], ["[]", 400], ["42", 400], ['"text"', 400], ["{", 400], ["{}", 422],
  [JSON.stringify({ name: "Тест", phone: "abcdefg", consent: true }), 422],
  [JSON.stringify({ name: "Тест", phone: "+7 (812) 920-00-80", consent: false }), 422],
  [JSON.stringify({ website: "bot.example" }), 200],
  [JSON.stringify({ message: "x".repeat(17000) }), 413],
]) {
  const response = await request("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body });
  assert.equal(response.status, status, `Lead payload: ${body}`);
  assert.match(response.headers.get("content-type"), /application\/json/);
}
assert.equal((await request("/api/leads")).status, 405);
// A streamed request has no Content-Length; the actual bytes must also be limited.
const streamed = new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode(JSON.stringify({ message: "я".repeat(9000) }))); controller.close(); } });
assert.equal((await request("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: streamed, duplex: "half" })).status, 413);

const manifest = JSON.parse(await readFile("src/content/images.json", "utf8"));
await validateImages(manifest);
const assets = new Set(imageSlots(manifest).map(({ src }) => src));
for (const asset of assets) {
  const encoded = asset.split("/").map(encodeURIComponent).join("/");
  assert.equal((await request(encoded, { method: "HEAD" })).status, 200, `Asset: ${asset}`);
}
console.log(`Passed: ${paths.length} pages with metadata, ${links.size} internal links, ${assets.size} assets, 4 unknown routes, 7 redirects, 12 API checks.`);

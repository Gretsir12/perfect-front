import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000";
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH });
const retry = process.argv.includes("--retry-failed");
const report = retry
  ? JSON.parse(await readFile("artifacts/audit-latest.json", "utf8"))
  : { base, browser: browser.version(), checkedAt: new Date().toISOString(), pages: [], errors: [], checks: [] };
const failed = (item) => item.overflow > 1 || item.broken.length || item.pending.length || item.violations.length;
const retries = retry ? report.pages.filter(failed) : [];
if (retry) { report.recheckedAt = new Date().toISOString(); report.checks = []; }
await mkdir("artifacts/browser-captures", { recursive: true });

try {
  const context = await browser.newContext();
  await context.addInitScript(() => localStorage.setItem("ph-cookie-consent", "necessary"));
  const page = await context.newPage();
  page.on("pageerror", (error) => report.errors.push(error.message));
  const xml = await (await page.request.get(`${base}/sitemap.xml`)).text();
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => new URL(url).pathname);
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const pathname of paths) {
      if (retry && !retries.some((item) => item.pathname === pathname && item.width === width)) continue;
      const response = await page.goto(base + pathname, { waitUntil: "domcontentloaded" });
      assert.equal(response.status(), 200, pathname);
      // Scroll as a visitor would: React hydration can restore loading="lazy" if
      // the test changes it immediately after DOMContentLoaded.
      await page.waitForLoadState("load");
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let top = 0; top < height; top += 700) {
        await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), top);
        await page.waitForTimeout(60);
      }
      await page.evaluate(async () => {
        await Promise.race([
          Promise.all([...document.images].map((img) => img.decode().catch(() => {}))),
          new Promise((resolve) => setTimeout(resolve, 15000)),
        ]);
      });
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      const metrics = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - innerWidth,
        broken: [...document.images].filter((image) => image.complete && !image.naturalWidth).map((image) => image.currentSrc),
        pending: [...document.images].filter((image) => !image.complete).map((image) => image.currentSrc),
      }));
      const violations = width === 768 ? [] : (await new AxeBuilder({ page }).analyze()).violations.map((violation) => ({
        id: violation.id, impact: violation.impact, nodes: violation.nodes.map((node) => ({ target: node.target, detail: node.failureSummary })),
      }));
      report.pages = report.pages.filter((item) => item.pathname !== pathname || item.width !== width);
      report.pages.push({ pathname, width, ...metrics, accessibilityChecked: width !== 768, violations });
      await writeFile("artifacts/audit-latest.json", JSON.stringify(report, null, 2));
      console.log(`${width} ${pathname}: overflow=${metrics.overflow}, broken=${metrics.broken.length}, pending=${metrics.pending.length}, axe=${violations.length}`);
      if (["/", "/kontakty", "/uslugi/3d-makety"].includes(pathname) && width !== 768) {
        await page.screenshot({ path: `artifacts/browser-captures/latest-${pathname.slice(1).replaceAll("/", "-") || "home"}-${width}.png`, fullPage: true, animations: "disabled" });
      }
    }
  }

  await page.goto(base, { waitUntil: "domcontentloaded" });
  for (const width of [320, 390, 768, 900, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.locator(".production-model").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector(".production-model").dataset.active === "true");
    const rect = await page.locator(".production-model").boundingBox();
    assert.ok(rect.x >= 0 && rect.x + rect.width <= width + 1, `Model fits at ${width}`);
    assert.equal(await page.locator(".production-model button").count(), 0);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await page.locator(".production-model-disc").evaluate((node) => getComputedStyle(node).animationName), "none");
  report.checks.push("Model fits 320–1440px, no animation button, reduced motion works");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.locator(".legacy-burger").click();
  assert.equal(await page.locator(".legacy-drawer").evaluate((node) => node.inert), false);
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".legacy-drawer").evaluate((node) => node.inert), true);
  await page.locator(".legacy-burger").click();
  await page.locator('.legacy-drawer a[href="/kontakty"]').click();
  await page.waitForURL("**/kontakty");
  report.checks.push("Mobile navigation, Escape and inert work");

  for (const pathname of ["/", "/kontakty"]) {
    await page.goto(base + pathname, { waitUntil: "domcontentloaded" });
    let payload;
    await page.route("**/api/leads", async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true,"development":true}' });
    });
    const checkbox = page.locator('input[name="consent"]');
    assert.equal(await checkbox.count(), 1);
    assert.equal(await checkbox.isChecked(), false);
    await page.locator('input[name="name"]').fill("Проверка");
    await page.locator('input[name="phone"]').fill("+7 (812) 920-00-80");
    await page.locator('button[type="submit"]').click();
    assert.equal(payload, undefined, "Consent is required");
    await checkbox.check();
    await page.locator('button[type="submit"]').click();
    await page.waitForFunction(() => document.querySelector(".form-status").textContent.includes("письмо не отправлено"));
    assert.equal(payload.consent, true);
    await page.unroute("**/api/leads");
  }
  report.checks.push("Home and contacts require checked consent; mocked submission works");

  const restricted = await browser.newContext();
  await restricted.addInitScript(() => { Storage.prototype.getItem = () => { throw new DOMException("Blocked", "SecurityError"); }; Storage.prototype.setItem = () => { throw new DOMException("Blocked", "SecurityError"); }; });
  const storagePage = await restricted.newPage();
  storagePage.on("pageerror", (error) => report.errors.push(error.message));
  await storagePage.goto(base, { waitUntil: "domcontentloaded" });
  await storagePage.locator(".cookie-box button").first().click();
  assert.equal(await storagePage.locator(".cookie-box").count(), 0);
  report.checks.push("Cookie choice works without localStorage");

  const manifest = JSON.parse(await readFile("src/content/images.json", "utf8"));
  await page.goto(base, { waitUntil: "domcontentloaded" });
  const backgrounds = await page.locator("html").evaluate((element) => element.getAttribute("style"));
  for (const key of Object.keys(manifest.backgrounds)) assert.ok(backgrounds.includes(`--image-${key}:`));
  report.checks.push("All background slots are present in the rendered page");
  assert.equal(report.errors.length, 0, "Browser errors");
  const failures = report.pages.filter(failed);
  assert.equal(failures.length, 0, `Page failures: ${failures.map((item) => `${item.width} ${item.pathname}`).join(", ")}`);
  console.log(`Passed: ${report.pages.length} viewport/page combinations and ${report.checks.length} interaction checks.`);
} finally {
  await writeFile("artifacts/audit-latest.json", JSON.stringify(report, null, 2));
  await browser.close();
}

import { readFile, writeFile, stat, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";

const root = fileURLToPath(new URL("../", import.meta.url));
const publicRoot = path.join(root, "public");
const manifestPath = path.join(root, "src/content/images.json");
const extensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"]);
// Use the image decoder shipped with the installed Next.js, without a second copy.
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");

export function imageSlots(value, prefix = "") {
  if (value && typeof value === "object" && "src" in value) return [{ key: prefix, ...value }];
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, child]) => imageSlots(child, prefix ? `${prefix}.${key}` : key));
}

export async function validateImages(manifest) {
  const slots = imageSlots(manifest);
  if (!slots.length) throw new Error("В images.json не найдено изображений.");
  if (!Array.isArray(manifest.home?.slides) || !manifest.home.slides.length) throw new Error("В home.slides нужен хотя бы один слайд.");
  const decoded = new Map();
  const results = [];
  for (const slot of slots) {
    if (typeof slot.src !== "string" || typeof slot.alt !== "string") throw new Error(`${slot.key}: нужны строковые src и alt.`);
    if (!slot.src.startsWith("/") || slot.src.startsWith("//") || slot.src.includes("\\") || slot.src.split("/").includes("..")) {
      throw new Error(`${slot.key}: укажите локальный путь от public, например /images/uploads/photo.webp.`);
    }
    const file = path.resolve(publicRoot, `.${slot.src}`);
    if (!file.startsWith(publicRoot + path.sep) || !extensions.has(path.extname(file).toLowerCase())) throw new Error(`${slot.key}: неподдерживаемый путь или формат.`);
    try {
      if (!decoded.has(file)) {
        const info = await stat(file);
        if (!info.isFile()) throw new Error("это не файл");
        const metadata = await sharp(file).metadata();
        if (!metadata.width || !metadata.height) throw new Error("не удалось прочитать размер изображения");
        decoded.set(file, { bytes: info.size, width: metadata.width, height: metadata.height });
      }
      results.push({ ...slot, ...decoded.get(file) });
    } catch (error) {
      throw new Error(`${slot.key}: ${slot.src} — ${error.message}`);
    }
  }
  return results;
}

const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

async function catalog(results) {
  const cards = results.map((slot) => {
    const src = pathToFileURL(path.join(publicRoot, slot.src)).href;
    return `<article data-search="${escape(`${slot.key} ${slot.alt} ${slot.src}`.toLowerCase())}"><div class="picture"><img src="${escape(src)}" alt="${escape(slot.alt)}" loading="lazy"></div><div class="copy"><h2>${escape(slot.key)}</h2><p>${escape(slot.alt || "Декоративный фон")}</p><code>${escape(slot.src)}</code><small>${slot.width} × ${slot.height} · ${Math.round(slot.bytes / 1024)} КБ</small><p class="command">npm run images:replace -- ${escape(slot.key)} /путь/к/новому-фото.jpg</p></div></article>`;
  }).join("\n");
  const html = `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Изображения Perfect House</title><style>*{box-sizing:border-box}body{margin:0;background:#f3f6fa;color:#20215c;font:16px/1.6 Arial,sans-serif}header{padding:40px max(24px,calc((100% - 1280px)/2));background:#20215c;color:white}h1{font-weight:400;margin:0}header p{max-width:900px}input{width:100%;padding:15px;border:0;font:inherit}main{max-width:1328px;padding:30px 24px;margin:auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}article{background:white;overflow:hidden}article[hidden]{display:none}.picture{height:240px;background:repeating-conic-gradient(#e1e6ec 0% 25%,white 0% 50%) 50%/20px 20px}.picture img{width:100%;height:100%;object-fit:contain}.copy{padding:20px}h2{font-size:16px;overflow-wrap:anywhere;margin:0}code,small{display:block;overflow-wrap:anywhere;font-size:12px;color:#4f5966}.command{background:#e8f5ff;padding:10px;font:12px/1.5 monospace;overflow-wrap:anywhere}</style><header><h1>Картинки сайта — ${results.length} мест использования</h1><p>Редактируйте <b>src/content/images.json</b> или замените фото командой под его превью. Для каждого места указаны ключ, путь, описание и размер. Это локальный каталог; он не публикуется на сайте.</p><label for="search">Найти страницу, секцию или файл</label><input id="search" type="search" placeholder="Например: home, katalog, zerkala, фон"></header><main>${cards}</main><script>document.querySelector('#search').addEventListener('input',event=>{const query=event.target.value.toLowerCase().trim();document.querySelectorAll('article').forEach(card=>{card.hidden=!card.dataset.search.includes(query)})});</script></html>`;
  await mkdir(path.join(root, "artifacts"), { recursive: true });
  const output = path.join(root, "artifacts/images-catalog.html");
  await writeFile(output, html);
  console.log(`Каталог превью: ${output}`);
}

async function main() {
  const [command = "check", key, sourceFile, ...options] = process.argv.slice(2);
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  if (command === "replace") {
    if (!key || !sourceFile || (options.length && (options.length !== 2 || options[0] !== "--alt"))) {
      throw new Error('Команда: npm run images:replace -- home.about.primary /путь/фото.jpg [--alt "Описание"]');
    }
    const slot = key.split(".").reduce((value, part) => value && Object.hasOwn(value, part) ? value[part] : undefined, manifest);
    if (!slot || typeof slot.src !== "string") throw new Error(`Место ${key} не найдено. Откройте npm run images:catalog.`);
    const source = path.resolve(sourceFile);
    const extension = path.extname(source).toLowerCase();
    if (!extensions.has(extension)) throw new Error("Поддерживаются JPG, PNG, WebP, AVIF, GIF и SVG.");
    const buffer = await readFile(source);
    await sharp(buffer).metadata();
    const filename = `${createHash("sha256").update(buffer).digest("hex").slice(0,16)}${extension}`;
    const destination = path.join(publicRoot, "images/uploads", filename);
    await mkdir(path.dirname(destination), { recursive: true });
    if (source !== destination) await copyFile(source, destination);
    slot.src = `/images/uploads/${filename}`;
    if (options.length) slot.alt = options[1];
    await validateImages(manifest);
    const temporary = manifestPath + ".tmp";
    await writeFile(temporary, JSON.stringify(manifest, null, 2) + "\n");
    const { rename } = await import("node:fs/promises");
    await rename(temporary, manifestPath);
    console.log(`Обновлено ${key}: ${slot.src}. Исходный файл сохранён. Production-сайт нужно пересобрать и опубликовать.`);
  } else if (command === "check" || command === "catalog") {
    const results = await validateImages(manifest);
    console.log(`Проверено ${results.length} мест использования, ${new Set(results.map((slot) => slot.src)).size} уникальных файлов.`);
    if (command === "catalog") await catalog(results);
  } else throw new Error("Доступные команды: check, catalog, replace.");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}

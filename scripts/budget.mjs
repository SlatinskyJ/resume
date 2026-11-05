// Checks the performance budget from the design spec on the built site:
//   - first load of each page (HTML + fonts + photo, gzip for text) < 120 KB
//   - the inline plant script (grow) <= 2 KB gzipped
// Loads each page in Chromium at desktop and phone size and sums what it requested.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { chromium } from "playwright";
import { serve } from "./serve.mjs";

const LIMIT_PAGE = 120 * 1024;
const LIMIT_SCRIPT = 2 * 1024;
const TEXT = /\.(html|css|js|svg)$|\/$/;

const { url, close } = await serve("dist");
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
let failed = false;

const fileFor = (u) => {
  const p = new URL(u).pathname;
  return join("dist", p.endsWith("/") ? p + "index.html" : p);
};

for (const path of ["/", "/ai-setup/"]) {
  for (const vp of [{ width: 1280, height: 800 }, { width: 390, height: 800 }]) {
    const page = await browser.newPage({ viewport: vp });
    const urls = new Set();
    page.on("request", (r) => urls.add(r.url()));
    await page.goto(url + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    let total = 0;
    for (const u of urls) {
      const buf = await readFile(fileFor(u)).catch(() => Buffer.alloc(0));
      total += TEXT.test(new URL(u).pathname) ? gzipSync(buf).length : buf.length;
    }
    const ok = total < LIMIT_PAGE;
    failed ||= !ok;
    console.log(`${ok ? "ok  " : "FAIL"} ${path} @${vp.width}px: ${(total / 1024).toFixed(1)} KB (${urls.size} requests)`);
    await page.close();
  }
}

const html = await readFile("dist/index.html", "utf8");
const scripts = [...html.matchAll(/<script type="module"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const script = gzipSync(scripts.join("")).length;
const ok = script <= LIMIT_SCRIPT;
failed ||= !ok;
console.log(`${ok ? "ok  " : "FAIL"} grow script: ${script} B gzipped`);

await browser.close();
close();
if (failed) process.exit(1);

// Renders the resume page's print stylesheet to dist/resume.pdf (one A4 page).
// Runs in the deploy workflow after `astro build`, so the PDF always matches the site.
import { chromium } from "playwright";
import { serve } from "./serve.mjs";

const { url, close } = await serve("dist");
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage();
await page.emulateMedia({ media: "print", reducedMotion: "reduce" });
await page.goto(`${url}/`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: "dist/resume.pdf", format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
close();

// Fail the build if the resume spills onto a second page.
const pages = await (async () => {
  const { readFile } = await import("node:fs/promises");
  const pdf = await readFile("dist/resume.pdf", "latin1");
  return (pdf.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
})();
console.log(`dist/resume.pdf: ${pages} page(s)`);
if (pages !== 1) {
  console.error("Resume PDF must be exactly one A4 page.");
  process.exit(1);
}

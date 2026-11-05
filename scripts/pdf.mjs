// Renders the built resume page (out/index.html) to an A4 PDF.
// Usage: npm run build && npm run pdf
// Writes out/jakub-slatinsky-resume.pdf (served by the site) and
// public/... is not touched, so the PDF always matches the deployed page.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { chromium } from "playwright";

const outDir = resolve("out");
const pdfPath = join(outDir, "jakub-slatinsky-resume.pdf");
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".jpg": "image/jpeg", ".woff2": "font/woff2" };

const server = createServer(async (req, res) => {
  let p = decodeURIComponent((req.url ?? "/").split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  try {
    const body = await readFile(join(outDir, p));
    res.writeHead(200, { "content-type": types[extname(p)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});

await new Promise((r) => server.listen(0, r));
const port = server.address().port;

// Prefer the browser preinstalled in some environments, else Playwright's own.
const preinstalled = "/opt/pw-browsers/chromium";
const browser = await chromium.launch(
  process.env.PDF_USE_SYSTEM_CHROMIUM && existsSync(preinstalled) ? { executablePath: preinstalled } : {},
);
const page = await browser.newPage();
await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });
await page.pdf({ path: pdfPath, format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
server.close();
console.log(`PDF written to ${pdfPath}`);

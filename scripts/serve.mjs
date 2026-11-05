// Tiny static server for dist/, used by the PDF and budget scripts.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
};

export async function serve(dir = "dist") {
  const root = resolve(dir);
  const server = createServer(async (req, res) => {
    let p = join(root, decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname));
    try {
      if ((await stat(p)).isDirectory()) p = join(p, "index.html");
      res.writeHead(200, { "content-type": TYPES[extname(p)] ?? "application/octet-stream" });
      res.end(await readFile(p));
    } catch {
      res.writeHead(404).end("not found");
    }
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}

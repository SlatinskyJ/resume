// Downloads tightly subset, self-hosted fonts into public/fonts/.
// Run once when the character set or weights change: `node scripts/fonts.mjs`.
// The files are committed, so builds never depend on Google Fonts.
import { writeFile } from "node:fs/promises";

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

// Basic Latin + Latin-1 + Czech + the punctuation the site uses.
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => String.fromCodePoint(a + i)).join("");
const TEXT =
  range(0x20, 0x7e) + "ÁÉÍÓÚÝáéíóúý" + "ČčĎďĚěŇňŘřŠšŤťŮůŽž" + "\u00a0–—‘’“”„…·→←↓↗×";

// Static instances: two small files beat one variable file with a wide range.
const FAMILIES = [
  { file: "bricolage-600", query: "Bricolage+Grotesque:wght@600" },
  { file: "bricolage-800", query: "Bricolage+Grotesque:wght@800" },
  { file: "literata-400", query: "Literata:wght@400" },
  { file: "plex-mono-500", query: "IBM+Plex+Mono:wght@500" },
];

for (const f of FAMILIES) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${f.query}&text=${encodeURIComponent(TEXT)}`, {
      headers: { "user-agent": UA },
    })
  ).text();
  const url = css.match(/url\((https:[^)]+)\)/)?.[1];
  if (!url) throw new Error(`No font URL for ${f.file}:\n${css}`);
  const buf = Buffer.from(await (await fetch(url, { headers: { "user-agent": UA } })).arrayBuffer());
  await writeFile(`public/fonts/${f.file}.woff2`, buf);
  console.log(`${f.file}.woff2  ${(buf.length / 1024).toFixed(1)} KB`);
}

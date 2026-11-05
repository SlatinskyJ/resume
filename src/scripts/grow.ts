// The only runtime script. It runs the stitched plant that grows up the
// resume column: roots = languages + education, leaves = projects,
// buds = skills, blossom = experience. It only acts when the inline head
// script added `.play` to <html> (first visit, motion allowed, not print).

const NS = "http://www.w3.org/2000/svg";
const doc = document.documentElement;

type Attrs = Record<string, string | number>;
const el = (tag: string, attrs: Attrs, parent?: Element) => {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  parent?.appendChild(e);
  return e;
};
const setD = (e: Element, d: number | string) => (e as SVGElement | HTMLElement).style.setProperty("--d", `${d}s`);

/** y of `e` relative to `anc`, unaffected by transforms. */
const rel = (e: Element | null, anc: Element) => {
  let y = 0;
  let n = e as HTMLElement | null;
  while (n && n !== anc) {
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return y;
};

function plant(main: HTMLElement, start: number) {
  const H = main.offsetHeight;
  const X = 26;
  const small = main.offsetWidth < 500;
  const sc = small ? 0.62 : 1;
  // Where the growing tip travels on screen: halfway between the column top and the screen bottom.
  const M = main.getBoundingClientRect().top;
  const D = Math.max(120, (innerHeight - M) * 0.5);
  const v = small ? 560 : 420; // px per second
  const total = H / v;
  const slide = Math.max(0, (H - D) / v);
  const at = (y: number) => (start + (H - Math.max(0, Math.min(H, y))) / v).toFixed(2);

  const sv = el("svg", { class: "plant", viewBox: `0 0 52 ${H}`, preserveAspectRatio: "none", "aria-hidden": "true" });
  main.prepend(sv);

  // Stem: gentle wave, ±9 px every 120 px, drawn bottom to top.
  let d = `M${X},${H}`;
  for (let y = H, k = 0; y > 4; y -= 120, k++) {
    const y2 = Math.max(4, y - 120);
    const w = (k % 2 ? 9 : -9) * sc;
    d += ` C${X - w},${y - 40} ${X + w},${y2 + 40} ${X},${y2}`;
  }
  const mask = el("mask", { id: "stem", maskUnits: "userSpaceOnUse", x: -200, y: -200, width: 500, height: H + 400 }, el("defs", {}, sv));
  const reveal = el("path", { d, class: "preveal" }, mask) as SVGPathElement;
  const L = Math.ceil(reveal.getTotalLength()) + 4;
  reveal.style.cssText = `--len:${L};--d:${start}s;--dur:${total}s`;
  el("path", { d, class: "stem", mask: "url(#stem)" }, sv);

  const orn = (y: number, origin: string, paths: [string, string?, string?][]) => {
    const g = el("g", { class: "bl" }, el("g", { transform: `translate(${X},${y}) scale(${sc})` }, sv)) as SVGGElement;
    g.style.cssText = `--d:${at(y)}s;--o:${origin}`;
    for (const [pd, cls = "orn", tf] of paths) el("path", tf ? { d: pd, class: cls, transform: tf } : { d: pd, class: cls }, g);
  };

  const secs = [...main.querySelectorAll(":scope>section")];
  // Roots
  orn(H, "50% 0", [
    ["M0,0 C-4,14 -14,20 -22,32 M0,0 C2,16 -2,26 0,40 M0,0 C6,12 16,20 24,30 M-10,18 C-16,20 -22,18 -28,14 M12,16 C18,18 24,16 30,12 M-1,26 C-6,30 -8,36 -10,44"],
  ]);
  // Leaf pair at languages + education
  orn(rel(secs[3], main) + 14, "50% 100%", [
    ["M0,0 C-8,-10 -22,-12 -30,-4 C-22,4 -8,4 0,0Z", "orn fill"],
    ["M0,0 C8,-10 22,-12 30,-4 C22,4 8,4 0,0Z", "orn fill"],
  ]);
  // One leaf per project card
  secs[2].querySelectorAll(".proj").forEach((p, i) => {
    const s = i % 2 ? -1 : 1;
    orn(rel(p, main) + 30 + (small ? 0 : i * 60), `${s > 0 ? "0" : "100%"} 50%`, [
      [`M0,0 C${s * 10},-16 ${s * 34},-20 ${s * 46},-6 C${s * 34},8 ${s * 10},8 0,0Z`, "orn fill"],
      [`M${s * 4},-1 C${s * 16},-6 ${s * 28},-8 ${s * 40},-6`],
    ]);
  });
  // One closed bud per skill group
  secs[1].querySelectorAll(".skills>div").forEach((row, i) => {
    const s = i % 2 ? 1 : -1;
    orn(rel(row, main) + 20, `${s > 0 ? "0" : "100%"} 100%`, [
      [`M0,0 C${s * 8},-4 ${s * 16},-10 ${s * 20},-20`],
      ["M0,0 C-6,-3 -7,-12 0,-20 C7,-12 6,-3 0,0Z", "orn fill", `translate(${s * 20},-20) rotate(${s * 30})`],
    ]);
  });
  // Blossom at the top
  orn(4, "50% 100%", [
    ["M0,0 C-18,-4 -24,-30 -16,-50 C-10,-40 -5,-37 0,-52 C5,-37 10,-40 16,-50 C24,-30 18,-4 0,0Z", "orn fill"],
    ["M0,-8 C-8,-12 -10,-26 -6,-34 M0,-8 C8,-12 10,-26 6,-34 M0,-8 L0,-40"],
    ["M-22,-8 C-30,-10 -36,-6 -40,2 C-32,4 -26,0 -22,-8Z M22,-8 C30,-10 36,-6 40,2 C32,4 26,0 22,-8Z", "orn fill"],
  ]);

  // Each item appears when the tip passes its vertical centre.
  main.querySelectorAll<HTMLElement>(".gi").forEach((e) => setD(e, at(rel(e, main) + e.offsetHeight / 2)));
  main.querySelectorAll(".tl .x").forEach((e) => setD(e, at(rel(e.closest("li"), main) + 11)));

  // The column slides down at the tip's speed, so the tip stays on screen.
  if (slide > 0)
    main.animate([{ transform: `translateY(${D - H}px)` }, { transform: "none" }], {
      duration: slide * 1000,
      delay: start * 1000,
      easing: "linear",
      fill: "backwards",
    });
  main.classList.add("grow");
}

/** Phone: the centred hero shrinks into a compact header (FLIP). */
function compact(site: HTMLElement) {
  const els = [...site.querySelectorAll<HTMLElement>(".hero .wreath,.hero h1,.hero .role,.hero .sum,.hero .contact")];
  const first = els.map((e) => e.getBoundingClientRect());
  doc.classList.add("compact");
  els.forEach((e, i) => {
    const last = e.getBoundingClientRect();
    const s = i === 0 ? first[i].width / last.width : i < 3 ? first[i].height / last.height : 1;
    e.animate(
      [
        { transformOrigin: "0 0", transform: `translate(${first[i].left - last.left}px,${first[i].top - last.top}px) scale(${s})` },
        { transformOrigin: "0 0", transform: "none" },
      ],
      { duration: 750, easing: "cubic-bezier(.65,0,.25,1)" },
    );
  });
}

export function grow() {
  if (!doc.classList.contains("play")) return;
  doc.classList.add("grown");
  const site = document.querySelector<HTMLElement>(".site")!;
  const main = document.getElementById("main")!;
  const run = () => {
    if (site.offsetWidth >= 760) plant(main, 2.6);
    else setTimeout(() => (compact(site), plant(main, 0.75)), 1650);
  };
  // Measure with final fonts so positions match what the reader sees.
  document.fonts.ready.then(run);
}

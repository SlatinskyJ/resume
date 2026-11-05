// Build-time geometry for the stitched ornaments. Everything here runs in
// Astro at build, so the browser receives plain inline SVG with the reveal
// lengths and delays already written in.

/** Motif outlines in a 22×22 box, used as timeline markers. */
export const MARKERS = {
  tulip: "M11,19 C3,17 2,8 5,3 C7,6 9,7 11,3 C13,7 15,6 17,3 C20,8 19,17 11,19Z",
  rosette: "M11,3 a8,8 0 1 1 -0.01,0Z M11,8 a3,3 0 1 1 -0.01,0Z",
  heart: "M11,19 C1,12 2,4 7,4 C9,4 10,5 11,7 C12,5 13,4 15,4 C20,4 21,12 11,19Z",
  sprig: "M11,21 L11,10 M11,12 C7,12 4,9 4,5 C8,5 11,8 11,12 M11,12 C15,12 18,9 18,5 C14,5 11,8 11,12",
} as const;

export type Marker = keyof typeof MARKERS;

/** Zigzag stitch from the centre (x=500) outward in one direction, viewBox 1000×26. */
export function zigzag(dir: 1 | -1) {
  let d = "M500,13";
  for (let x = 0; x < 500; x += 16) d += ` L${500 + dir * (x + 8)},5 L${500 + dir * (x + 16)},13`;
  // 32 teeth × 2 diagonal segments of √(8²+8²)
  return { d, len: Math.ceil(64 * Math.hypot(8, 8)) + 2 };
}

export const WREATH = { C: 130, R: 96, T0: 0.15, DUR: 1.25 } as const;

/** Twelve motifs round the ring; delays follow the thread from the top down both sides. */
export function wreathMotifs() {
  const { C, R, T0, DUR } = WREATH;
  return Array.from({ length: 12 }, (_, k) => {
    const deg = k * 30;
    const a = ((deg - 90) * Math.PI) / 180;
    return {
      x: +(C + Math.cos(a) * R).toFixed(1),
      y: +(C + Math.sin(a) * R).toFixed(1),
      deg,
      tulip: k % 2 === 0,
      delay: +(T0 + (Math.min(deg, 360 - deg) / 180) * DUR).toFixed(2),
    };
  });
}

export const WREATH_TULIP =
  "M0,0 C-11,-3 -13,-19 -9,-30 C-6,-24 -3,-22 0,-30 C3,-22 6,-24 9,-30 C13,-19 11,-3 0,0Z";
export const WREATH_TULIP_INNER = "M0,-6 C-4,-9 -5,-15 -3,-19 M0,-6 C4,-9 5,-15 3,-19";

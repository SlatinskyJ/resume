import type { NextConfig } from "next";

// Static export so the site can live anywhere: GitHub Pages today,
// a sub-path of a family "shell" site (slatinsky.cz) later.
// Set NEXT_PUBLIC_BASE_PATH=/jakub when mounting under a path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const config: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default config;

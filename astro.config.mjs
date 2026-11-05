// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jakub.slatinsky.cz",
  trailingSlash: "ignore",
  build: {
    // One small stylesheet, inlined: no render-blocking CSS request.
    inlineStylesheets: "always",
    format: "directory",
  },
  prefetch: false,
  devToolbar: { enabled: false },
});

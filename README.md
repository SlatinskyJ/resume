# resume

Jakub Slatinský's resume site: a static Astro page with a stitched folk-embroidery
theme, a detailed page on my AI workflow, and a one-page PDF generated on every deploy.

Live at **jakub.slatinsky.cz** (Cloudflare Pages).

## Stack

- **Astro** static output. The only JavaScript is the small plant-growth script on
  the home page (~1.7 KB gzipped), inlined as a module. CSS is inlined too.
- **CSS + SVG animation.** Borders, the portrait wreath and the plant are drawn as
  SVG paths revealed with masks. Timing values are computed at build time.
  The intro only plays on the first visit in a tab, and never with reduced motion or in print.
- **Self-hosted fonts** (Bricolage Grotesque, Literata, IBM Plex Mono), subset to
  Latin + Czech, ~66 KB in total.
- **Native cross-document view transitions** between the resume and the AI page.
- **Print stylesheet** renders the resume as one A4 page, which becomes `resume.pdf`.

## Content

All resume text is in `src/content/resume/en.json`, validated by the schema in
`src/content.config.ts`. The AI workflow page is `src/pages/ai-setup.astro`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Build to `dist/` |
| `npm run pdf` | Render `dist/resume.pdf` from the print stylesheet; fails unless it is exactly 1 page |
| `npm run budget` | Fail if first load ≥ 120 KB or the grow script > 2 KB gzipped |
| `node scripts/fonts.mjs` | Re-download the font subsets into `public/fonts/` |

`pdf` and `budget` use Playwright's Chromium (`CHROMIUM_PATH` overrides the binary).

## Deploy

`.github/workflows/deploy.yml` builds, renders the PDF and checks the budget on
every PR. Pushes to `main` deploy `dist/` to the Cloudflare Pages project
`jakub-resume`. It needs the repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

## Later: slatinsky.cz shell

The site is self-contained static files with root-relative paths, so a future
family shell on slatinsky.cz can mount it as-is (its own subdomain, or a reverse-proxy
route) without changing the build.

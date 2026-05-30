# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`marcoledesma.com` — a static personal site (blog + projects) built with **Astro 5 + MDX**. No JS framework, no Tailwind; plain scoped CSS with design tokens. Astro ships zero client JS by default.

## Commands

```bash
npm run dev        # dev server at http://localhost:4321, hot reload
npm run build      # static build to dist/
npm run preview    # serve the built dist/ locally
npm run post:new -- "Post Title" [--draft]   # scaffold src/content/blog/<slug>.mdx
npm run post:publish                          # build + commit "chore: publish site" + push
```

There is no test suite and no linter configured. "Verifying a change" means `npm run build` succeeds and the page looks right in `npm run dev`.

## Architecture

Two typed content collections drive everything (`src/content/config.ts`, Zod schemas):

- **`blog`** — MDX posts in `src/content/blog/`. `draft: true` hides a post from listings, the RSS feed, and `getStaticPaths` (filtered everywhere via `getCollection('blog', ({data}) => !data.draft)`). `canonicalURL` points the `<link rel=canonical>` *out* to an external original (used during the dev.to migration); the post footer auto-renders an "originally published at" line when it's set.
- **`projects`** — MDX in `src/content/projects/`. `featured` and `order` control home-page rendering.

Page wiring:
- `src/pages/{blog,projects}/[...slug].astro` — dynamic routes; `getStaticPaths` maps collection entries to pages and `await entry.render()` produces the `<Content />`.
- `src/pages/rss.xml.js` — RSS feed, also draft-filtered.
- `BaseLayout.astro` is the single layout — owns all `<head>` meta (OG/Twitter/canonical built from `Astro.site`), the inline theme-flash-prevention script, and wraps `Nav` + `Footer`. Every page passes `title`/`description`/`canonical` props to it.
- Site metadata, nav items, and social links are centralized in `src/config.ts` — edit there, not in components.

## Conventions specific to this repo

- **Design tokens live in `src/styles/global.css` `:root`.** Every color/font/spacing flows from CSS variables (`--accent`, `--ink`, `--font-sans`, etc.). Change `--accent` once and the whole site follows. Component styles are scoped `<style>` blocks inside each `.astro` file. Dark mode is a manual toggle (`Nav.astro` writes `data-theme` to `localStorage` and `<html>`) layered over a `prefers-color-scheme` default.
- **Emphasis uses `<span class="accent">`, not `<em>`** — the accent pattern is bold + accent color, deliberately not italic.
- Typeface pairing: **Geist** (headings + body, weight contrast does the work) and **JetBrains Mono** (labels, dates, code). Syntax highlighting is Shiki, theme `rose-pine-moon` (set in `astro.config.mjs`).

## Deploy & the base-path gotcha

Deploys to **GitHub Pages** via `.github/workflows/deploy.yml` on push to `main`. Because Pages serves from a subdirectory, `astro.config.mjs` sets `base: '/marcoledesma-site/'`.

⚠️ Internal links across the site are hardcoded absolute strings (`href="/blog"`, `/favicon.svg`, `/rss.xml`, etc.) — Astro does **not** rewrite these to include `base`, so they break under the Pages subpath. If you touch navigation or asset links, prefix with `import.meta.env.BASE_URL` (or remove the `base` if/when the site moves to a root domain like the `site: 'https://marcoledesma.com'` value already configured). The README still documents Cloudflare/Netlify as the "recommended" target — actual CI deploys to GitHub Pages.

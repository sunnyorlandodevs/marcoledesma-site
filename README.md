# marcoledesma.com

A static site built with [Astro](https://astro.build/), MDX content, and a
deliberate editorial aesthetic. Replaces the old WordPress site.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:4321>. The dev server has hot reload for content,
components, and styles.

## Stack

- **Astro 5** with MDX for content
- **Content Collections** (typed via Zod) for blog posts and projects
- **Shiki** for syntax highlighting (theme: `rose-pine-moon`)
- **No JS framework** — Astro ships zero JavaScript to the client by default. If
  you eventually need React or Vue islands, add them via `npx astro add react`.
- **CSS only** — no Tailwind. Design tokens live in
  `src/styles/global.css`. Component-scoped styles live with the components.

## Structure

```
src/
├── components/         # Reusable .astro components (Nav, Footer, cards)
├── content/
│   ├── config.ts       # Zod schemas for collections — edit to add fields
│   ├── blog/           # MDX blog posts
│   └── projects/       # MDX project entries
├── layouts/
│   └── BaseLayout.astro # Meta tags, header, footer, prose styles
├── pages/
│   ├── index.astro     # Home
│   ├── about.astro
│   ├── rss.xml.js
│   ├── blog/
│   │   ├── index.astro     # Listing
│   │   └── [...slug].astro # Dynamic post route
│   └── projects/
│       ├── index.astro
│       └── [...slug].astro
├── styles/
│   └── global.css      # Design tokens + base + prose
└── config.ts           # Site metadata, nav, social links
```

## Design tokens

Edit `src/styles/global.css`. Every color, font, and spacing decision flows from
the `:root` variables. Dark mode is opt-in via `prefers-color-scheme` and can be
disabled by removing the `@media` block.

The typeface pairing is:

- **Geist** — headings AND body. One family, weight contrast doing the work
  (400 body / 600 strong / 700 headings / 800 accent).
- **JetBrains Mono** — labels, dates, code

Accent text uses `<span class="accent">` (not `<em>`) — sans-serif italic
generally looks worse than just bumping weight and color, so the accent
pattern is `font-weight: 700-800; color: var(--accent);` instead.

If you ever want to swap the accent color, change `--accent` in
`global.css` and everything will follow.

## Adding a blog post

Create `src/content/blog/your-slug.mdx`:

```mdx
---
title: "Your title"
description: "One-line summary that shows up in social previews and on the index."
pubDate: 2026-05-24
tags: ["laravel", "career"]
# Optional — set if cross-posting to dev.to and you want the original to be canonical
canonicalURL: "https://dev.to/m4rcoperuano/your-post"
---

Your content. Markdown + JSX components if you need them.
```

Setting `draft: true` in frontmatter hides the post from listings.

## Adding a project

Create `src/content/projects/your-slug.mdx`. See existing entries for the
shape. `featured: true` styles the card in the dark variant on the home page.

## Cross-posting to dev.to

Recommended approach: write the post here as the canonical source, then
syndicate to dev.to with the canonical URL set in dev.to's frontmatter
pointing back to your post. This way you keep the SEO juice and dev.to
becomes the mirror, not the other way around.

The existing `daily-standups-for-devs.mdx` is set up the opposite way
(canonical pointing OUT to dev.to) for the initial migration. Flip the
direction once you've moved everything over.

## Deploying

### Cloudflare Pages (recommended)

1. Push this repo to GitHub.
2. Cloudflare Pages → Create a project → Connect to GitHub.
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Add a custom domain pointing to `marcoledesma.com`.

Free tier covers anything a personal site will throw at it. Edge cached
globally. Zero config beyond the above.

### Netlify

Same idea: connect repo, `npm run build`, output to `dist`. Both work.

### Other notes

- `astro.config.mjs` has `site: 'https://marcoledesma.com'` — update if your
  final domain is different. The sitemap and RSS feed both depend on it.
- The sitemap is generated automatically at `/sitemap-index.xml`.

## What's not included (yet)

- **An actual photo** — replace the `.portrait` block on the home page (and
  the `<h1>M.L.</h1>` placeholder on /about if you build one) with a real
  image. Put the file in `public/` and reference it as `/your-photo.jpg`.
- **OG image generation** — there's a placeholder reference to `/og-default.png`
  in the layout. Either drop a static image at `public/og-default.png` or set
  up dynamic OG images later with `@vercel/og` or similar.
- **The remaining three dev.to posts** — only "Daily Stand Ups for Devs" is
  ported as a starter. Add the other three when you're ready, or import them
  in bulk using dev.to's API (`https://dev.to/api/articles/me`).

## License

The code in this repo is yours. The content (writing, project descriptions,
photos) is yours.

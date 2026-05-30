import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Keystatic admin runs only in local dev (the `dev` npm script sets this
// flag). Production builds for GitHub Pages stay pure static — no React,
// no server routes, no adapter.
const enableKeystatic = process.env.ENABLE_KEYSTATIC === 'true';

const keystaticIntegrations = enableKeystatic
  ? await (async () => {
      const react = (await import('@astrojs/react')).default;
      const keystatic = (await import('@keystatic/astro')).default;
      return [react(), keystatic()];
    })()
  : [];

// https://astro.build/config
export default defineConfig({
  site: 'https://marcoledesma.com',
  base: '/',
  integrations: [mdx(), sitemap(), ...keystaticIntegrations],
  markdown: {
    shikiConfig: {
      theme: 'rose-pine-moon',
      wrap: true,
    },
  },
});

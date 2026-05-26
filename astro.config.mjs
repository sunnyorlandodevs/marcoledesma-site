import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://marcoledesma.com',
  base: '/marcoledesma-site/',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'rose-pine-moon',
      wrap: true,
    },
  },
});

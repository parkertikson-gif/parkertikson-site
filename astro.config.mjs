import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  markdown: {
    smartypants: false,
  },
  integrations: [mdx({ smartypants: false })],
});

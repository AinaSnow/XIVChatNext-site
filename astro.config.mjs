import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ainasnow.github.io',
  base: '/XIVChatNext-site',
  // Keep the published URLs (guide.html, zh/index.html) from the hand-written site.
  build: { format: 'preserve' },
});

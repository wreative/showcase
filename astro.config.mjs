import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://showcase.wreative.com',
  integrations: [tailwind({ applyBaseStyles: false })],
});

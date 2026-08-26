import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://showcase.wreative.com',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    AstroPWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest: {
        name: 'Wreative Showcase',
        short_name: 'Wreative',
        description:
          'Portfolio showcase of website and mobile application projects by Wreative creative agency.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          { src: '/assets/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/assets/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/assets/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{html,css,js,json,ico,png,svg,webp,woff2}'],
      },
    }),
  ],
});

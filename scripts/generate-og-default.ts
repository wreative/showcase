import { resolve } from 'node:path';
import sharp from 'sharp';

const width = 1200;
const height = 630;

const logoPath = resolve(import.meta.dirname, '../src/assets/wreative-light.png');
const logo = sharp(logoPath).resize({ height: 240 });

const svg = Buffer.from(
  `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#0a0a0a"/>
  <text x="600" y="460" text-anchor="middle" font-family="sans-serif" font-size="52" font-weight="700" fill="#ffffff">Wreative Showcase</text>
  <text x="600" y="520" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#a1a1aa">Website &amp; Mobile App Portfolio</text>
</svg>`
);

const logoBuffer = await logo.toBuffer();
const logoMeta = await sharp(logoBuffer).metadata();

await sharp({
  create: { width, height, channels: 4, background: '#0a0a0a' },
})
  .composite([
    { input: svg, top: 0, left: 0 },
    {
      input: logoBuffer,
      top: Math.round(120 - (logoMeta.height ?? 240) / 2),
      left: Math.round((width - (logoMeta.width ?? 0)) / 2),
    },
  ])
  .png()
  .toFile(resolve(import.meta.dirname, '../public/assets/og-default.png'));

console.log('Generated public/assets/og-default.png (1200x630)');

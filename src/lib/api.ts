// Shared helpers for the static JSON file endpoints in src/pages/api.
// The site uses Astro's static output mode, so these endpoints are prerendered
// into .json files at build time — no server adapter and no extra packages needed.

import { type GalleryItem, type PortfolioItem } from '@/data/portfolio/types';
import { getCoverImage } from '@/lib/covers';

export const SITE_URL = 'https://showcase.wreative.com';

const isExternalUrl = (path: string): boolean => /^https?:\/\//i.test(path);

// Media stored in portfolio data as "/assets/cover/*.webp" only becomes a public
// URL through Astro's image pipeline (see getCoverImage). External media (e.g. the
// demo video) is returned unchanged. In `astro dev` the resolved URLs still point
// at the production site, matching the JSON-LD behavior of the existing pages.
function resolveMediaUrl(path: string): string {
  if (isExternalUrl(path)) return path;
  if (path.startsWith('/assets/cover/')) return new URL(getCoverImage(path).src, SITE_URL).href;
  return new URL(path, SITE_URL).href;
}

function resolveGallery(gallery: GalleryItem[]): GalleryItem[] {
  return gallery.map((item): GalleryItem => {
    const src = resolveMediaUrl(item.src);
    return item.type === 'video'
      ? { ...item, src, ...(item.poster ? { poster: resolveMediaUrl(item.poster) } : {}) }
      : { ...item, src };
  });
}

// Portfolio item with every local media path resolved to an absolute public URL.
export function serializePortfolioItem(item: PortfolioItem): PortfolioItem {
  return {
    ...item,
    image: resolveMediaUrl(item.image),
    gallery: resolveGallery(item.gallery),
  };
}

// Frequency map, e.g. countBy(portfolios, (item) => item.category).
export function countBy<T>(items: T[], getKey: (item: T) => string): Record<string, number> {
  return items.reduce<Record<string, number>>((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

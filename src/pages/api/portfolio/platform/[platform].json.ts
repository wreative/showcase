import type { APIRoute } from 'astro';
import { portfolios } from '@/data/portfolio';
import { json, serializePortfolioItem } from '@/lib/api';

export function getStaticPaths() {
  const platforms = [...new Set(portfolios.map((item) => item.platform))];
  return platforms.map((platform) => ({ params: { platform } }));
}

// GET /api/portfolio/platform/<platform>.json
//
// Portfolio items filtered by platform, prerendered to
// dist/api/portfolio/platform/<platform>.json for every platform (web, mobile).
export const GET: APIRoute = ({ params }) => {
  const items = portfolios.filter((item) => item.platform === params.platform);

  return json({
    success: true,
    meta: { total: items.length, platform: params.platform },
    data: items.map(serializePortfolioItem),
  });
};

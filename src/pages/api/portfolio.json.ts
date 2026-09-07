import type { APIRoute } from 'astro';
import { portfolios } from '@/data/portfolio';
import { countBy, json, serializePortfolioItem, SITE_URL } from '@/lib/api';

// GET /api/portfolio.json
//
// Full portfolio collection, mirroring src/data/portfolio with every local media
// path resolved to its absolute public URL. Static file endpoint: prerendered to
// dist/api/portfolio.json at build time (no server or extra packages needed).
export const GET: APIRoute = () => {
  const categories = [...new Set(portfolios.map((item) => item.category))].sort((a, b) =>
    a.localeCompare(b)
  );

  const categoryCounts = Object.fromEntries(
    categories.map((category) => [
      category,
      portfolios.filter((item) => item.category === category).length,
    ])
  );

  return json({
    success: true,
    meta: {
      total: portfolios.length,
      platforms: countBy(portfolios, (item) => item.platform),
      categories: categoryCounts,
      endpoints: [
        `${SITE_URL}/api/portfolio.json`,
        `${SITE_URL}/api/portfolio/<slug>.json`,
        `${SITE_URL}/api/categories.json`,
        `${SITE_URL}/api/portfolio/category/<category>.json`,
        `${SITE_URL}/api/portfolio/platform/<platform>.json`,
      ],
    },
    data: portfolios.map(serializePortfolioItem),
  });
};

import type { APIRoute } from 'astro';
import { portfolios } from '@/data/portfolio';
import { countBy, json } from '@/lib/api';

// GET /api/categories.json
//
// Portfolio categories with per-platform totals, prerendered to
// dist/api/categories.json at build time.
export const GET: APIRoute = () => {
  const categories = [...new Set(portfolios.map((item) => item.category))].sort((a, b) =>
    a.localeCompare(b)
  );

  return json({
    success: true,
    meta: { total: categories.length },
    data: categories.map((category) => {
      const items = portfolios.filter((item) => item.category === category);
      return {
        name: category,
        total: items.length,
        platforms: countBy(items, (item) => item.platform),
      };
    }),
  });
};

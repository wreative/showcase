import type { APIRoute } from 'astro';
import { portfolios } from '@/data/portfolio';
import { json, serializePortfolioItem } from '@/lib/api';

export function getStaticPaths() {
  const categories = [...new Set(portfolios.map((item) => item.category))];
  return categories.map((category) => ({ params: { category } }));
}

// GET /api/portfolio/category/<category>.json
//
// Portfolio items filtered by category, prerendered to
// dist/api/portfolio/category/<category>.json for every category.
export const GET: APIRoute = ({ params }) => {
  const items = portfolios.filter((item) => item.category === params.category);

  return json({
    success: true,
    meta: { total: items.length, category: params.category },
    data: items.map(serializePortfolioItem),
  });
};

import type { APIRoute } from 'astro';
import { portfolios, type PortfolioItem } from '@/data/portfolio';
import { json, serializePortfolioItem } from '@/lib/api';

interface EndpointProps {
  item: PortfolioItem;
}

export function getStaticPaths() {
  return portfolios.map((item) => ({
    params: { slug: item.slug },
    props: { item },
  }));
}

// GET /api/portfolio/<slug>.json
//
// A single portfolio item by slug, prerendered to dist/api/portfolio/<slug>.json
// for every project (same slug as the /project/<slug> pages).
export const GET: APIRoute<EndpointProps> = ({ params, props }) => {
  const { item } = props;

  // Unreachable in static output (unknown slugs are never prerendered), but keeps
  // the endpoint correct if an SSR adapter is added later.
  if (!item) {
    return json({ success: false, error: `Portfolio "${params.slug}" not found` }, 404);
  }

  return json({
    success: true,
    data: serializePortfolioItem(item),
  });
};

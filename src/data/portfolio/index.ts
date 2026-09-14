import { websitePortfolios } from './websites';
import { mobilePortfolios } from './mobiles';
import { type PortfolioItem, sortByPrimaryDomainLast, toSlug } from './types';
import { webAppPortfolios } from './web-apps';

const raw = [...websitePortfolios, ...mobilePortfolios, ...webAppPortfolios];

export const portfolios: PortfolioItem[] = sortByPrimaryDomainLast(
  raw.map((entry, index) => ({
    id: index + 1,
    slug: toSlug(entry.title),
    ...entry,
  }))
);

// Re-export only what's consumed externally
export type { PortfolioItem } from './types';

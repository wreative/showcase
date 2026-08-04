import { websitePortfolios } from "./websites";
import { mobilePortfolios } from "./mobiles";
import { type PortfolioItem, sortByPrimaryDomainLast } from "./types";

const raw = [...websitePortfolios, ...mobilePortfolios];

export const portfolios: PortfolioItem[] = sortByPrimaryDomainLast(
  raw.map((entry, index) => ({ id: index + 1, ...entry })),
);

// Re-export everything for convenience
export type { Platform, PortfolioItem, GalleryItem, GalleryImage, GalleryVideo } from "./types";
export { PortfolioCategory, img, vid, entry, PRIMARY_DOMAIN } from "./types";

export type Platform = "website" | "mobile";

export enum PortfolioCategory {
  SERVICES = "Services",
  BUSINESS = "Business",
  EDUCATION = "Education",
  ECOMMERCE = "E-Commerce",
  GOVERNMENT = "Government",
  FLORIST = "Florist & Gardening",
}

export interface GalleryImage {
  type: "image";
  src: string;
}

export interface GalleryVideo {
  type: "video";
  src: string;
  poster?: string;
}

export type GalleryItem = GalleryImage | GalleryVideo;

export interface PortfolioItem {
  id: number;
  title: string;
  platform: Platform;
  category: PortfolioCategory;
  image: string;
  url: string;
  description: string;
  tags: string[];
  gallery: GalleryItem[];
}

// -- Helpers --

export const img = (src: string): GalleryImage => ({ type: "image", src });

export const vid = (src: string, poster?: string): GalleryVideo => ({
  type: "video",
  src,
  poster,
});

export const entry = (
  title: string,
  platform: Platform,
  category: PortfolioCategory,
  image: string,
  url: string,
  description: string,
  tags: string[],
  gallery: GalleryItem[] = [],
): Omit<PortfolioItem, "id"> => ({
  title,
  platform,
  category,
  image,
  url,
  description,
  tags,
  gallery: gallery.length > 0 ? gallery : [img(image)],
});

// Domain always pushed to the end of the listing.
export const PRIMARY_DOMAIN = "wreative.com";

export const isPrimaryDomain = (url: string): boolean =>
  url.includes(PRIMARY_DOMAIN);

export const sortByPrimaryDomainLast = (
  entries: PortfolioItem[],
): PortfolioItem[] =>
  [...entries].sort(
    (a, b) => Number(isPrimaryDomain(a.url)) - Number(isPrimaryDomain(b.url)),
  );

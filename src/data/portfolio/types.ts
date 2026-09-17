export type Platform = 'website' | 'mobile' | 'web-app';

export enum PortfolioCategory {
  SERVICES = 'Services',
  BUSINESS = 'Business',
  EDUCATION = 'Education',
  ECOMMERCE = 'E-Commerce',
  GOVERNMENT = 'Government',
  FLORIST = 'Florist & Gardening',
  LIFESTYLE = 'Lifestyle & Entertainment',
  FOOD = 'Food & Beverage',
  HEALTH = 'Health & Wellness',
  TRAVEL = 'Travel & Tourism',
  FINANCE = 'Finance & Banking',
  TECHNOLOGY = 'Technology & Software',
  OTHER = 'Other',
}

export interface GalleryImage {
  type: 'image';
  src: string;
}

export interface GalleryVideo {
  type: 'video';
  src: string;
  poster?: string;
}

export interface GalleryLottie {
  type: 'lottie';
  /**
   * Path to the Lottie JSON file.
   * Local files live under /assets/lottie/ (served from public/).
   * External URLs (https://...) are also supported.
   */
  src: string;
  /** Whether the animation loops. Defaults to `true`. */
  loop?: boolean;
  /** Whether the animation autoplays on init. Defaults to `true`. */
  autoplay?: boolean;
}

export type GalleryItem = GalleryImage | GalleryVideo | GalleryLottie;

export interface PortfolioItem {
  id: number;
  slug: string;
  title: string;
  platform: Platform;
  category: PortfolioCategory;
  image: string;
  url: string;
  description: string;
  /** Indonesian translation of the description (client-side language switcher). */
  descriptionId?: string;
  tags: string[];
  gallery: GalleryItem[];
  playStoreUrl?: string;
  appStoreUrl?: string;
}

export const toSlug = (title: string): string =>
  title
    .toLowerCase()
    .split('')
    .map((char) => (/[a-z0-9]/.test(char) ? char : '-'))
    .join('')
    .split('-')
    .filter(Boolean)
    .join('-');

// -- Helpers --

export const img = (src: string): GalleryImage => ({ type: 'image', src });

export const vid = (src: string, poster?: string): GalleryVideo => ({
  type: 'video',
  src,
  poster,
});

export const lottie = (
  src: string,
  options?: { loop?: boolean; autoplay?: boolean }
): GalleryLottie => ({
  type: 'lottie',
  src,
  loop: options?.loop ?? true,
  autoplay: options?.autoplay ?? true,
});

export interface PortfolioEntryInput {
  title: string;
  platform: Platform;
  category: PortfolioCategory;
  image: string;
  url: string;
  /** English description (default language). */
  description: string;
  /** Indonesian description, shown when the user switches language to ID. */
  descriptionId?: string;
  tags: string[];
  gallery?: GalleryItem[];
  playStoreUrl?: string;
  appStoreUrl?: string;
}

export const entry = ({
  title,
  platform,
  category,
  image,
  url,
  description,
  descriptionId,
  tags,
  gallery,
  playStoreUrl,
  appStoreUrl,
}: PortfolioEntryInput): Omit<PortfolioItem, 'id' | 'slug'> => ({
  title,
  platform,
  category,
  image,
  url,
  description,
  descriptionId,
  tags,
  gallery: gallery && gallery.length > 0 ? gallery : [img(image)],
  playStoreUrl,
  appStoreUrl,
});

// Domain always pushed to the end of the listing.
const PRIMARY_DOMAIN = 'wreative.com';

const isPrimaryDomain = (url: string): boolean => url.includes(PRIMARY_DOMAIN);

export const sortByPrimaryDomainLast = (entries: PortfolioItem[]): PortfolioItem[] =>
  [...entries].sort((a, b) => Number(isPrimaryDomain(a.url)) - Number(isPrimaryDomain(b.url)));

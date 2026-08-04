import fajarFloristCover from "../../assets/cover/fajar-florist.webp";
import waseBumiIndonesiaCover from "../../assets/cover/wase-bumi-indonesia.webp";
import firstMediaSurabayaCover from "../../assets/cover/first-media-surabaya.webp";
import kontraktorSurabayaCover from "../../assets/cover/kontraktor-surabaya.webp";
import wreativeCover from "../../assets/cover/wreative.webp";
import wreativeStoreCover from "../../assets/cover/wreative-store.webp";
import cubicleToiletCover from "../../assets/cover/cubicle-toilet.webp";
import DPUBinaMargaMusiCover from "../../assets/cover/dpu-bina-marga-musi.webp";
import adiKaryaPesonaCover from "../../assets/cover/adikarya-pesona.webp";
import homeBarakaCover from "../../assets/cover/home-baraka.webp";
import chickenExplorerCover from "../../assets/cover/chicken-explorer.webp";
import kurirPulsaCover from "../../assets/cover/kurir-pulsa.webp";
import panjiSemestaCover from "../../assets/cover/panji-semesta.webp";
import dzataLombokTransportCover from "../../assets/cover/dzata-lombok-transport.webp";
import pernikahanIni from "../../assets/cover/pernikahan-ini.webp";
import posSatpam from "../../assets/cover/pos-satpam.webp";
import toiletPortabel from "../../assets/cover/toilet-portabel.webp";
import ptModernCocoInternational from "../../assets/cover/pt-modern-coco-international.webp";
import spesialisKaranganBungaIndonesiaCover from "../../assets/cover/spesialis-karangan-bunga.webp";
import bemodeCover from "../../assets/cover/bemode.webp";
import sakpattanaJawaTimurCover from "../../assets/cover/sakpattana.webp";
import CVPutraKubotaCover from "../../assets/cover/cv-putra-kubota.webp";
import wahyuDewanagariCover from "../../assets/cover/wahyu-dewanagari.webp";
import avisoCover from "../../assets/cover/aviso.webp";
import lpkFurinkazanCover from "../../assets/cover/lpk-furinkazan.webp";
import robySaputraGrupCover from "../../assets/cover/roby-saputra-grup.webp";
import sgAcademyCover from "../../assets/cover/sg-academy.webp";

export type Platform = "website" | "mobile";

export enum TemplateCategory {
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

export interface TemplateData {
  id: number;
  title: string;
  platform: Platform;
  category: TemplateCategory;
  image: string;
  url: string;
  description: string;
  tags: string[];
  gallery: GalleryItem[];
}

const PRIMARY_DOMAIN = "wreative.com";

const img = (src: string): GalleryImage => ({ type: "image", src });
const vid = (src: string, poster?: string): GalleryVideo => ({
  type: "video",
  src,
  poster,
});

const portfolio = (
  title: string,
  platform: Platform,
  category: TemplateCategory,
  image: string,
  url: string,
  description: string,
  tags: string[],
  gallery: GalleryItem[] = [],
): Omit<TemplateData, "id"> => ({
  title,
  platform,
  category,
  image,
  url,
  description,
  tags,
  gallery: gallery.length > 0 ? gallery : [img(image)],
});

const demoVideo = "https://www.w3schools.com/html/mov_bbb.mp4";

// --- Example multi-image galleries ---
const wreativeGallery: GalleryItem[] = [
  img(wreativeCover),
  img(wreativeStoreCover),
  img(homeBarakaCover),
  img(avisoCover),
  vid(demoVideo, wreativeCover),
];

const fajarFloristGallery: GalleryItem[] = [
  img(fajarFloristCover),
  img(spesialisKaranganBungaIndonesiaCover),
  img(bemodeCover),
];

const wreativeStoreGallery: GalleryItem[] = [
  img(wreativeStoreCover),
  img(chickenExplorerCover),
  img(kurirPulsaCover),
  vid(demoVideo, wreativeStoreCover),
];

const rawTemplates: Omit<TemplateData, "id">[] = [
  portfolio(
    "Kontraktor Surabaya", "website",
    TemplateCategory.SERVICES, kontraktorSurabayaCover,
    "https://kontraktorsurabaya.wreative.com/",
    "Professional contracting services website for Surabaya region. Clean layout showcasing construction services, project portfolio, and client testimonials with easy contact integration.",
    ["WordPress", "Elementor", "SEO"],
  ),
  portfolio(
    "Wase Bumi Indonesia", "website",
    TemplateCategory.BUSINESS, waseBumiIndonesiaCover,
    "https://wasebumiindonesia.wreative.com/",
    "Corporate business website for a natural resource company. Features company profile, service offerings, and a modern design that reflects the brand's commitment to sustainability.",
    ["WordPress", "Custom Theme", "ACF"],
  ),
  portfolio(
    "Cubicle Toilet", "website",
    TemplateCategory.SERVICES, cubicleToiletCover,
    "https://cubicletoilet.wreative.com/",
    "Specialized cubicle and toilet partition services website. Product catalog with detailed specifications, project gallery, and inquiry system for commercial clients.",
    ["WordPress", "WooCommerce", "Elementor"],
  ),
  portfolio(
    "PT. Adikarya Pesona Intinusa", "website",
    TemplateCategory.EDUCATION, adiKaryaPesonaCover,
    "https://adikaryapesona.wreative.com/",
    "Educational institution website with modern design. Includes course listings, faculty profiles, online registration, and student portal integration.",
    ["WordPress", "LMS Integration", "Custom Theme"],
  ),
  portfolio(
    "Wreative Store", "website",
    TemplateCategory.ECOMMERCE, wreativeStoreCover,
    "https://store.wreative.com",
    "E-commerce storefront for digital products and services. Clean product layouts, smooth checkout experience, and integrated payment gateway. Features a product walkthrough video.",
    ["WordPress", "WooCommerce", "Payment Gateway"],
    wreativeStoreGallery,
  ),
  portfolio(
    "Home Baraka", "website",
    TemplateCategory.SERVICES, homeBarakaCover,
    "https://homebaraka.wreative.com/",
    "Property and home services platform. Features property listings, service bookings, and an intuitive search interface for potential buyers and renters.",
    ["WordPress", "Custom Post Types", "SEO"],
  ),
  portfolio(
    "Wreative", "website",
    TemplateCategory.BUSINESS, wreativeCover,
    "https://wreative.com/",
    "Main brand website for Wreative — a creative digital agency. Showcases the agency's portfolio, services, and team with a bold, modern design. Includes a brand overview video.",
    ["WordPress", "Custom Theme", "GSAP"],
    wreativeGallery,
  ),
  portfolio(
    "Fajar Florist", "website",
    TemplateCategory.FLORIST, fajarFloristCover,
    "https://fajarflorist.wreative.com/",
    "Online florist and flower arrangement business. Beautiful product displays, seasonal collections, and easy ordering system for delivery across the city.",
    ["WordPress", "WooCommerce", "Custom Theme"],
    fajarFloristGallery,
  ),
  portfolio(
    "First Media Surabaya", "website",
    TemplateCategory.SERVICES, firstMediaSurabayaCover,
    "https://firstmediasurabaya.wreative.com/",
    "Local internet service provider website for Surabaya. Service plans comparison, coverage area maps, and customer support portal.",
    ["WordPress", "Custom Forms", "SEO"],
  ),
  portfolio(
    "DPU Bina Marga Musi", "website",
    TemplateCategory.GOVERNMENT, DPUBinaMargaMusiCover,
    "https://dpubinamargamusi.wreative.com/",
    "Government public works department website. Features project transparency reports, public service announcements, and infrastructure development updates.",
    ["WordPress", "Government Theme", "Accessibility"],
  ),
  portfolio(
    "Chicken Explorer", "website",
    TemplateCategory.ECOMMERCE, chickenExplorerCover,
    "https://chickenexplorer.wreative.com/",
    "Food and culinary brand e-commerce site. Menu showcase, online ordering system, and location finder for multiple restaurant branches.",
    ["WordPress", "WooCommerce", "Maps Integration"],
  ),
  portfolio(
    "Kurir Pulsa", "website",
    TemplateCategory.ECOMMERCE, kurirPulsaCover,
    "https://kurirpulsa.wreative.com/",
    "Digital products and top-up service platform. Fast transaction processing, user dashboard, and automated order fulfillment system.",
    ["WordPress", "API Integration", "WooCommerce"],
  ),
  portfolio(
    "Panji Semesta", "website",
    TemplateCategory.BUSINESS, panjiSemestaCover,
    "https://panjisemesta.wreative.com/",
    "General trading and business company profile. Modern corporate design with service overview, partner network, and business inquiry forms.",
    ["WordPress", "Corporate Theme", "Contact Forms"],
  ),
  portfolio(
    "Dzata Lombok Transport", "website",
    TemplateCategory.SERVICES, dzataLombokTransportCover,
    "https://dzatalomboktransport.wreative.com/",
    "Transportation and travel services in Lombok. Booking system, fleet showcase, tour packages, and customer review integration.",
    ["WordPress", "Booking System", "SEO"],
  ),
  portfolio(
    "Pernikahan Ini", "website",
    TemplateCategory.SERVICES, pernikahanIni,
    "https://pernikahanini.wreative.com/",
    "Wedding services and planning platform. Vendor directories, wedding packages, gallery showcase, and planning tools for couples.",
    ["WordPress", "Custom Directory", "Forms"],
  ),
  portfolio(
    "Pos Satpam", "website",
    TemplateCategory.SERVICES, posSatpam,
    "https://possatpam.wreative.com/",
    "Security guard post and equipment supplier. Product catalog with specifications, project references, and quotation request system.",
    ["WordPress", "WooCommerce", "Catalog Theme"],
  ),
  portfolio(
    "Toilet Portabel", "website",
    TemplateCategory.SERVICES, toiletPortabel,
    "https://toiletportabel.wreative.com/",
    "Portable toilet rental and services. Product listings with pricing, event booking calendar, and service area information.",
    ["WordPress", "Booking Calendar", "SEO"],
  ),
  portfolio(
    "PT Modern Coco International", "website",
    TemplateCategory.BUSINESS, ptModernCocoInternational,
    "https://ptmoderncocointernational.wreative.com/",
    "International trading company corporate website. Global business profile, product sourcing information, and international partner network.",
    ["WordPress", "Multilingual", "Corporate Theme"],
  ),
  portfolio(
    "Spesialis Karangan Bunga Indonesia", "website",
    TemplateCategory.FLORIST, spesialisKaranganBungaIndonesiaCover,
    "https://spesialiskaranganbungaindonesia.com",
    "Specialist flower arrangement and bouquet service. Stunning product galleries, occasion-based collections, and nationwide delivery information.",
    ["WordPress", "WooCommerce", "Custom Theme"],
  ),
  portfolio(
    "BE MODE Indonesia", "website",
    TemplateCategory.ECOMMERCE, bemodeCover,
    "https://bemodeofficial.com",
    "Fashion and lifestyle e-commerce brand. Trendy product displays, lookbook galleries, size guides, and seamless checkout flow.",
    ["WordPress", "WooCommerce", "Fashion Theme"],
  ),
  portfolio(
    "SG Academy", "website",
    TemplateCategory.EDUCATION, sgAcademyCover,
    "https://sgacademy.co.id/",
    "Professional training academy website. Course catalog, instructor profiles, online enrollment, and learning management system integration.",
    ["WordPress", "LMS", "Registration System"],
  ),
  portfolio(
    "Roby Saputra Grup", "website",
    TemplateCategory.BUSINESS, robySaputraGrupCover,
    "https://robysaputragrup.com/",
    "Business group holding company profile. Multi-division overview, leadership team, and corporate achievements showcase.",
    ["WordPress", "Corporate Theme", "Multi-Site"],
  ),
  portfolio(
    "Sakpattana Jawa Timur", "website",
    TemplateCategory.BUSINESS, sakpattanaJawaTimurCover,
    "https://sakpattanajawatimur.wreative.com/",
    "Regional business branch website for East Java. Local services, regional news, and community engagement features.",
    ["WordPress", "Regional Theme", "SEO"],
  ),
  portfolio(
    "CV Putra Kubota", "website",
    TemplateCategory.BUSINESS, CVPutraKubotaCover,
    "https://cvputrakubota.wreative.com/",
    "Agricultural equipment and machinery dealer. Product catalog with specs, spare parts ordering, and service center locator.",
    ["WordPress", "Product Catalog", "Contact Forms"],
  ),
  portfolio(
    "Wahyu Dewanagari", "website",
    TemplateCategory.BUSINESS, wahyuDewanagariCover,
    "https://wahyudewanagari.wreative.com/",
    "Cultural and arts foundation website. Event calendar, gallery of cultural performances, and community program information.",
    ["WordPress", "Events Calendar", "Gallery"],
  ),
  portfolio(
    "Aviso", "website",
    TemplateCategory.BUSINESS, avisoCover,
    "https://aviso.wreative.com/",
    "Business consulting and advisory services. Service packages, consultant profiles, case studies, and client success stories.",
    ["WordPress", "Consulting Theme", "Case Studies"],
  ),
  portfolio(
    "LPK Furinkazan", "website",
    TemplateCategory.EDUCATION, lpkFurinkazanCover,
    "https://lpkfurinkazan.wreative.com/",
    "Japanese language and culture training institute. Course levels, instructor credentials, student testimonials, and Japan placement program information.",
    ["WordPress", "LMS", "Registration Forms"],
  ),
];

const isPrimaryDomain = (url: string): boolean => url.includes(PRIMARY_DOMAIN);

const sortByPrimaryDomainLast = (entries: TemplateData[]): TemplateData[] =>
  [...entries].sort(
    (a, b) => Number(isPrimaryDomain(a.url)) - Number(isPrimaryDomain(b.url)),
  );

export const templates: TemplateData[] = sortByPrimaryDomainLast(
  rawTemplates.map((entry, index) => ({ id: index + 1, ...entry })),
);

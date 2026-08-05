import fajarFloristCover from "../../../assets/cover/fajar-florist.webp";
import waseBumiIndonesiaCover from "../../../assets/cover/wase-bumi-indonesia.webp";
import firstMediaSurabayaCover from "../../../assets/cover/first-media-surabaya.webp";
import kontraktorSurabayaCover from "../../../assets/cover/kontraktor-surabaya.webp";
import wreativeCover from "../../../assets/cover/wreative.webp";
import wreativeStoreCover from "../../../assets/cover/wreative-store.webp";
import cubicleToiletCover from "../../../assets/cover/cubicle-toilet.webp";
import DPUBinaMargaMusiCover from "../../../assets/cover/dpu-bina-marga-musi.webp";
import adiKaryaPesonaCover from "../../../assets/cover/adikarya-pesona.webp";
import homeBarakaCover from "../../../assets/cover/home-baraka.webp";
import chickenExplorerCover from "../../../assets/cover/chicken-explorer.webp";
import kurirPulsaCover from "../../../assets/cover/kurir-pulsa.webp";
import panjiSemestaCover from "../../../assets/cover/panji-semesta.webp";
import dzataLombokTransportCover from "../../../assets/cover/dzata-lombok-transport.webp";
import pernikahanIni from "../../../assets/cover/pernikahan-ini.webp";
import posSatpam from "../../../assets/cover/pos-satpam.webp";
import toiletPortabel from "../../../assets/cover/toilet-portabel.webp";
import ptModernCocoInternational from "../../../assets/cover/pt-modern-coco-international.webp";
import spesialisKaranganBungaIndonesiaCover from "../../../assets/cover/spesialis-karangan-bunga.webp";
import bemodeCover from "../../../assets/cover/bemode.webp";
import sakpattanaJawaTimurCover from "../../../assets/cover/sakpattana.webp";
import CVPutraKubotaCover from "../../../assets/cover/cv-putra-kubota.webp";
import wahyuDewanagariCover from "../../../assets/cover/wahyu-dewanagari.webp";
import avisoCover from "../../../assets/cover/aviso.webp";
import lpkFurinkazanCover from "../../../assets/cover/lpk-furinkazan.webp";
import robySaputraGrupCover from "../../../assets/cover/roby-saputra-grup.webp";
import sgAcademyCover from "../../../assets/cover/sg-academy.webp";

import {
  type PortfolioItem,
  PortfolioCategory as C,
  entry,
  img,
  vid,
} from "./types";

const demoVideo = "https://www.w3schools.com/html/mov_bbb.mp4";

// --- Multi-image galleries ---

const wreativeGallery = [
  img(wreativeCover),
  img(wreativeStoreCover),
  img(homeBarakaCover),
  img(avisoCover),
  vid(demoVideo, wreativeCover),
];

const fajarFloristGallery = [
  img(fajarFloristCover),
  img(spesialisKaranganBungaIndonesiaCover),
  img(bemodeCover),
];

const wreativeStoreGallery = [
  img(wreativeStoreCover),
  img(chickenExplorerCover),
  img(kurirPulsaCover),
  vid(demoVideo, wreativeStoreCover),
];

// --- Website entries ---

export const websitePortfolios: Omit<PortfolioItem, "id">[] = [
  entry(
    "Kontraktor Surabaya",
    "website",
    C.SERVICES,
    kontraktorSurabayaCover,
    "https://kontraktorsurabaya.wreative.com/",
    "Professional contracting services website for Surabaya region. Clean layout showcasing construction services, project portfolio, and client testimonials with easy contact integration.",
    ["WordPress", "Elementor", "SEO"],
  ),
  entry(
    "Wase Bumi Indonesia",
    "website",
    C.BUSINESS,
    waseBumiIndonesiaCover,
    "https://wasebumiindonesia.wreative.com/",
    "Corporate business website for a natural resource company. Features company profile, service offerings, and a modern design that reflects the brand's commitment to sustainability.",
    ["WordPress", "Custom Theme", "ACF"],
  ),
  entry(
    "Cubicle Toilet",
    "website",
    C.SERVICES,
    cubicleToiletCover,
    "https://cubicletoilet.wreative.com/",
    "Specialized cubicle and toilet partition services website. Product catalog with detailed specifications, project gallery, and inquiry system for commercial clients.",
    ["WordPress", "WooCommerce", "Elementor"],
  ),
  entry(
    "PT. Adikarya Pesona Intinusa",
    "website",
    C.EDUCATION,
    adiKaryaPesonaCover,
    "https://adikaryapesona.wreative.com/",
    "Educational institution website with modern design. Includes course listings, faculty profiles, online registration, and student portal integration.",
    ["WordPress", "LMS Integration", "Custom Theme"],
  ),
  entry(
    "Wreative Store",
    "website",
    C.ECOMMERCE,
    wreativeStoreCover,
    "https://store.wreative.com",
    "E-commerce storefront for digital products and services. Clean product layouts, smooth checkout experience, and integrated payment gateway. Features a product walkthrough video.",
    ["WordPress", "WooCommerce", "Payment Gateway"],
    wreativeStoreGallery,
  ),
  entry(
    "Home Baraka",
    "website",
    C.SERVICES,
    homeBarakaCover,
    "https://homebaraka.wreative.com/",
    "Property and home services platform. Features property listings, service bookings, and an intuitive search interface for potential buyers and renters.",
    ["WordPress", "Custom Post Types", "SEO"],
  ),
  entry(
    "Wreative",
    "website",
    C.BUSINESS,
    wreativeCover,
    "https://wreative.com/",
    "Main brand website for Wreative — a creative digital agency. Showcases the agency's portfolio, services, and team with a bold, modern design. Includes a brand overview video.",
    ["WordPress", "Custom Theme", "GSAP"],
    wreativeGallery,
  ),
  entry(
    "Fajar Florist",
    "website",
    C.FLORIST,
    fajarFloristCover,
    "https://fajarflorist.wreative.com/",
    "Online florist and flower arrangement business. Beautiful product displays, seasonal collections, and easy ordering system for delivery across the city.",
    ["WordPress", "WooCommerce", "Custom Theme"],
    fajarFloristGallery,
  ),
  entry(
    "First Media Surabaya",
    "website",
    C.SERVICES,
    firstMediaSurabayaCover,
    "https://firstmediasurabaya.wreative.com/",
    "Local internet service provider website for Surabaya. Service plans comparison, coverage area maps, and customer support portal.",
    ["WordPress", "Custom Forms", "SEO"],
  ),
  entry(
    "DPU Bina Marga Musi",
    "website",
    C.GOVERNMENT,
    DPUBinaMargaMusiCover,
    "https://dpubinamargamusi.wreative.com/",
    "Government public works department website. Features project transparency reports, public service announcements, and infrastructure development updates.",
    ["WordPress", "Government Theme", "Accessibility"],
  ),
  entry(
    "Chicken Explorer",
    "website",
    C.ECOMMERCE,
    chickenExplorerCover,
    "https://chickenexplorer.wreative.com/",
    "Food and culinary brand e-commerce site. Menu showcase, online ordering system, and location finder for multiple restaurant branches.",
    ["WordPress", "WooCommerce", "Maps Integration"],
  ),
  entry(
    "Kurir Pulsa",
    "website",
    C.ECOMMERCE,
    kurirPulsaCover,
    "https://kurirpulsa.wreative.com/",
    "Digital products and top-up service platform. Fast transaction processing, user dashboard, and automated order fulfillment system.",
    ["WordPress", "API Integration", "WooCommerce"],
  ),
  entry(
    "Panji Semesta",
    "website",
    C.BUSINESS,
    panjiSemestaCover,
    "https://panjisemesta.wreative.com/",
    "General trading and business company profile. Modern corporate design with service overview, partner network, and business inquiry forms.",
    ["WordPress", "Corporate Theme", "Contact Forms"],
  ),
  entry(
    "Dzata Lombok Transport",
    "website",
    C.SERVICES,
    dzataLombokTransportCover,
    "https://dzatalomboktransport.wreative.com/",
    "Transportation and travel services in Lombok. Booking system, fleet showcase, tour packages, and customer review integration.",
    ["WordPress", "Booking System", "SEO"],
  ),
  entry(
    "Pernikahan Ini",
    "website",
    C.SERVICES,
    pernikahanIni,
    "https://pernikahanini.wreative.com/",
    "Wedding services and planning platform. Vendor directories, wedding packages, gallery showcase, and planning tools for couples.",
    ["WordPress", "Custom Directory", "Forms"],
  ),
  entry(
    "Pos Satpam",
    "website",
    C.SERVICES,
    posSatpam,
    "https://possatpam.wreative.com/",
    "Security guard post and equipment supplier. Product catalog with specifications, project references, and quotation request system.",
    ["WordPress", "WooCommerce", "Catalog Theme"],
  ),
  entry(
    "Toilet Portabel",
    "website",
    C.SERVICES,
    toiletPortabel,
    "https://toiletportabel.wreative.com/",
    "Portable toilet rental and services. Product listings with pricing, event booking calendar, and service area information.",
    ["WordPress", "Booking Calendar", "SEO"],
  ),
  entry(
    "PT Modern Coco International",
    "website",
    C.BUSINESS,
    ptModernCocoInternational,
    "https://ptmoderncocointernational.wreative.com/",
    "International trading company corporate website. Global business profile, product sourcing information, and international partner network.",
    ["WordPress", "Multilingual", "Corporate Theme"],
  ),
  entry(
    "Spesialis Karangan Bunga Indonesia",
    "website",
    C.FLORIST,
    spesialisKaranganBungaIndonesiaCover,
    "https://spesialiskaranganbungaindonesia.com",
    "Specialist flower arrangement and bouquet service. Stunning product galleries, occasion-based collections, and nationwide delivery information.",
    ["WordPress", "WooCommerce", "Custom Theme"],
  ),
  entry(
    "BE MODE Indonesia",
    "website",
    C.ECOMMERCE,
    bemodeCover,
    "https://bemodeofficial.com",
    "Fashion and lifestyle e-commerce brand. Trendy product displays, lookbook galleries, size guides, and seamless checkout flow.",
    ["WordPress", "WooCommerce", "Fashion Theme"],
  ),
  entry(
    "SG Academy",
    "website",
    C.EDUCATION,
    sgAcademyCover,
    "https://sgacademy.co.id/",
    "Professional training academy website. Course catalog, instructor profiles, online enrollment, and learning management system integration.",
    ["WordPress", "LMS", "Registration System"],
  ),
  entry(
    "Roby Saputra Grup",
    "website",
    C.BUSINESS,
    robySaputraGrupCover,
    "https://robysaputragrup.com/",
    "Business group holding company profile. Multi-division overview, leadership team, and corporate achievements showcase.",
    ["WordPress", "Corporate Theme", "Multi-Site"],
  ),
  entry(
    "Sakpattana Jawa Timur",
    "website",
    C.BUSINESS,
    sakpattanaJawaTimurCover,
    "https://sakpattanajawatimur.wreative.com/",
    "Regional business branch website for East Java. Local services, regional news, and community engagement features.",
    ["WordPress", "Regional Theme", "SEO"],
  ),
  entry(
    "CV Putra Kubota",
    "website",
    C.BUSINESS,
    CVPutraKubotaCover,
    "https://cvputrakubota.wreative.com/",
    "Agricultural equipment and machinery dealer. Product catalog with specs, spare parts ordering, and service center locator.",
    ["WordPress", "Product Catalog", "Contact Forms"],
  ),
  entry(
    "Wahyu Dewanagari",
    "website",
    C.BUSINESS,
    wahyuDewanagariCover,
    "https://wahyudewanagari.wreative.com/",
    "Cultural and arts foundation website. Event calendar, gallery of cultural performances, and community program information.",
    ["WordPress", "Events Calendar", "Gallery"],
  ),
  entry(
    "Aviso",
    "website",
    C.BUSINESS,
    avisoCover,
    "https://aviso.wreative.com/",
    "Business consulting and advisory services. Service packages, consultant profiles, case studies, and client success stories.",
    ["WordPress", "Consulting Theme", "Case Studies"],
  ),
  entry(
    "LPK Furinkazan",
    "website",
    C.EDUCATION,
    lpkFurinkazanCover,
    "https://lpkfurinkazan.wreative.com/",
    "Japanese language and culture training institute. Course levels, instructor credentials, student testimonials, and Japan placement program information.",
    ["WordPress", "LMS", "Registration Forms"],
  ),
];

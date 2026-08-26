import { type PortfolioItem, PortfolioCategory as C, entry, img, vid } from './types';

const demoVideo = 'https://www.w3schools.com/html/mov_bbb.mp4';

// --- Multi-image galleries ---

const wreativeGallery = [
  img('/assets/cover/wreative.webp'),
  img('/assets/cover/wreative-store.webp'),
  img('/assets/cover/home-baraka.webp'),
  img('/assets/cover/aviso.webp'),
  vid(demoVideo, '/assets/cover/wreative.webp'),
];

const fajarFloristGallery = [
  img('/assets/cover/fajar-florist.webp'),
  img('/assets/cover/spesialis-karangan-bunga.webp'),
  img('/assets/cover/bemode.webp'),
];

const wreativeStoreGallery = [
  img('/assets/cover/wreative-store.webp'),
  img('/assets/cover/chicken-explorer.webp'),
  img('/assets/cover/kurir-pulsa.webp'),
  vid(demoVideo, '/assets/cover/wreative-store.webp'),
];

// --- Website entries ---

export const websitePortfolios: Omit<PortfolioItem, 'id' | 'slug'>[] = [
  entry(
    'Kontraktor Surabaya',
    'website',
    C.SERVICES,
    '/assets/cover/kontraktor-surabaya.webp',
    'https://kontraktorsurabaya.wreative.com/',
    'Professional contracting services website for Surabaya region. Clean layout showcasing construction services, project portfolio, and client testimonials with easy contact integration.',
    ['WordPress', 'Elementor', 'SEO']
  ),
  entry(
    'Wase Bumi Indonesia',
    'website',
    C.BUSINESS,
    '/assets/cover/wase-bumi-indonesia.webp',
    'https://wasebumiindonesia.wreative.com/',
    "Corporate business website for a natural resource company. Features company profile, service offerings, and a modern design that reflects the brand's commitment to sustainability.",
    ['WordPress', 'Custom Theme', 'ACF']
  ),
  entry(
    'Cubicle Toilet',
    'website',
    C.SERVICES,
    '/assets/cover/cubicle-toilet.webp',
    'https://cubicletoilet.wreative.com/',
    'Specialized cubicle and toilet partition services website. Product catalog with detailed specifications, project gallery, and inquiry system for commercial clients.',
    ['WordPress', 'WooCommerce', 'Elementor']
  ),
  entry(
    'PT. Adikarya Pesona Intinusa',
    'website',
    C.EDUCATION,
    '/assets/cover/adikarya-pesona.webp',
    'https://adikaryapesona.wreative.com/',
    'Educational institution website with modern design. Includes course listings, faculty profiles, online registration, and student portal integration.',
    ['WordPress', 'LMS Integration', 'Custom Theme']
  ),
  entry(
    'Wreative Store',
    'website',
    C.ECOMMERCE,
    '/assets/cover/wreative-store.webp',
    'https://store.wreative.com',
    'E-commerce storefront for digital products and services. Clean product layouts, smooth checkout experience, and integrated payment gateway. Features a product walkthrough video.',
    ['WordPress', 'WooCommerce', 'Payment Gateway'],
    wreativeStoreGallery
  ),
  entry(
    'Home Baraka',
    'website',
    C.SERVICES,
    '/assets/cover/home-baraka.webp',
    'https://homebaraka.wreative.com/',
    'Property and home services platform. Features property listings, service bookings, and an intuitive search interface for potential buyers and renters.',
    ['WordPress', 'Custom Post Types', 'SEO']
  ),
  entry(
    'Wreative',
    'website',
    C.BUSINESS,
    '/assets/cover/wreative.webp',
    'https://wreative.com/',
    "Main brand website for Wreative — a creative digital agency. Showcases the agency's portfolio, services, and team with a bold, modern design. Includes a brand overview video.",
    ['WordPress', 'Custom Theme', 'GSAP'],
    wreativeGallery
  ),
  entry(
    'Fajar Florist',
    'website',
    C.FLORIST,
    '/assets/cover/fajar-florist.webp',
    'https://fajarflorist.wreative.com/',
    'Online florist and flower arrangement business. Beautiful product displays, seasonal collections, and easy ordering system for delivery across the city.',
    ['WordPress', 'WooCommerce', 'Custom Theme'],
    fajarFloristGallery
  ),
  entry(
    'First Media Surabaya',
    'website',
    C.SERVICES,
    '/assets/cover/first-media-surabaya.webp',
    'https://firstmediasurabaya.wreative.com/',
    'Local internet service provider website for Surabaya. Service plans comparison, coverage area maps, and customer support portal.',
    ['WordPress', 'Custom Forms', 'SEO']
  ),
  entry(
    'DPU Bina Marga Musi',
    'website',
    C.GOVERNMENT,
    '/assets/cover/dpu-bina-marga-musi.webp',
    'https://dpubinamargamusi.wreative.com/',
    'Government public works department website. Features project transparency reports, public service announcements, and infrastructure development updates.',
    ['WordPress', 'Government Theme', 'Accessibility']
  ),
  entry(
    'Chicken Explorer',
    'website',
    C.ECOMMERCE,
    '/assets/cover/chicken-explorer.webp',
    'https://chickenexplorer.wreative.com/',
    'Food and culinary brand e-commerce site. Menu showcase, online ordering system, and location finder for multiple restaurant branches.',
    ['WordPress', 'WooCommerce', 'Maps Integration']
  ),
  entry(
    'Kurir Pulsa',
    'website',
    C.ECOMMERCE,
    '/assets/cover/kurir-pulsa.webp',
    'https://kurirpulsa.wreative.com/',
    'Digital products and top-up service platform. Fast transaction processing, user dashboard, and automated order fulfillment system.',
    ['WordPress', 'API Integration', 'WooCommerce']
  ),
  entry(
    'Panji Semesta',
    'website',
    C.BUSINESS,
    '/assets/cover/panji-semesta.webp',
    'https://panjisemesta.wreative.com/',
    'General trading and business company profile. Modern corporate design with service overview, partner network, and business inquiry forms.',
    ['WordPress', 'Corporate Theme', 'Contact Forms']
  ),
  entry(
    'Dzata Lombok Transport',
    'website',
    C.SERVICES,
    '/assets/cover/dzata-lombok-transport.webp',
    'https://dzatalomboktransport.wreative.com/',
    'Transportation and travel services in Lombok. Booking system, fleet showcase, tour packages, and customer review integration.',
    ['WordPress', 'Booking System', 'SEO']
  ),
  entry(
    'Pernikahan Ini',
    'website',
    C.SERVICES,
    '/assets/cover/pernikahan-ini.webp',
    'https://pernikahanini.wreative.com/',
    'Wedding services and planning platform. Vendor directories, wedding packages, gallery showcase, and planning tools for couples.',
    ['WordPress', 'Custom Directory', 'Forms']
  ),
  entry(
    'Pos Satpam',
    'website',
    C.SERVICES,
    '/assets/cover/pos-satpam.webp',
    'https://possatpam.wreative.com/',
    'Security guard post and equipment supplier. Product catalog with specifications, project references, and quotation request system.',
    ['WordPress', 'WooCommerce', 'Catalog Theme']
  ),
  entry(
    'Toilet Portabel',
    'website',
    C.SERVICES,
    '/assets/cover/toilet-portabel.webp',
    'https://toiletportabel.wreative.com/',
    'Portable toilet rental and services. Product listings with pricing, event booking calendar, and service area information.',
    ['WordPress', 'Booking Calendar', 'SEO']
  ),
  entry(
    'PT Modern Coco International',
    'website',
    C.BUSINESS,
    '/assets/cover/pt-modern-coco-international.webp',
    'https://ptmoderncocointernational.wreative.com/',
    'International trading company corporate website. Global business profile, product sourcing information, and international partner network.',
    ['WordPress', 'Multilingual', 'Corporate Theme']
  ),
  entry(
    'Spesialis Karangan Bunga Indonesia',
    'website',
    C.FLORIST,
    '/assets/cover/spesialis-karangan-bunga.webp',
    'https://spesialiskaranganbungaindonesia.com',
    'Specialist flower arrangement and bouquet service. Stunning product galleries, occasion-based collections, and nationwide delivery information.',
    ['WordPress', 'WooCommerce', 'Custom Theme']
  ),
  entry(
    'BE MODE Indonesia',
    'website',
    C.ECOMMERCE,
    '/assets/cover/bemode.webp',
    'https://bemodeofficial.com',
    'Fashion and lifestyle e-commerce brand. Trendy product displays, lookbook galleries, size guides, and seamless checkout flow.',
    ['WordPress', 'WooCommerce', 'Fashion Theme']
  ),
  entry(
    'SG Academy',
    'website',
    C.EDUCATION,
    '/assets/cover/sg-academy.webp',
    'https://sgacademy.co.id/',
    'Professional training academy website. Course catalog, instructor profiles, online enrollment, and learning management system integration.',
    ['WordPress', 'LMS', 'Registration System']
  ),
  entry(
    'Roby Saputra Grup',
    'website',
    C.BUSINESS,
    '/assets/cover/roby-saputra-grup.webp',
    'https://robysaputragrup.com/',
    'Business group holding company profile. Multi-division overview, leadership team, and corporate achievements showcase.',
    ['WordPress', 'Corporate Theme', 'Multi-Site']
  ),
  entry(
    'Sakpattana Jawa Timur',
    'website',
    C.BUSINESS,
    '/assets/cover/sakpattana.webp',
    'https://sakpattanajawatimur.wreative.com/',
    'Regional business branch website for East Java. Local services, regional news, and community engagement features.',
    ['WordPress', 'Regional Theme', 'SEO']
  ),
  entry(
    'CV Putra Kubota',
    'website',
    C.BUSINESS,
    '/assets/cover/cv-putra-kubota.webp',
    'https://cvputrakubota.wreative.com/',
    'Agricultural equipment and machinery dealer. Product catalog with specs, spare parts ordering, and service center locator.',
    ['WordPress', 'Product Catalog', 'Contact Forms']
  ),
  entry(
    'Wahyu Dewanagari',
    'website',
    C.BUSINESS,
    '/assets/cover/wahyu-dewanagari.webp',
    'https://wahyudewanagari.wreative.com/',
    'Cultural and arts foundation website. Event calendar, gallery of cultural performances, and community program information.',
    ['WordPress', 'Events Calendar', 'Gallery']
  ),
  entry(
    'Aviso',
    'website',
    C.BUSINESS,
    '/assets/cover/aviso.webp',
    'https://aviso.wreative.com/',
    'Business consulting and advisory services. Service packages, consultant profiles, case studies, and client success stories.',
    ['WordPress', 'Consulting Theme', 'Case Studies']
  ),
  entry(
    'LPK Furinkazan',
    'website',
    C.EDUCATION,
    '/assets/cover/lpk-furinkazan.webp',
    'https://lpkfurinkazan.wreative.com/',
    'Japanese language and culture training institute. Course levels, instructor credentials, student testimonials, and Japan placement program information.',
    ['WordPress', 'LMS', 'Registration Forms']
  ),
];

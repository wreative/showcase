import { type PortfolioItem, PortfolioCategory as C, entry, img, vid } from './types';

// Mobile app screenshot placeholders — reuse existing covers with diverse visuals.
// Replace these with real app screenshots when available.

const demoVideo = 'https://www.w3schools.com/html/mov_bbb.mp4';

// --- Galleries (all images clearly different) ---

const wreativeAppGallery = [
  img('/assets/cover/wreative.webp'), // agency branding
  img('/assets/cover/wreative-store.webp'), // e-commerce layout
  img('/assets/cover/kurir-pulsa.webp'), // dark top-up site
  img('/assets/cover/dpu-bina-marga-musi.webp'), // government site
  vid(demoVideo, '/assets/cover/wreative.webp'),
];

const foodAppGallery = [
  img('/assets/cover/chicken-explorer.webp'), // food site
  img('/assets/cover/fajar-florist.webp'), // florist site
  img('/assets/cover/bemode.webp'), // fashion site
  img('/assets/cover/kurir-pulsa.webp'), // dark top-up site
  vid(demoVideo, '/assets/cover/chicken-explorer.webp'),
];

const weddingAppGallery = [
  img('/assets/cover/pernikahan-ini.webp'), // wedding site
  img('/assets/cover/fajar-florist.webp'), // florist site
  img('/assets/cover/pos-satpam.webp'), // security equipment
  vid(demoVideo, '/assets/cover/pernikahan-ini.webp'),
];

const transportAppGallery = [
  img('/assets/cover/dzata-lombok-transport.webp'), // transport site
  img('/assets/cover/toilet-portabel.webp'), // portable toilet rental
  img('/assets/cover/wahyu-dewanagari.webp'), // cultural foundation
];

// --- Mobile entries ---

export const mobilePortfolios: Omit<PortfolioItem, 'id' | 'slug'>[] = [
  entry(
    'Wreative App',
    'mobile',
    C.BUSINESS,
    '/assets/cover/wreative.webp',
    'https://wreative.com/',
    'Brand companion app for Wreative creative agency. Clients can browse the portfolio, track project progress in real-time, communicate via in-app chat, and approve deliverables directly from their phone. Push notifications keep everyone aligned on deadlines.',
    ['React Native', 'Expo', 'Firebase', 'Push Notifications'],
    wreativeAppGallery
  ),
  entry(
    'FoodDash — Food Delivery',
    'mobile',
    C.ECOMMERCE,
    '/assets/cover/chicken-explorer.webp',
    'https://chickenexplorer.wreative.com/',
    'Cross-platform food delivery app connecting hungry users with local restaurants. Features real-time order tracking with live GPS, multiple payment gateways (GoPay, OVO, bank transfer), smart recommendation engine, and a loyalty points system.',
    ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Midtrans'],
    foodAppGallery
  ),
  entry(
    'WeddingKu — Wedding Planner',
    'mobile',
    C.SERVICES,
    '/assets/cover/pernikahan-ini.webp',
    'https://pernikahanini.wreative.com/',
    'All-in-one wedding planning app for Indonesian couples. Browse vendor catalogs, manage guest lists with RSVP tracking, track budget across categories, timeline countdown, and mood board with Pinterest integration.',
    ['React Native', 'TypeScript', 'Supabase', 'Midtrans'],
    weddingAppGallery
  ),
  entry(
    'LombokRide — Transport Booking',
    'mobile',
    C.SERVICES,
    '/assets/cover/dzata-lombok-transport.webp',
    'https://dzatalomboktransport.wreative.com/',
    'Transport and tour booking app for Lombok island. Book cars, scooters, and tour packages with instant confirmation. Includes offline-capable maps, driver tracking, and multi-language support (ID/EN/JP).',
    ['Flutter', 'Google Maps SDK', 'Firebase', 'Localization'],
    transportAppGallery
  ),
  entry(
    'SG Academy Mobile',
    'mobile',
    C.EDUCATION,
    '/assets/cover/sg-academy.webp',
    'https://sgacademy.co.id/',
    'Mobile learning companion for SG Academy students. Access course materials offline, submit assignments, join live classes via integrated video conferencing, track learning progress with detailed analytics.',
    ['React Native', 'Zoom SDK', 'AWS S3', 'Offline-First']
  ),
  entry(
    'BE MODE — Fashion Shopping',
    'mobile',
    C.ECOMMERCE,
    '/assets/cover/bemode.webp',
    'https://bemodeofficial.com',
    'Fashion e-commerce app with AR try-on for accessories, personalized style recommendations powered by ML, size guide with measurement input, wishlist sync across devices, and one-tap checkout.',
    ['Flutter', 'TensorFlow Lite', 'ARCore', 'Shopify API']
  ),
];

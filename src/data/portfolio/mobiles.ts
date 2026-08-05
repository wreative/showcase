import { type PortfolioItem, PortfolioCategory as C, entry, img, vid } from './types';

// Mobile app screenshot placeholders — reuse existing covers with diverse visuals.
// Replace these with real app screenshots when available.
import wreativeCover from '../../../assets/cover/wreative.webp';
import wreativeStoreCover from '../../../assets/cover/wreative-store.webp';
import bemodeCover from '../../../assets/cover/bemode.webp';
import chickenExplorerCover from '../../../assets/cover/chicken-explorer.webp';
import fajarFloristCover from '../../../assets/cover/fajar-florist.webp';
import kurirPulsaCover from '../../../assets/cover/kurir-pulsa.webp';
import pernikahanIni from '../../../assets/cover/pernikahan-ini.webp';
import dzataLombokTransportCover from '../../../assets/cover/dzata-lombok-transport.webp';
import sgAcademyCover from '../../../assets/cover/sg-academy.webp';
import posSatpam from '../../../assets/cover/pos-satpam.webp';
import toiletPortabel from '../../../assets/cover/toilet-portabel.webp';

import DPUBinaMargaMusiCover from '../../../assets/cover/dpu-bina-marga-musi.webp';
import wahyuDewanagariCover from '../../../assets/cover/wahyu-dewanagari.webp';

const demoVideo = 'https://www.w3schools.com/html/mov_bbb.mp4';

// --- Galleries (all images clearly different) ---

const wreativeAppGallery = [
  img(wreativeCover), // agency branding
  img(wreativeStoreCover), // e-commerce layout
  img(kurirPulsaCover), // dark top-up site
  img(DPUBinaMargaMusiCover), // government site
  vid(demoVideo, wreativeCover),
];

const foodAppGallery = [
  img(chickenExplorerCover), // food site
  img(fajarFloristCover), // florist site
  img(bemodeCover), // fashion site
  img(kurirPulsaCover), // dark top-up site
  vid(demoVideo, chickenExplorerCover),
];

const weddingAppGallery = [
  img(pernikahanIni), // wedding site
  img(fajarFloristCover), // florist site
  img(posSatpam), // security equipment
  vid(demoVideo, pernikahanIni),
];

const transportAppGallery = [
  img(dzataLombokTransportCover), // transport site
  img(toiletPortabel), // portable toilet rental
  img(wahyuDewanagariCover), // cultural foundation
];

// --- Mobile entries ---

export const mobilePortfolios: Omit<PortfolioItem, 'id' | 'slug'>[] = [
  entry(
    'Wreative App',
    'mobile',
    C.BUSINESS,
    wreativeCover,
    'https://wreative.com/',
    'Brand companion app for Wreative creative agency. Clients can browse the portfolio, track project progress in real-time, communicate via in-app chat, and approve deliverables directly from their phone. Push notifications keep everyone aligned on deadlines.',
    ['React Native', 'Expo', 'Firebase', 'Push Notifications'],
    wreativeAppGallery
  ),
  entry(
    'FoodDash — Food Delivery',
    'mobile',
    C.ECOMMERCE,
    chickenExplorerCover,
    'https://chickenexplorer.wreative.com/',
    'Cross-platform food delivery app connecting hungry users with local restaurants. Features real-time order tracking with live GPS, multiple payment gateways (GoPay, OVO, bank transfer), smart recommendation engine, and a loyalty points system.',
    ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Midtrans'],
    foodAppGallery
  ),
  entry(
    'WeddingKu — Wedding Planner',
    'mobile',
    C.SERVICES,
    pernikahanIni,
    'https://pernikahanini.wreative.com/',
    'All-in-one wedding planning app for Indonesian couples. Browse vendor catalogs, manage guest lists with RSVP tracking, track budget across categories, timeline countdown, and mood board with Pinterest integration.',
    ['React Native', 'TypeScript', 'Supabase', 'Midtrans'],
    weddingAppGallery
  ),
  entry(
    'LombokRide — Transport Booking',
    'mobile',
    C.SERVICES,
    dzataLombokTransportCover,
    'https://dzatalomboktransport.wreative.com/',
    'Transport and tour booking app for Lombok island. Book cars, scooters, and tour packages with instant confirmation. Includes offline-capable maps, driver tracking, and multi-language support (ID/EN/JP).',
    ['Flutter', 'Google Maps SDK', 'Firebase', 'Localization'],
    transportAppGallery
  ),
  entry(
    'SG Academy Mobile',
    'mobile',
    C.EDUCATION,
    sgAcademyCover,
    'https://sgacademy.co.id/',
    'Mobile learning companion for SG Academy students. Access course materials offline, submit assignments, join live classes via integrated video conferencing, track learning progress with detailed analytics.',
    ['React Native', 'Zoom SDK', 'AWS S3', 'Offline-First']
  ),
  entry(
    'BE MODE — Fashion Shopping',
    'mobile',
    C.ECOMMERCE,
    bemodeCover,
    'https://bemodeofficial.com',
    'Fashion e-commerce app with AR try-on for accessories, personalized style recommendations powered by ML, size guide with measurement input, wishlist sync across devices, and one-tap checkout.',
    ['Flutter', 'TensorFlow Lite', 'ARCore', 'Shopify API']
  ),
];

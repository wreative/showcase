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

export const mobilePortfolios: Omit<PortfolioItem, 'id' | 'slug'>[] = [  entry({
    title: 'Wreative App',
    platform: 'mobile',
    category: C.BUSINESS,
    image: '/assets/cover/wreative.webp',
    url: 'https://wreative.com/',
    description:
      'Brand companion app for Wreative creative agency. Clients can browse the portfolio, track project progress in real-time, communicate via in-app chat, and approve deliverables directly from their phone. Push notifications keep everyone aligned on deadlines.',
    descriptionId:
      'Aplikasi pendamping brand untuk agensi kreatif Wreative. Klien dapat menjelajahi portofolio, memantau progres proyek secara real-time, berkomunikasi lewat chat dalam aplikasi, dan menyetujui hasil kerja langsung dari ponsel. Notifikasi push menjaga semua pihak selaras dengan tenggat waktu.',
    tags: ['React Native', 'Expo', 'Firebase', 'Push Notifications'],
    gallery: wreativeAppGallery,
  }),
  entry({
    title: 'FoodDash — Food Delivery',
    platform: 'mobile',
    category: C.ECOMMERCE,
    image: '/assets/cover/chicken-explorer.webp',
    url: 'https://chickenexplorer.wreative.com/',
    description:
      'Cross-platform food delivery app connecting hungry users with local restaurants. Features real-time order tracking with live GPS, multiple payment gateways (GoPay, OVO, bank transfer), smart recommendation engine, and a loyalty points system.',
    descriptionId:
      'Aplikasi pengiriman makanan lintas platform yang menghubungkan pengguna dengan restoran lokal. Fitur pelacakan pesanan real-time dengan GPS langsung, berbagai payment gateway (GoPay, OVO, transfer bank), mesin rekomendasi cerdas, dan sistem poin loyalitas.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Midtrans'],
    gallery: foodAppGallery,
  }),
  entry({
    title: 'WeddingKu — Wedding Planner',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/pernikahan-ini.webp',
    url: 'https://pernikahanini.wreative.com/',
    description:
      'All-in-one wedding planning app for Indonesian couples. Browse vendor catalogs, manage guest lists with RSVP tracking, track budget across categories, timeline countdown, and mood board with Pinterest integration.',
    descriptionId:
      'Aplikasi perencana pernikahan all-in-one untuk pasangan di Indonesia. Jelajahi katalog vendor, kelola daftar tamu dengan pelacakan RSVP, pantau anggaran per kategori, hitung mundur timeline, dan mood board dengan integrasi Pinterest.',
    tags: ['React Native', 'TypeScript', 'Supabase', 'Midtrans'],
    gallery: weddingAppGallery,
  }),
  entry({
    title: 'LombokRide — Transport Booking',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'Transport and tour booking app for Lombok island. Book cars, scooters, and tour packages with instant confirmation. Includes offline-capable maps, driver tracking, and multi-language support (ID/EN/JP).',
    descriptionId:
      'Aplikasi pemesanan transportasi dan tur untuk Pulau Lombok. Pesan mobil, motor, dan paket tur dengan konfirmasi instan. Dilengkapi peta offline, pelacakan pengemudi, dan dukungan multi-bahasa (ID/EN/JP).',
    tags: ['Flutter', 'Google Maps SDK', 'Firebase', 'Localization'],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'SG Academy Mobile',
    platform: 'mobile',
    category: C.EDUCATION,
    image: '/assets/cover/sg-academy.webp',
    url: 'https://sgacademy.co.id/',
    description:
      'Mobile learning companion for SG Academy students. Access course materials offline, submit assignments, join live classes via integrated video conferencing, track learning progress with detailed analytics.',
    descriptionId:
      'Aplikasi pendamping belajar untuk siswa SG Academy. Akses materi kursus secara offline, kumpulkan tugas, ikuti kelas langsung melalui konferensi video terintegrasi, dan pantau progres belajar dengan analitik terperinci.',
    tags: ['React Native', 'Zoom SDK', 'AWS S3', 'Offline-First'],
  }),
  entry({
    title: 'BE MODE — Fashion Shopping',
    platform: 'mobile',
    category: C.ECOMMERCE,
    image: '/assets/cover/bemode.webp',
    url: 'https://bemodeofficial.com',
    description:
      'Fashion e-commerce app with AR try-on for accessories, personalized style recommendations powered by ML, size guide with measurement input, wishlist sync across devices, and one-tap checkout.',
    descriptionId:
      'Aplikasi e-commerce fashion dengan fitur coba AR untuk aksesori, rekomendasi gaya personal berbasis ML, panduan ukuran dengan input pengukuran, sinkronisasi wishlist antar perangkat, dan checkout satu ketukan.',
    tags: ['Flutter', 'TensorFlow Lite', 'ARCore', 'Shopify API'],
  }),
];

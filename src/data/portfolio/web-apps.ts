import { type PortfolioItem, PortfolioCategory as C, entry, img, vid } from './types';

// Mobile app screenshot placeholders - reuse existing covers with diverse visuals.
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

// --- Web app entries ---

export const webAppPortfolios: Omit<PortfolioItem, 'id' | 'slug'>[] = [
  entry({
    title: 'Nikifit - Women Fitness & Wellness',
    platform: 'web-app',
    category: C.LIFESTYLE,
    image: '/assets/cover/wreative.webp',
    url: 'https://wreative.com/',
    description:
      'Application for women-only Pilates studio. This app allows users to book classes, track progress, and receive updates on schedules and promotions. Additional features include social media integration, fitness tracking, and personalized content to enhance the user experience.',
    descriptionId:
      'Aplikasi Studio Pilates Khusus Wanita. Aplikasi ini memungkinkan pengguna untuk memesan kelas, melacak kemajuan, dan menerima pembaruan tentang jadwal dan promosi. Fitur tambahan termasuk integrasi media sosial, pelacakan kebugaran, dan konten yang dipersonalisasi untuk meningkatkan pengalaman pengguna.',
    tags: ['React Native', 'Expo', 'Firebase', 'Push Notifications'],
    gallery: wreativeAppGallery,
  }),
  entry({
    title: 'Tipotix - Ticketing & Event Management',
    platform: 'web-app',
    category: C.LIFESTYLE,
    image: '/assets/cover/wreative.webp',
    url: 'https://chickenexplorer.wreative.com/',
    description:
      'Event and Ticketing Application. This app allows users to purchase event tickets, manage schedules, and receive updates on events they are interested in.',
    descriptionId:
      'Aplikasi Event (Kegiatan) dan Tiket. Aplikasi ini memungkinkan pengguna untuk membeli tiket acara, mengelola jadwal, dan menerima pembaruan tentang acara yang mereka minati.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Midtrans'],
    gallery: foodAppGallery,
  }),
  entry({
    title: 'Gabungin - All in One Application',
    platform: 'web-app',
    category: C.BUSINESS,
    image: '/assets/cover/wreative.webp',
    url: 'https://chickenexplorer.wreative.com/',
    description:
      'All-in-One Application Service. This app allows users to access various premium applications within the Gabungin service or Workspace.',
    descriptionId:
      'Layanan Aplikasi yang menggabungkan semua aplikasi menjadi satu. Aplikasi ini memungkinkan pengguna untuk mengakses berbagai aplikasi premium yang ada di dalam layanan atau Workspace Gabungin.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Midtrans'],
    gallery: foodAppGallery,
  }),
  entry({
    title: 'Sultan Top Up - Game Top Up & Digital Products',
    platform: 'web-app',
    category: C.LIFESTYLE,
    image: '/assets/cover/wreative.webp',
    url: 'https://chickenexplorer.wreative.com/',
    description:
      'Game Top Up and Digital Products Service. This app allows users to top up games and purchase various other digital products.',
    descriptionId:
      'Layanan Top Up Game dan Produk Digital. Aplikasi ini memungkinkan pengguna untuk melakukan top up game dan membeli berbagai produk digital lainnya.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Midtrans'],
    gallery: foodAppGallery,
  }),
  entry({
    title: 'SINFRA - Infrastruktur Information System Application',
    platform: 'web-app',
    category: C.GOVERNMENT,
    image: '/assets/cover/wreative.webp',
    url: 'https://chickenexplorer.wreative.com/',
    description:
      'Infrastructure Information System Application. This app is designed to provide information regarding the development of infrastructure in a specific area. It offers solutions for managing and monitoring digital infrastructure.',
    descriptionId:
      'Aplikasi yang dibentuk dengan tujuan memberikan informasi mengenai perkembangan pembangunan infrastruktur di wilayah tertentu. Aplikasi ini menyediakan solusi untuk mengelola dan memantau infrastruktur digital.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Midtrans'],
    gallery: foodAppGallery,
  }),
  entry({
    title: 'Data Room KPBU - Public Private Partnership Data Room',
    platform: 'web-app',
    category: C.GOVERNMENT,
    image: '/assets/cover/wreative.webp',
    url: 'https://chickenexplorer.wreative.com/',
    description:
      'Public Private Partnership Data Room. This app is designed to provide a centralized platform for managing and sharing data related to public-private partnership projects or PJPK.',
    descriptionId:
      'Ruangan Data untuk Kerjasama Publik-Privat. Aplikasi ini dirancang untuk menyediakan platform terpusat dalam mengelola dan berbagi data yang terkait dengan proyek kerjasama publik-privat atau Penanggung Jawab Proyek Kerja Sama (PJPK).',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Midtrans'],
    gallery: foodAppGallery,
  }),
  entry({
    title: 'Sajodo - Snack & Food',
    platform: 'web-app',
    category: C.FOOD,
    image: '/assets/cover/wreative.webp',
    url: 'https://chickenexplorer.wreative.com/',
    description:
      'Sajodo - Snack & Food. This app is designed to provide a platform for managing and sharing data related to snack and food products.',
    descriptionId:
      'Sajodo - Snack & Food. Aplikasi ini dirancang untuk menyediakan platform dalam mengelola dan berbagi data yang terkait dengan produk makanan ringan dan makanan.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Midtrans'],
    gallery: foodAppGallery,
  }),
  entry({
    title: 'Andromart - Online Store & E-Commerce',
    platform: 'web-app',
    category: C.ECOMMERCE,
    image: '/assets/cover/wreative.webp',
    url: 'https://chickenexplorer.wreative.com/',
    description:
      'Andromart - Online Store & E-Commerce. This app is designed to provide a platform for managing and sharing data related to online shopping and e-commerce. Additionally, the app also provides features to facilitate the transaction process and product management for sellers.',
    descriptionId:
      'Aplikasi Toko Online & E-Commerce. Aplikasi ini dirancang untuk menyediakan platform dalam mengelola dan berbagi data yang terkait dengan belanja online dan e-commerce. Selain itu, aplikasi ini juga menyediakan fitur untuk mempermudah proses transaksi dan pengelolaan produk bagi para penjual.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Midtrans'],
    gallery: foodAppGallery,
  }),
];

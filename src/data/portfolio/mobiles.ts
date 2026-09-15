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
  entry({
    title: 'Wreative App',
    platform: 'mobile',
    category: C.BUSINESS,
    image: '/assets/cover/wreative.webp',
    url: 'https://wreative.com/',
    description:
      'Brand companion app for Wreative creative agency. Clients can browse the portfolio, track project progress in real-time, communicate via in-app chat, and approve deliverables directly from their phone. Push notifications keep everyone aligned on deadlines.',
    descriptionId:
      'Aplikasi pendamping brand untuk agensi kreatif Wreative. Klien dapat menjelajahi portofolio, memantau progres proyek secara real-time, berkomunikasi lewat chat dalam aplikasi, dan menyetujui hasil kerja langsung dari ponsel. Notifikasi push menjaga semua pihak selaras dengan tenggat waktu.',
    tags: ['Flutter', 'Dart', 'WebView', 'Firebase Crashlytics', 'API Integration'],
    gallery: wreativeAppGallery,
  }),
  entry({
    title: 'TikCheck - Event Ticketing',
    platform: 'mobile',
    category: C.ECOMMERCE,
    image: '/assets/cover/chicken-explorer.webp',
    url: 'https://chickenexplorer.wreative.com/',
    description:
      'Ticketing app for security personnel and event management. Features include QR scanning for entry, guest list management, push notifications for event updates, and calendar integration. Admins can manage events, tickets, and analytics reports.',
    descriptionId:
      'Aplikasi Tiket untuk Petugas Keamanan dan Manajemen Acara. Fitur termasuk pemindaian QR untuk masuk, manajemen daftar tamu, notifikasi push untuk pembaruan acara, dan integrasi kalender. Admin dapat mengelola acara, tiket, dan laporan analitik.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Sync System', 'Sentry', 'API Integration', 'SQLLite'],
    gallery: foodAppGallery,
  }),
  entry({
    title: 'TBCeria - TBC Health Companion',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/pernikahan-ini.webp',
    url: 'https://pernikahanini.wreative.com/',
    description:
      'Health companion app for tuberculosis patients in Indonesia. Features include symptom tracking, medication reminders, online doctor consultations, and integration with local health services.',
    descriptionId:
      'Aplikasi untuk penderita TBC di Indonesia. Fitur termasuk pelacakan gejala, pengingat obat, konsultasi dokter online, dan integrasi dengan layanan kesehatan lokal.',
    tags: ['Flutter', 'Dart', 'API Integration', 'Push Notifications', 'Sentry', 'Chat System'],
    gallery: weddingAppGallery,
  }),
  entry({
    title: 'Sijalu - Wound Information Network System',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'A Wound Information Network System app for patients and medical professionals. Features include wound tracking, treatment reminders, online doctor consultations, and integration with local healthcare services.',
    descriptionId:
      'Aplikasi Sistem Jaringan Informasi Luka untuk pasien dan tenaga medis. Fitur termasuk pelacakan luka, pengingat perawatan, konsultasi dokter online, dan integrasi dengan layanan kesehatan lokal.',
    tags: [
      'Flutter',
      'Dart',
      'Firebase',
      'Localization',
      'Sentry',
      'API Integration',
      'Health API Integration',
      'WebView',
    ],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'Ceting Gmeil - Aplikasi Ibu Hamil',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'A Wound Information Network System app for patients and medical professionals. Features include wound tracking, treatment reminders, online doctor consultations, and integration with local healthcare services.',
    descriptionId:
      'Aplikasi Sistem Jaringan Informasi Luka untuk pasien dan tenaga medis. Fitur termasuk pelacakan luka, pengingat perawatan, konsultasi dokter online, dan integrasi dengan layanan kesehatan lokal.',
    tags: ['Flutter', 'Dart', 'Push Notifications', 'Sentry', 'API Integration'],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'Mitra Jaya Cellular - PPOB',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'A Wound Information Network System app for patients and medical professionals. Features include wound tracking, treatment reminders, online doctor consultations, and integration with local healthcare services.',
    descriptionId:
      'Aplikasi Sistem Jaringan Informasi Luka untuk pasien dan tenaga medis. Fitur termasuk pelacakan luka, pengingat perawatan, konsultasi dokter online, dan integrasi dengan layanan kesehatan lokal.',
    tags: ['Flutter', 'Dart', 'Sentry', 'API Integration', 'PPOB', 'Marketplace'],
    gallery: transportAppGallery,
  }),
  entry({
    title:
      'Momora - aplikasi parenting yang membantu monitoring tumbuh kembang bayi, konsumsi konten edukasi, dan kebutuhan belanja bayi.',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'A Wound Information Network System app for patients and medical professionals. Features include wound tracking, treatment reminders, online doctor consultations, and integration with local healthcare services.',
    descriptionId:
      'Aplikasi Sistem Jaringan Informasi Luka untuk pasien dan tenaga medis. Fitur termasuk pelacakan luka, pengingat perawatan, konsultasi dokter online, dan integrasi dengan layanan kesehatan lokal.',
    tags: ['Flutter', 'Dart', 'Push Notifications', 'Sentry', 'API Integration', 'Supabase'],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'Voilla - Learning Management System',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'A Wound Information Network System app for patients and medical professionals. Features include wound tracking, treatment reminders, online doctor consultations, and integration with local healthcare services.',
    descriptionId:
      'Aplikasi Sistem Jaringan Informasi Luka untuk pasien dan tenaga medis. Fitur termasuk pelacakan luka, pengingat perawatan, konsultasi dokter online, dan integrasi dengan layanan kesehatan lokal.',
    tags: ['Flutter', 'Dart', 'Sentry', 'API Integration', 'LMS'],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'Sigap - Sistem Informasi & Pertolongan Cepat',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'A Wound Information Network System app for patients and medical professionals. Features include wound tracking, treatment reminders, online doctor consultations, and integration with local healthcare services.',
    descriptionId:
      'Aplikasi Sistem Jaringan Informasi Luka untuk pasien dan tenaga medis. Fitur termasuk pelacakan luka, pengingat perawatan, konsultasi dokter online, dan integrasi dengan layanan kesehatan lokal.',
    tags: ['Laravel', 'NativePHP', 'Sentry', 'Livewire', 'Tailwind CSS'],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'Tridentacare - Aplikasi Deteksi Kerusakan Gigi',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'A Wound Information Network System app for patients and medical professionals. Features include wound tracking, treatment reminders, online doctor consultations, and integration with local healthcare services.',
    descriptionId:
      'Aplikasi Sistem Jaringan Informasi Luka untuk pasien dan tenaga medis. Fitur termasuk pelacakan luka, pengingat perawatan, konsultasi dokter online, dan integrasi dengan layanan kesehatan lokal.',
    tags: [
      'Flutter',
      'Dart',
      'Object Detection & Segmentation',
      'API Integration',
      'Node.js',
      'YOLO Model',
      'TensorFlow',
      'Keras',
      'Express.js',
    ],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'MelCalm - Wellness Screening',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'A Wound Information Network System app for patients and medical professionals. Features include wound tracking, treatment reminders, online doctor consultations, and integration with local healthcare services.',
    descriptionId:
      'Aplikasi Sistem Jaringan Informasi Luka untuk pasien dan tenaga medis. Fitur termasuk pelacakan luka, pengingat perawatan, konsultasi dokter online, dan integrasi dengan layanan kesehatan lokal.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Firebase Crashlytics'],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'HMM - Hardware Maintenance Management',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'A Wound Information Network System app for patients and medical professionals. Features include wound tracking, treatment reminders, online doctor consultations, and integration with local healthcare services.',
    descriptionId:
      'Aplikasi Sistem Jaringan Informasi Luka untuk pasien dan tenaga medis. Fitur termasuk pelacakan luka, pengingat perawatan, konsultasi dokter online, dan integrasi dengan layanan kesehatan lokal.',
    tags: ['Flutter', 'Dart', 'API Integration'],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'IKA Pens - Aplikasi Alumni Politeknik Elektronika Negeri Surabaya (PENS)',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'A Wound Information Network System app for patients and medical professionals. Features include wound tracking, treatment reminders, online doctor consultations, and integration with local healthcare services.',
    descriptionId:
      'Aplikasi Sistem Jaringan Informasi Luka untuk pasien dan tenaga medis. Fitur termasuk pelacakan luka, pengingat perawatan, konsultasi dokter online, dan integrasi dengan layanan kesehatan lokal.',
    tags: ['Flutter', 'Dart', 'API Integration'],
    gallery: transportAppGallery,
  }),
];

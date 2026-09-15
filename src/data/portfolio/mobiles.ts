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
    title: 'Ceting Gmeil - Pregnancy Companion App',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'A pregnancy companion app for expectant mothers that helps monitor maternal health, track wellness milestones, receive timely reminders, and access trusted medical guidance anytime. It supports better prenatal care with education, notifications, and caregiver communication.',
    descriptionId:
      'A pregnancy companion app for expectant mothers that helps monitor maternal health, track wellness milestones, receive timely reminders, and access trusted medical guidance anytime. It supports better prenatal care with education, notifications, and caregiver communication.',
    tags: ['Flutter', 'Dart', 'Pregnancy Tracking', 'Push Notifications', 'Healthcare API', 'Sentry'],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'Mitra Jaya Cellular - PPOB Mobile Platform',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'A mobile utility and bill payment platform for cellular service operators, enabling customers to purchase data bundles, top-ups, and digital transactions in a secure, convenient app. It helps streamline service operations and keeps transactions fast and efficient.',
    descriptionId:
      'A mobile utility and bill payment platform for cellular service operators, enabling customers to purchase data bundles, top-ups, and digital transactions in a secure, convenient app. It helps streamline service operations and keeps transactions fast and efficient.',
    tags: ['Flutter', 'Dart', 'Sentry', 'API Integration', 'PPOB', 'Marketplace'],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'Momora - Parenting Growth Companion',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'A parenting app that helps families track baby growth, access educational content, and manage essential baby purchases in one place. It combines development monitoring with practical parenting guidance for a smoother child-care journey.',
    descriptionId:
      'A parenting app that helps families track baby growth, access educational content, and manage essential baby purchases in one place. It combines development monitoring with practical parenting guidance for a smoother child-care journey.',
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
      'A mobile learning platform that helps students and educators manage courses, assignments, classroom materials, and learning progress in one place. It supports digital education through structured content access, communication, and performance tracking.',
    descriptionId:
      'A mobile learning platform that helps students and educators manage courses, assignments, classroom materials, and learning progress in one place. It supports digital education through structured content access, communication, and performance tracking.',
    tags: ['Flutter', 'Dart', 'Sentry', 'API Integration', 'LMS'],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'Sigap - Emergency Response Information System',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'An emergency response management app designed for fast reporting, coordinated action, and public safety support. It helps teams share real-time updates, streamline response workflows, and improve readiness in critical situations.',
    descriptionId:
      'An emergency response management app designed for fast reporting, coordinated action, and public safety support. It helps teams share real-time updates, streamline response workflows, and improve readiness in critical situations.',
    tags: ['Laravel', 'NativePHP', 'Sentry', 'Livewire', 'Tailwind CSS'],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'Tridentacare - Dental Damage Detection App',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'An AI-powered dental care app that helps detect oral damage through image-based analysis and guided assessment. It supports early diagnosis, patient awareness, and better decision-making for dental health management.',
    descriptionId:
      'An AI-powered dental care app that helps detect oral damage through image-based analysis and guided assessment. It supports early diagnosis, patient awareness, and better decision-making for dental health management.',
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
      'A wellness screening app designed to support physical and emotional well-being through health assessments, guidance, and personalized recommendations. It helps users better understand their condition and make healthier daily decisions.',
    descriptionId:
      'A wellness screening app designed to support physical and emotional well-being through health assessments, guidance, and personalized recommendations. It helps users better understand their condition and make healthier daily decisions.',
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
      'A maintenance management app for tracking equipment conditions, scheduling repairs, and managing technical service workflows. It helps organizations reduce downtime and improve asset reliability across operations.',
    descriptionId:
      'A maintenance management app for tracking equipment conditions, scheduling repairs, and managing technical service workflows. It helps organizations reduce downtime and improve asset reliability across operations.',
    tags: ['Flutter', 'Dart', 'API Integration'],
    gallery: transportAppGallery,
  }),
  entry({
    title: 'IKA Pens - Alumni Network App',
    platform: 'mobile',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'An alumni engagement app for graduates of the Polytechnic Elektronika Negeri Surabaya, connecting members through updates, community features, and event participation. It strengthens professional relationships and keeps alumni informed about opportunities and activities.',
    descriptionId:
      'An alumni engagement app for graduates of the Polytechnic Elektronika Negeri Surabaya, connecting members through updates, community features, and event participation. It strengthens professional relationships and keeps alumni informed about opportunities and activities.',
    tags: ['Flutter', 'Dart', 'API Integration'],
    gallery: transportAppGallery,
  }),
];

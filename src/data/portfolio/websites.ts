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
  entry({
    title: 'Kontraktor Surabaya',
    platform: 'website',
    category: C.SERVICES,
    image: '/assets/cover/kontraktor-surabaya.webp',
    url: 'https://kontraktorsurabaya.wreative.com/',
    description:
      'Professional contracting services website for Surabaya region. Clean layout showcasing construction services, project portfolio, and client testimonials with easy contact integration.',
    descriptionId:
      'Situs web layanan kontraktor profesional untuk wilayah Surabaya. Tata letak rapi yang menampilkan layanan konstruksi, portofolio proyek, dan testimoni klien dengan integrasi kontak yang mudah.',
    tags: ['WordPress', 'Elementor', 'SEO'],
  }),
  entry({
    title: 'Wase Bumi Indonesia',
    platform: 'website',
    category: C.BUSINESS,
    image: '/assets/cover/wase-bumi-indonesia.webp',
    url: 'https://wasebumiindonesia.wreative.com/',
    description:
      "Corporate business website for a natural resource company. Features company profile, service offerings, and a modern design that reflects the brand's commitment to sustainability.",
    descriptionId:
      'Situs web bisnis korporat untuk perusahaan sumber daya alam. Menampilkan profil perusahaan, layanan yang ditawarkan, dan desain modern yang mencerminkan komitmen brand terhadap keberlanjutan.',
    tags: ['WordPress', 'Custom Theme', 'ACF'],
  }),
  entry({
    title: 'Cubicle Toilet',
    platform: 'website',
    category: C.SERVICES,
    image: '/assets/cover/cubicle-toilet.webp',
    url: 'https://cubicletoilet.wreative.com/',
    description:
      'Specialized cubicle and toilet partition services website. Product catalog with detailed specifications, project gallery, and inquiry system for commercial clients.',
    descriptionId:
      'Situs web layanan spesialis partisi cubicle dan toilet. Katalog produk dengan spesifikasi detail, galeri proyek, dan sistem inquiry untuk klien komersial.',
    tags: ['WordPress', 'WooCommerce', 'Elementor'],
  }),
  entry({
    title: 'PT. Adikarya Pesona Intinusa',
    platform: 'website',
    category: C.EDUCATION,
    image: '/assets/cover/adikarya-pesona.webp',
    url: 'https://adikaryapesona.wreative.com/',
    description:
      'Educational institution website with modern design. Includes course listings, faculty profiles, online registration, and student portal integration.',
    descriptionId:
      'Situs web lembaga pendidikan dengan desain modern. Termasuk daftar kursus, profil pengajar, pendaftaran online, dan integrasi portal siswa.',
    tags: ['WordPress', 'LMS Integration', 'Custom Theme'],
  }),
  entry({
    title: 'Wreative Store',
    platform: 'website',
    category: C.ECOMMERCE,
    image: '/assets/cover/wreative-store.webp',
    url: 'https://store.wreative.com',
    description:
      'E-commerce storefront for digital products and services. Clean product layouts, smooth checkout experience, and integrated payment gateway. Features a product walkthrough video.',
    descriptionId:
      'Toko e-commerce untuk produk dan layanan digital. Tata letak produk yang bersih, pengalaman checkout yang lancar, dan payment gateway terintegrasi. Dilengkapi video walkthrough produk.',
    tags: ['WordPress', 'WooCommerce', 'Payment Gateway'],
    gallery: wreativeStoreGallery,
  }),
  entry({
    title: 'Home Baraka',
    platform: 'website',
    category: C.SERVICES,
    image: '/assets/cover/home-baraka.webp',
    url: 'https://homebaraka.wreative.com/',
    description:
      'Property and home services platform. Features property listings, service bookings, and an intuitive search interface for potential buyers and renters.',
    descriptionId:
      'Platform layanan properti dan rumah. Menampilkan listing properti, pemesanan layanan, dan antarmuka pencarian intuitif untuk calon pembeli dan penyewa.',
    tags: ['WordPress', 'Custom Post Types', 'SEO'],
  }),  entry({
    title: 'Wreative',
    platform: 'website',
    category: C.BUSINESS,
    image: '/assets/cover/wreative.webp',
    url: 'https://wreative.com/',
    description:
      "Main brand website for Wreative — a creative digital agency. Showcases the agency's portfolio, services, and team with a bold, modern design. Includes a brand overview video.",
    descriptionId:
      'Situs web utama brand Wreative — agensi digital kreatif. Menampilkan portofolio, layanan, dan tim agensi dengan desain modern yang berani. Dilengkapi video overview brand.',
    tags: ['WordPress', 'Custom Theme', 'GSAP'],
    gallery: wreativeGallery,
  }),
  entry({
    title: 'Fajar Florist',
    platform: 'website',
    category: C.FLORIST,
    image: '/assets/cover/fajar-florist.webp',
    url: 'https://fajarflorist.wreative.com/',
    description:
      'Online florist and flower arrangement business. Beautiful product displays, seasonal collections, and easy ordering system for delivery across the city.',
    descriptionId:
      'Bisnis florist online dan rangkaian bunga. Tampilan produk yang menarik, koleksi musiman, dan sistem pemesanan mudah untuk pengiriman di seluruh kota.',
    tags: ['WordPress', 'WooCommerce', 'Custom Theme'],
    gallery: fajarFloristGallery,
  }),
  entry({
    title: 'First Media Surabaya',
    platform: 'website',
    category: C.SERVICES,
    image: '/assets/cover/first-media-surabaya.webp',
    url: 'https://firstmediasurabaya.wreative.com/',
    description:
      'Local internet service provider website for Surabaya. Service plans comparison, coverage area maps, and customer support portal.',
    descriptionId:
      'Situs web penyedia layanan internet lokal untuk Surabaya. Perbandingan paket layanan, peta area jangkauan, dan portal dukungan pelanggan.',
    tags: ['WordPress', 'Custom Forms', 'SEO'],
  }),
  entry({
    title: 'DPU Bina Marga Musi',
    platform: 'website',
    category: C.GOVERNMENT,
    image: '/assets/cover/dpu-bina-marga-musi.webp',
    url: 'https://dpubinamargamusi.wreative.com/',
    description:
      'Government public works department website. Features project transparency reports, public service announcements, and infrastructure development updates.',
    descriptionId:
      'Situs web dinas pekerjaan umum pemerintah. Menampilkan laporan transparansi proyek, pengumuman layanan publik, dan kabar terbaru pembangunan infrastruktur.',
    tags: ['WordPress', 'Government Theme', 'Accessibility'],
  }),
  entry({
    title: 'Chicken Explorer',
    platform: 'website',
    category: C.ECOMMERCE,
    image: '/assets/cover/chicken-explorer.webp',
    url: 'https://chickenexplorer.wreative.com/',
    description:
      'Food and culinary brand e-commerce site. Menu showcase, online ordering system, and location finder for multiple restaurant branches.',
    descriptionId:
      'Situs e-commerce brand makanan dan kuliner. Pameran menu, sistem pemesanan online, dan pencari lokasi untuk beberapa cabang restoran.',
    tags: ['WordPress', 'WooCommerce', 'Maps Integration'],
  }),
  entry({
    title: 'Kurir Pulsa',
    platform: 'website',
    category: C.ECOMMERCE,
    image: '/assets/cover/kurir-pulsa.webp',
    url: 'https://kurirpulsa.wreative.com/',
    description:
      'Digital products and top-up service platform. Fast transaction processing, user dashboard, and automated order fulfillment system.',
    descriptionId:
      'Platform produk digital dan layanan top-up. Pemrosesan transaksi yang cepat, dashboard pengguna, dan sistem pemenuhan pesanan otomatis.',
    tags: ['WordPress', 'API Integration', 'WooCommerce'],
  }),
  entry({
    title: 'Panji Semesta',
    platform: 'website',
    category: C.BUSINESS,
    image: '/assets/cover/panji-semesta.webp',
    url: 'https://panjisemesta.wreative.com/',
    description:
      'General trading and business company profile. Modern corporate design with service overview, partner network, and business inquiry forms.',
    descriptionId:
      'Profil perusahaan trading dan bisnis umum. Desain korporat modern dengan gambaran layanan, jaringan mitra, dan formulir inquiry bisnis.',
    tags: ['WordPress', 'Corporate Theme', 'Contact Forms'],
  }),
  entry({
    title: 'Dzata Lombok Transport',
    platform: 'website',
    category: C.SERVICES,
    image: '/assets/cover/dzata-lombok-transport.webp',
    url: 'https://dzatalomboktransport.wreative.com/',
    description:
      'Transportation and travel services in Lombok. Booking system, fleet showcase, tour packages, and customer review integration.',
    descriptionId:
      'Layanan transportasi dan perjalanan di Lombok. Sistem pemesanan, pameran armada, paket tur, dan integrasi ulasan pelanggan.',
    tags: ['WordPress', 'Booking System', 'SEO'],
  }),
  entry({
    title: 'Pernikahan Ini',
    platform: 'website',
    category: C.SERVICES,
    image: '/assets/cover/pernikahan-ini.webp',
    url: 'https://pernikahanini.wreative.com/',
    description:
      'Wedding services and planning platform. Vendor directories, wedding packages, gallery showcase, and planning tools for couples.',
    descriptionId:
      'Platform layanan dan perencanaan pernikahan. Direktori vendor, paket pernikahan, galeri pameran, dan perangkat perencanaan untuk para pasangan.',
    tags: ['WordPress', 'Custom Directory', 'Forms'],
  }),
  entry({
    title: 'Pos Satpam',
    platform: 'website',
    category: C.SERVICES,
    image: '/assets/cover/pos-satpam.webp',
    url: 'https://possatpam.wreative.com/',
    description:
      'Security guard post and equipment supplier. Product catalog with specifications, project references, and quotation request system.',
    descriptionId:
      'Pemasok pos satpam dan peralatan keamanan. Katalog produk dengan spesifikasi, referensi proyek, dan sistem permintaan penawaran.',
    tags: ['WordPress', 'WooCommerce', 'Catalog Theme'],
  }),
  entry({
    title: 'Toilet Portabel',
    platform: 'website',
    category: C.SERVICES,
    image: '/assets/cover/toilet-portabel.webp',
    url: 'https://toiletportabel.wreative.com/',
    description:
      'Portable toilet rental and services. Product listings with pricing, event booking calendar, and service area information.',
    descriptionId:
      'Penyewaan dan layanan toilet portabel. Daftar produk dengan harga, kalender pemesanan acara, dan informasi area layanan.',
    tags: ['WordPress', 'Booking Calendar', 'SEO'],
  }),
  entry({
    title: 'PT Modern Coco International',
    platform: 'website',
    category: C.BUSINESS,
    image: '/assets/cover/pt-modern-coco-international.webp',
    url: 'https://ptmoderncocointernational.wreative.com/',
    description:
      'International trading company corporate website. Global business profile, product sourcing information, and international partner network.',
    descriptionId:
      'Situs web korporat perusahaan trading internasional. Profil bisnis global, informasi sourcing produk, dan jaringan mitra internasional.',
    tags: ['WordPress', 'Multilingual', 'Corporate Theme'],
  }),
  entry({
    title: 'Spesialis Karangan Bunga Indonesia',
    platform: 'website',
    category: C.FLORIST,
    image: '/assets/cover/spesialis-karangan-bunga.webp',
    url: 'https://spesialiskaranganbungaindonesia.com',
    description:
      'Specialist flower arrangement and bouquet service. Stunning product galleries, occasion-based collections, and nationwide delivery information.',
    descriptionId:
      'Layanan spesialis rangkaian bunga dan buket. Galeri produk yang menakjubkan, koleksi berdasarkan acara, dan informasi pengiriman ke seluruh Indonesia.',
    tags: ['WordPress', 'WooCommerce', 'Custom Theme'],
  }),
  entry({
    title: 'BE MODE Indonesia',
    platform: 'website',
    category: C.ECOMMERCE,
    image: '/assets/cover/bemode.webp',
    url: 'https://bemodeofficial.com',
    description:
      'Fashion and lifestyle e-commerce brand. Trendy product displays, lookbook galleries, size guides, and seamless checkout flow.',
    descriptionId:
      'Brand e-commerce fashion dan gaya hidup. Tampilan produk yang trendy, galeri lookbook, panduan ukuran, dan alur checkout yang mulus.',
    tags: ['WordPress', 'WooCommerce', 'Fashion Theme'],
  }),
  entry({
    title: 'SG Academy',
    platform: 'website',
    category: C.EDUCATION,
    image: '/assets/cover/sg-academy.webp',
    url: 'https://sgacademy.co.id/',
    description:
      'Professional training academy website. Course catalog, instructor profiles, online enrollment, and learning management system integration.',
    descriptionId:
      'Situs web akademi pelatihan profesional. Katalog kursus, profil instruktur, pendaftaran online, dan integrasi sistem manajemen pembelajaran.',
    tags: ['WordPress', 'LMS', 'Registration System'],
  }),
  entry({
    title: 'Roby Saputra Grup',
    platform: 'website',
    category: C.BUSINESS,
    image: '/assets/cover/roby-saputra-grup.webp',
    url: 'https://robysaputragrup.com/',
    description:
      'Business group holding company profile. Multi-division overview, leadership team, and corporate achievements showcase.',
    descriptionId:
      'Profil perusahaan holding grup bisnis. Gambaran multi-divisi, tim kepemimpinan, dan pameran pencapaian korporat.',
    tags: ['WordPress', 'Corporate Theme', 'Multi-Site'],
  }),
  entry({
    title: 'Sakpattana Jawa Timur',
    platform: 'website',
    category: C.BUSINESS,
    image: '/assets/cover/sakpattana.webp',
    url: 'https://sakpattanajawatimur.wreative.com/',
    description:
      'Regional business branch website for East Java. Local services, regional news, and community engagement features.',
    descriptionId:
      'Situs web cabang bisnis regional untuk Jawa Timur. Layanan lokal, berita regional, dan fitur keterlibatan komunitas.',
    tags: ['WordPress', 'Regional Theme', 'SEO'],
  }),
  entry({
    title: 'CV Putra Kubota',
    platform: 'website',
    category: C.BUSINESS,
    image: '/assets/cover/cv-putra-kubota.webp',
    url: 'https://cvputrakubota.wreative.com/',
    description:
      'Agricultural equipment and machinery dealer. Product catalog with specs, spare parts ordering, and service center locator.',
    descriptionId:
      'Dealer alat dan mesin pertanian. Katalog produk dengan spesifikasi, pemesanan suku cadang, dan pencari lokasi service center.',
    tags: ['WordPress', 'Product Catalog', 'Contact Forms'],
  }),
  entry({
    title: 'Wahyu Dewanagari',
    platform: 'website',
    category: C.BUSINESS,
    image: '/assets/cover/wahyu-dewanagari.webp',
    url: 'https://wahyudewanagari.wreative.com/',
    description:
      'Cultural and arts foundation website. Event calendar, gallery of cultural performances, and community program information.',
    descriptionId:
      'Situs web yayasan budaya dan seni. Kalender acara, galeri pertunjukan budaya, dan informasi program komunitas.',
    tags: ['WordPress', 'Events Calendar', 'Gallery'],
  }),
  entry({
    title: 'Aviso',
    platform: 'website',
    category: C.BUSINESS,
    image: '/assets/cover/aviso.webp',
    url: 'https://aviso.wreative.com/',
    description:
      'Business consulting and advisory services. Service packages, consultant profiles, case studies, and client success stories.',
    descriptionId:
      'Layanan konsultasi dan penasihat bisnis. Paket layanan, profil konsultan, studi kasus, dan kisah kesuksesan klien.',
    tags: ['WordPress', 'Consulting Theme', 'Case Studies'],
  }),
  entry({
    title: 'LPK Furinkazan',
    platform: 'website',
    category: C.EDUCATION,
    image: '/assets/cover/lpk-furinkazan.webp',
    url: 'https://lpkfurinkazan.wreative.com/',
    description:
      'Japanese language and culture training institute. Course levels, instructor credentials, student testimonials, and Japan placement program information.',
    descriptionId:
      'Lembaga pelatihan bahasa dan budaya Jepang. Level kursus, kredensial instruktur, testimoni siswa, dan informasi program penempatan ke Jepang.',
    tags: ['WordPress', 'LMS', 'Registration Forms'],
  }),
];

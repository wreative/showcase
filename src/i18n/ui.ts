export const LANGUAGES = {
  en: 'English',
  id: 'Bahasa Indonesia',
} as const;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_LANGUAGE: Language = 'en';
export const LANGUAGE_STORAGE_KEY = 'wreative-lang';

const en = {
  'tab.all': 'All',
  'tab.website': 'Website',
  'tab.mobile': 'Mobile',

  'platform.website': 'website',
  'platform.mobile': 'mobile',

  'search.placeholder': 'Search projects...',

  'category.All': 'All',
  'category.Services': 'Services',
  'category.Business': 'Business',
  'category.Education': 'Education',
  'category.E-Commerce': 'E-Commerce',
  'category.Government': 'Government',
  'category.Florist & Gardening': 'Florist & Gardening',

  'alert.title': 'Announcement',
  'alert.body':
    'Not all websites are mirrored, and the <b>mirroring</b> is done to maintain the original theme we have created, in case there are any changes from the client side. Some functions may not work properly.',

  'footer.rights': 'All rights reserved.',

  'notfound.heading': 'Page Not Found',
  'notfound.body': "The page you're looking for doesn't exist or has been moved.",
  'notfound.back': 'Back to Showcase',

  'project.back': 'Showcase',
  'project.download': 'Download',
  'project.platform': 'Platform',
  'project.category': 'Category',
  'project.techStack': 'Tech Stack',
  'project.media': 'Media',
  'project.mediaCount': '{count} images',
  'project.mediaVideoSuffix': 'video',

  'card.imgSuffix': 'img',
  'card.vidSuffix': 'vid',

  'status.showing': 'Showing {platform} projects',
  'status.inCategory': 'in {category}',
};

const id: typeof en = {
  'tab.all': 'Semua',
  'tab.website': 'Situs Web',
  'tab.mobile': 'Mobile',

  'platform.website': 'situs web',
  'platform.mobile': 'mobile',

  'search.placeholder': 'Cari proyek...',

  'category.All': 'Semua',
  'category.Services': 'Layanan',
  'category.Business': 'Bisnis',
  'category.Education': 'Pendidikan',
  'category.E-Commerce': 'E-Commerce',
  'category.Government': 'Pemerintahan',
  'category.Florist & Gardening': 'Florist & Taman',

  'alert.title': 'Pengumuman',
  'alert.body':
    'Tidak semua situs web dicerminkan, dan <b>pencerminan</b> dilakukan untuk menjaga tema asli yang telah kami buat, apabila terjadi perubahan dari sisi klien. Beberapa fungsi mungkin tidak berjalan dengan baik.',

  'footer.rights': 'Hak cipta dilindungi.',

  'notfound.heading': 'Halaman Tidak Ditemukan',
  'notfound.body': 'Halaman yang Anda cari tidak ada atau telah dipindahkan.',
  'notfound.back': 'Kembali ke Showcase',

  'project.back': 'Showcase',
  'project.download': 'Unduh',
  'project.platform': 'Platform',
  'project.category': 'Kategori',
  'project.techStack': 'Teknologi',
  'project.media': 'Media',
  'project.mediaCount': '{count} gambar',
  'project.mediaVideoSuffix': 'video',

  'card.imgSuffix': 'gbr',
  'card.vidSuffix': 'vid',

  'status.showing': 'Menampilkan proyek {platform}',
  'status.inCategory': 'di {category}',
};

export const translations: Record<Language, typeof en> = { en, id };

export type TranslationKey = keyof typeof en;

export function getLanguage(): Language {
  const lang = document.documentElement.lang;
  return lang === 'id' ? 'id' : DEFAULT_LANGUAGE;
}

export function setLanguage(lang: Language): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // ignore
  }
  document.documentElement.lang = lang;
}

export function toggleLanguage(): Language {
  const next: Language = getLanguage() === 'en' ? 'id' : 'en';
  setLanguage(next);
  return next;
}

const CATEGORY_KEYS: Record<string, TranslationKey> = {
  All: 'category.All',
  Services: 'category.Services',
  Business: 'category.Business',
  Education: 'category.Education',
  'E-Commerce': 'category.E-Commerce',
  Government: 'category.Government',
  'Florist & Gardening': 'category.Florist & Gardening',
};

export function translateCategory(category: string, lang: Language): string {
  const key = CATEGORY_KEYS[category];
  return key ? translations[lang][key] : category;
}
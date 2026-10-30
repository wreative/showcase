export const SITE_URL = 'https://showcase.wreative.com';

export type Locale = 'en' | 'id';

/** `/` and `/project/x` for English, `/id/` and `/id/project/x` for Indonesian. */
export function localePath(lang: Locale, path: string): string {
  return lang === 'id' ? `/id${path}` : path;
}

export function alternatesFor(path: string) {
  return {
    en: `${SITE_URL}${localePath('en', path)}`,
    id: `${SITE_URL}${localePath('id', path)}`,
  };
}

import { getLanguage, translations, translateCategory, type Language } from '@/i18n/ui';

export const LANGUAGE_CHANGE_EVENT = 'language-change';

function translate(lang: Language, key: string, count?: string): string {
  const text = translations[lang][key as keyof typeof translations.en] ?? key;
  return count != null ? text.replace('{count}', count) : text;
}

export function applyTranslations(lang: Language = getLanguage()): void {
  document.documentElement.lang = lang;

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    el.textContent = translate(lang, el.dataset.i18n!, el.dataset.i18nCount);
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
    el.innerHTML = translate(lang, el.dataset.i18nHtml!);
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-placeholder]').forEach((el) => {
    (el as HTMLInputElement).placeholder = translate(lang, el.dataset.i18nPlaceholder!);
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-category]').forEach((el) => {
    el.textContent = translateCategory(el.dataset.i18nCategory!, lang);
  });

  // Label showing the currently selected category of a dropdown filter.
  document.querySelectorAll<HTMLElement>('[data-i18n-selected-category]').forEach((el) => {
    const trigger = el
      .closest('[data-category-filter]')
      ?.querySelector<HTMLElement>('[data-selected]');
    el.textContent = translateCategory(trigger?.dataset.selected ?? 'All', lang);
  });

  // Localized portfolio description (both languages rendered as data attributes).
  document.querySelectorAll<HTMLElement>('[data-i18n-description]').forEach((el) => {
    const { descEn, descId } = el.dataset;
    if (!descId) return;
    el.textContent = lang === 'id' ? descId : (descEn ?? el.textContent);
  });

  document.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: lang }));
}

applyTranslations();
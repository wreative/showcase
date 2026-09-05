import { onPageLoad } from '@/scripts/page-lifecycle';
import { getLanguage, translations, translateCategory } from '@/i18n/ui';
import { LANGUAGE_CHANGE_EVENT } from '@/scripts/i18n';

const ITEMS_PER_PAGE = 8;
const LOAD_DELAY_MS = 400;

interface CardEl extends HTMLElement {
  dataset: DOMStringMap & { title: string; platform: string; category: string };
}

function initLandingFilter(signal: AbortSignal) {
  const grid = document.getElementById('template-grid');
  const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  const platformTabs = document.getElementById('platform-tabs');
  const categoryTrigger = document.getElementById('category-trigger') as HTMLButtonElement | null;
  const emptyState = document.getElementById('empty-state');
  const gridLoading = document.getElementById('grid-loading');
  const statusEl = document.getElementById('platform-status');
  if (!grid || !searchInput || !platformTabs || !categoryTrigger || !emptyState || !gridLoading) return;

  const cards = Array.from(grid.querySelectorAll<CardEl>('[data-template-card]'));

  let searchQuery = '';
  let selectedPlatform: 'all' | 'website' | 'mobile' = 'all';
  let selectedCategory = categoryTrigger.dataset.selected ?? 'All';
  let visibleCount = ITEMS_PER_PAGE;
  let loading = false;

  function matches(card: CardEl): boolean {
    const matchesSearch = card.dataset.title.includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || card.dataset.platform === selectedPlatform;
    const matchesCategory = selectedCategory === 'All' || card.dataset.category === selectedCategory;
    return matchesSearch && matchesPlatform && matchesCategory;
  }

  function render() {
    const matching = cards.filter(matches);
    matching.forEach((card, i) => {
      card.classList.toggle('hidden', i >= visibleCount);
    });
    cards.filter((c) => !matching.includes(c)).forEach((card) => {
      card.classList.add('hidden');
    });
    emptyState!.classList.toggle('hidden', matching.length !== 0);
    gridLoading!.classList.toggle('hidden', !loading);

    if (statusEl) {
      if (selectedPlatform !== 'all') {
        const lang = getLanguage();
        const platformKey = `platform.${selectedPlatform}` as 'platform.website' | 'platform.mobile';
        let text = translations[lang]['status.showing'].replace(
          '{platform}',
          translations[lang][platformKey],
        );
        if (selectedCategory !== 'All') {
          text +=
            ' ' +
            translations[lang]['status.inCategory'].replace(
              '{category}',
              translateCategory(selectedCategory, lang),
            );
        }
        statusEl.textContent = text;
        statusEl.classList.remove('hidden');
      } else {
        statusEl.classList.add('hidden');
      }
    }
  }

  function resetPaging() {
    visibleCount = ITEMS_PER_PAGE;
    render();
  }

  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value;
    resetPaging();
  });

  platformTabs.querySelectorAll<HTMLButtonElement>('[data-platform]').forEach((tab) => {
    tab.addEventListener('click', () => {
      selectedPlatform = tab.dataset.platform as 'all' | 'website' | 'mobile';
      platformTabs.querySelectorAll<HTMLButtonElement>('[data-platform]').forEach((t) => {
        const active = t === tab;
        t.classList.toggle('bg-foreground', active);
        t.classList.toggle('text-background', active);
        t.classList.toggle('text-muted-foreground', !active);
        t.classList.toggle('hover:bg-muted', !active);
        t.classList.toggle('hover:text-foreground', !active);
      });
      resetPaging();
    });
  });

  document.addEventListener(
    'category-select',
    ((e: CustomEvent<string>) => {
      selectedCategory = e.detail;
      resetPaging();
    }) as EventListener,
    { signal },
  );

  document.addEventListener(
    LANGUAGE_CHANGE_EVENT,
    () => {
      render();
    },
    { signal },
  );

  function loadMore() {
    loading = true;
    render();
    setTimeout(() => {
      visibleCount += ITEMS_PER_PAGE;
      loading = false;
      render();
    }, LOAD_DELAY_MS);
  }

  window.addEventListener(
    'scroll',
    () => {
      const matching = cards.filter(matches);
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      if (nearBottom && !loading && visibleCount < matching.length) loadMore();
    },
    { passive: true, signal },
  );

  render();
}

onPageLoad(initLandingFilter);

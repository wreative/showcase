// Vanilla port of src/components/Lightbox.tsx.
//
// Exact behavior ported 1:1 from the React source:
// - Escape closes, ArrowLeft/ArrowRight navigate (window keydown, added on open/removed on close).
// - Wheel zooms, clamped 0.5-5, +/-0.15 per tick (handler on the image wrapper, not the overlay).
// - Mouse-drag pans while zoomed (scale > 1); cursor is 'grab'/'grabbing' while zoomed, 'default' otherwise.
// - Image transform is `scale(${scale}) translate(${x / scale}px, ${y / scale}px)` (note the division -
//   position is stored in screen pixels but must be un-scaled since it's applied inside the scale()).
// - resetZoom() runs on every index change (prev/next) and matches Reset button.
// - document.body.style.overflow = 'hidden' while open, restored on close.
// - Thumbnail dots render only when images.length > 1; clicking a dot before/after the current index
//   calls prev()/next() once (not a jump) - matches the original's single-step `onPrev`/`onNext` call.
// - Prev/Next nav buttons also render only when images.length > 1.
// - Clicking the backdrop itself (not any child) closes; toggling visibility uses the Tailwind `hidden`
//   class (not the native `hidden` attribute/property - see commit d82eab2: `[hidden]` loses to a later
//   `.flex` utility class of equal specificity, so the overlay would stay visible).

export interface LightboxController {
  open(index: number): void;
  close(): void;
}

import { getLanguage, translations } from '@/i18n/ui';

export function initLightbox(images: string[], title = ''): LightboxController {
  let currentIndex = 0;
  let scale = 1;
  let position = { x: 0, y: 0 };
  let isDragging = false;
  let dragStart = { x: 0, y: 0, px: 0, py: 0 };

  const hasMultiple = images.length > 1;

  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 z-[100] hidden items-center justify-center bg-black/95';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.dataset.i18nAria = 'lightbox.label';
  const tr = (k: 'lightbox.image' | 'lightbox.goto') => translations[getLanguage()][k];
  overlay.innerHTML = `
    <button type="button" data-action="close" aria-label="Close lightbox" data-i18n-aria="lightbox.close" class="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center bg-black/60 text-white transition-colors hover:bg-black/80">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
    </button>
    <div data-el="counter" class="absolute left-4 top-4 z-10 bg-black/60 px-2 py-1 text-sm tabular-nums text-white"></div>
    ${
      hasMultiple
        ? `
    <button type="button" data-action="prev" aria-label="Previous image" data-i18n-aria="lightbox.prev" class="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-black/60 text-white transition-colors hover:bg-black/80">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg>
    </button>
    <button type="button" data-action="next" aria-label="Next image" data-i18n-aria="lightbox.next" class="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-black/60 text-white transition-colors hover:bg-black/80">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
    </button>`
        : ''
    }
    <div data-el="imgwrap" class="flex max-h-[90vh] max-w-[90vw] items-center justify-center overflow-hidden">
      <img data-el="img" class="max-h-[90vh] max-w-full select-none object-contain transition-transform duration-200" draggable="false" />
    </div>
    <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 bg-black/60 px-2">
      <button type="button" data-action="zoomout" aria-label="Zoom out" data-i18n-aria="lightbox.zoomout" class="flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-white/80">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14" /></svg>
      </button>
      <span data-el="zoomlabel" class="min-w-[3ch] text-center text-xs tabular-nums text-white">100%</span>
      <button type="button" data-action="zoomin" aria-label="Zoom in" data-i18n-aria="lightbox.zoomin" class="flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-white/80">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" /></svg>
      </button>
      <div class="mx-1 h-4 w-px bg-white/40"></div>
      <button type="button" data-action="reset" aria-label="Reset zoom" data-i18n-aria="lightbox.reset" class="flex h-11 items-center px-2 text-xs text-white transition-colors hover:text-white/80">Reset</button>
    </div>
    ${hasMultiple ? `<div data-el="dots" class="absolute bottom-16 left-1/2 flex -translate-x-1/2"></div>` : ''}
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector<HTMLImageElement>('[data-el="img"]')!;
  const imgWrap = overlay.querySelector<HTMLElement>('[data-el="imgwrap"]')!;
  const counterEl = overlay.querySelector<HTMLElement>('[data-el="counter"]')!;
  const zoomLabelEl = overlay.querySelector<HTMLElement>('[data-el="zoomlabel"]')!;
  const dotsEl = overlay.querySelector<HTMLElement>('[data-el="dots"]');

  if (dotsEl) {
    dotsEl.innerHTML = images
      .map(
        (_, i) =>
          `<button type="button" data-dot="${i}" aria-label="${tr('lightbox.goto')} ${i + 1}" class="flex h-11 w-5 items-center justify-center"><span class="block h-1.5 w-1.5 bg-white/50 transition-all"></span></button>`
      )
      .join('');
  }
  const dotEls = dotsEl ? Array.from(dotsEl.querySelectorAll<HTMLButtonElement>('[data-dot]')) : [];

  function resetZoom() {
    scale = 1;
    position = { x: 0, y: 0 };
    applyTransform();
  }

  function applyTransform() {
    imgEl.style.transform = `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`;
    imgWrap.style.cursor = scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default';
    zoomLabelEl.textContent = `${Math.round(scale * 100)}%`;
  }

  function render() {
    resetZoom();
    imgEl.src = images[currentIndex];
    imgEl.alt = `${title || tr('lightbox.image')} - ${currentIndex + 1}`;
    counterEl.textContent = `${currentIndex + 1} / ${images.length}`;
    dotEls.forEach((dot, i) => {
      const active = i === currentIndex;
      const bar = dot.firstElementChild!;
      bar.classList.toggle('w-4', active);
      bar.classList.toggle('bg-white', active);
      bar.classList.toggle('bg-white/50', !active);
    });
  }

  function prev() {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    render();
  }
  function next() {
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    render();
  }

  function handleWheel(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    scale = Math.min(Math.max(0.5, scale + delta), 5);
    applyTransform();
  }
  function handleMouseDown(e: MouseEvent) {
    if (scale > 1) {
      isDragging = true;
      dragStart = { x: e.clientX, y: e.clientY, px: position.x, py: position.y };
      applyTransform();
    }
  }
  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    position = {
      x: dragStart.px + (e.clientX - dragStart.x),
      y: dragStart.py + (e.clientY - dragStart.y),
    };
    applyTransform();
  }
  function handleMouseUp() {
    isDragging = false;
    applyTransform();
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  let opener: Element | null = null;
  const siblings = () => Array.from(document.body.children).filter((el) => el !== overlay) as HTMLElement[];

  function open(index: number) {
    opener = document.activeElement;
    overlay.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', (translations[getLanguage()] as Record<string, string>)[el.dataset.i18nAria!]);
    });
    siblings().forEach((el) => el.setAttribute('inert', ''));
    currentIndex = index;
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    render();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    overlay.querySelector<HTMLElement>('[data-action="close"]')?.focus();
  }
  function close() {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKey);
    siblings().forEach((el) => el.removeAttribute('inert'));
    (opener as HTMLElement | null)?.focus?.();
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  overlay.querySelector('[data-action="close"]')?.addEventListener('click', close);
  overlay.querySelector('[data-action="prev"]')?.addEventListener('click', (e) => {
    e.stopPropagation();
    prev();
  });
  overlay.querySelector('[data-action="next"]')?.addEventListener('click', (e) => {
    e.stopPropagation();
    next();
  });
  overlay.querySelector('[data-action="zoomout"]')?.addEventListener('click', () => {
    scale = Math.max(0.5, scale - 0.25);
    applyTransform();
  });
  overlay.querySelector('[data-action="zoomin"]')?.addEventListener('click', () => {
    scale = Math.min(5, scale + 0.25);
    applyTransform();
  });
  overlay.querySelector('[data-action="reset"]')?.addEventListener('click', resetZoom);

  dotEls.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      if (i < currentIndex) prev();
      else if (i > currentIndex) next();
    });
  });

  imgWrap.addEventListener('wheel', handleWheel, { passive: false });
  imgWrap.addEventListener('mousedown', handleMouseDown);
  imgWrap.addEventListener('mousemove', handleMouseMove);
  imgWrap.addEventListener('mouseup', handleMouseUp);
  imgWrap.addEventListener('mouseleave', handleMouseUp);

  return { open, close };
}

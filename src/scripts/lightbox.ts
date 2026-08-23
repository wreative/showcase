// Vanilla port of src/components/Lightbox.tsx.
//
// Exact behavior ported 1:1 from the React source:
// - Escape closes, ArrowLeft/ArrowRight navigate (window keydown, added on open/removed on close).
// - Wheel zooms, clamped 0.5-5, +/-0.15 per tick (handler on the image wrapper, not the overlay).
// - Mouse-drag pans while zoomed (scale > 1); cursor is 'grab'/'grabbing' while zoomed, 'default' otherwise.
// - Image transform is `scale(${scale}) translate(${x / scale}px, ${y / scale}px)` (note the division —
//   position is stored in screen pixels but must be un-scaled since it's applied inside the scale()).
// - resetZoom() runs on every index change (prev/next) and matches Reset button.
// - document.body.style.overflow = 'hidden' while open, restored on close.
// - Thumbnail dots render only when images.length > 1; clicking a dot before/after the current index
//   calls prev()/next() once (not a jump) — matches the original's single-step `onPrev`/`onNext` call.
// - Prev/Next nav buttons also render only when images.length > 1.
// - Clicking the backdrop itself (not any child) closes; toggling visibility uses the Tailwind `hidden`
//   class (not the native `hidden` attribute/property — see commit d82eab2: `[hidden]` loses to a later
//   `.flex` utility class of equal specificity, so the overlay would stay visible).

export interface LightboxController {
  open(index: number): void;
  close(): void;
}

export function initLightbox(images: string[]): LightboxController {
  let currentIndex = 0;
  let scale = 1;
  let position = { x: 0, y: 0 };
  let isDragging = false;
  let dragStart = { x: 0, y: 0, px: 0, py: 0 };

  const hasMultiple = images.length > 1;

  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 z-[100] hidden items-center justify-center bg-black/95';
  overlay.innerHTML = `
    <button type="button" data-action="close" aria-label="Close lightbox" class="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
    </button>
    <div data-el="counter" class="absolute left-4 top-4 z-10 text-sm tabular-nums text-white/70"></div>
    ${
      hasMultiple
        ? `
    <button type="button" data-action="prev" aria-label="Previous image" class="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg>
    </button>
    <button type="button" data-action="next" aria-label="Next image" class="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
    </button>`
        : ''
    }
    <div data-el="imgwrap" class="flex max-h-[90vh] max-w-[90vw] items-center justify-center overflow-hidden">
      <img data-el="img" class="max-h-[90vh] max-w-full select-none object-contain transition-transform duration-200" draggable="false" />
    </div>
    <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
      <button type="button" data-action="zoomout" aria-label="Zoom out" class="p-1 text-white/70 transition-colors hover:text-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14" /></svg>
      </button>
      <span data-el="zoomlabel" class="min-w-[3ch] text-center text-xs tabular-nums text-white/70">100%</span>
      <button type="button" data-action="zoomin" aria-label="Zoom in" class="p-1 text-white/70 transition-colors hover:text-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" /></svg>
      </button>
      <div class="mx-1 h-4 w-px bg-white/20"></div>
      <button type="button" data-action="reset" aria-label="Reset zoom" class="p-1 text-xs text-white/70 transition-colors hover:text-white">Reset</button>
    </div>
    ${hasMultiple ? `<div data-el="dots" class="absolute bottom-14 left-1/2 flex -translate-x-1/2 gap-1.5"></div>` : ''}
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
          `<button type="button" data-dot="${i}" aria-label="Go to image ${i + 1}" class="h-1.5 w-1.5 rounded-full transition-all bg-white/40 hover:bg-white/60"></button>`
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
    imgEl.alt = `Gallery image ${currentIndex + 1}`;
    counterEl.textContent = `${currentIndex + 1} / ${images.length}`;
    dotEls.forEach((dot, i) => {
      const active = i === currentIndex;
      dot.classList.toggle('w-4', active);
      dot.classList.toggle('bg-white', active);
      dot.classList.toggle('bg-white/40', !active);
      dot.classList.toggle('hover:bg-white/60', !active);
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

  function open(index: number) {
    currentIndex = index;
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    render();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
  }
  function close() {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKey);
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

// Lottie player loader.
//
// Registers the <dotlottie-wc> custom element (web component) used by
// LottiePlayer.astro. The element self-initialises when connected and
// cleans itself up on disconnect, so no manual lifecycle management
// (astro:page-load / astro:before-swap) is required.
//
// The optional `fit` scaling mode (contain/cover/fill/...) is not exposed
// as an HTML attribute. In dotlottie-wc v0.9.x the element only has a
// `get layout` accessor (no setter), so it MUST be applied through the core
// instance: `player.dotLottie.setLayout({ fit, align })`, after the element's
// `load` event fires (per the official docs).

import '@lottiefiles/dotlottie-wc';

// Supported fit modes, matching the dotLottie `Fit` type.
type Fit = 'contain' | 'cover' | 'fill' | 'none' | 'fit-width' | 'fit-height';

const FITS = new Set<Fit>(['contain', 'cover', 'fill', 'none', 'fit-width', 'fit-height']);

// <dotlottie-wc> exposes the core DotLottie instance as a property.
// NOTE: the element itself has no `layout` setter in v0.9.x - assigning
// `el.layout = ...` is a silent no-op. Only the core's setLayout() works.
interface DotLottieElement extends HTMLElement {
  dotLottie?: {
    setLayout: (layout: { fit: Fit; align: [number, number] }) => void;
    isLoaded: boolean;
  } | null;
}

function applyFit(el: HTMLElement): void {
  const fit = el.getAttribute('data-fit');

  if (!fit || !FITS.has(fit as Fit)) return;

  const player = el as DotLottieElement;
  const apply = () => {
    player.dotLottie?.setLayout({ fit: fit as Fit, align: [0.5, 0.5] });
  };

  // Per the official docs the core instance is only usable after the
  // element's `load` event fires, so gate on `isLoaded` with a short
  // polling fallback for animations that finished loading before this
  // listener was attached (e.g. cached asset). The poll also stops when
  // the element is disconnected.
  if (player.dotLottie?.isLoaded) {
    apply();
    return;
  }

  let polls = 0;
  const poll = window.setInterval(() => {
    polls += 1;
    if (el.isConnected && player.dotLottie?.isLoaded) {
      window.clearInterval(poll);
      apply();
    } else if (polls > 20 || !el.isConnected) {
      window.clearInterval(poll);
    }
  }, 50);

  el.addEventListener(
    'load',
    () => {
      window.clearInterval(poll);
      apply();
    },
    { once: true }
  );
}

function initFits(): void {
  document.querySelectorAll<HTMLElement>('dotlottie-wc[data-fit]').forEach(applyFit);
}

document.addEventListener('astro:page-load', () => initFits());

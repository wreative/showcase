// Wraps page-init logic so it (re)runs on every client-side navigation
// (`astro:page-load` fires on first load AND every swap), and auto-removes
// any `document`/`window` listeners it registered before the *next*
// navigation, via `astro:before-swap`. Without this, listeners bound to
// `document`/`window` (which survive a swap, unlike page content) would
// stack up one extra copy per revisit.
export function onPageLoad(setup: (signal: AbortSignal) => void): void {
  document.addEventListener('astro:page-load', () => {
    const controller = new AbortController();
    setup(controller.signal);
    document.addEventListener('astro:before-swap', () => controller.abort(), {
      once: true,
    });
  });
}

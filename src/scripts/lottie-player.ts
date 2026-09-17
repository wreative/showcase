// Lottie player loader.
//
// Registers the <dotlottie-wc> custom element (web component) used by
// LottiePlayer.astro. The element self-initialises when connected and
// cleans itself up on disconnect, so no manual lifecycle management
// (astro:page-load / astro:before-swap) is required.

import '@lottiefiles/dotlottie-wc';

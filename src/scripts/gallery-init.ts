import { initGallerySwiper } from './gallery-swiper';
import { initLightbox } from './lightbox';

let destroySwiper: (() => void) | null = null;

export function setup() {
	const el = document.getElementById('gallery-swiper');

	if (!el) {
		if (destroySwiper) {
			destroySwiper();
			destroySwiper = null;
		}
		return;
	}

	// Already initialized -- Swiper stores instance on element
	if ((el as any).swiper) return;

	const imageSrcs = Array.from(
		el.querySelectorAll<HTMLImageElement>('[data-gallery-type="image"] img'),
	).map((img) => img.src);

	const lightbox = initLightbox(imageSrcs);
	const swiper = initGallerySwiper(el, (imageIndex) => lightbox.open(imageIndex));

	destroySwiper = () => {
		swiper.destroy(true, true);
		lightbox.close();
	};

	const dotsContainer = document.getElementById('gallery-dots');
	if (dotsContainer && swiper.slides.length > 1) {
		const total = swiper.slides.length;
		const createDots = () => {
			dotsContainer.innerHTML = '';
			for (let i = 0; i < total; i++) {
				const dot = document.createElement('button');
				dot.type = 'button';
				dot.className = `h-1.5 w-1.5 rounded-full transition-all ${i === swiper.activeIndex ? 'w-4 bg-foreground' : 'bg-foreground/20 hover:bg-foreground/40'}`;
				dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
				dot.addEventListener('click', () => swiper.slideTo(i));
				dotsContainer.appendChild(dot);
			}
		};
		createDots();
		swiper.on('slideChange', () => {
			const dots = dotsContainer.querySelectorAll('button');
			dots.forEach((dot, i) => {
				const active = i === swiper.activeIndex;
				dot.classList.toggle('w-4', active);
				dot.classList.toggle('bg-foreground', active);
				dot.classList.toggle('bg-foreground/20', !active);
				dot.classList.toggle('hover:bg-foreground/40', !active);
			});
		});
	}
}

// Expose to window so inline scripts in detail pages can trigger init
(window as any).__initGallery = setup;

// Cleanup before leaving the page
document.addEventListener('astro:before-swap', () => {
	if (destroySwiper) {
		destroySwiper();
		destroySwiper = null;
	}
});

// Also listen for page-load for direct page loads (non-SPA)
document.addEventListener('astro:page-load', () => {
	requestAnimationFrame(() => setup());
});
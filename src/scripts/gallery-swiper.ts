import Swiper from 'swiper';
import { Keyboard, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';

export function initGallerySwiper(
  container: HTMLElement,
  onImageClick: (imageIndex: number) => void
) {
  const prevEl = container.parentElement?.querySelector<HTMLElement>('#gallery-prev') ?? null;
  const nextEl = container.parentElement?.querySelector<HTMLElement>('#gallery-next') ?? null;

  // Swiper's Navigation module automatically disables the prev button at the
  // first slide and the next button at the last slide (sets the `disabled`
  // attribute on <button> elements + the `swiper-button-disabled` class).
  const swiper = new Swiper(container, {
    modules: [Keyboard, Navigation],
    spaceBetween: 12,
    slidesPerView: 1,
    ...(prevEl && nextEl ? { navigation: { prevEl, nextEl } } : {}),
  });

  const imageSlides = Array.from(
    container.querySelectorAll<HTMLElement>('.swiper-slide[data-gallery-type="image"]')
  );
  imageSlides.forEach((slide, imageIndex) => {
    slide.addEventListener('click', () => onImageClick(imageIndex));
  });

  return swiper;
}

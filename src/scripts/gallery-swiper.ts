import Swiper from 'swiper';
import { Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/keyboard';

export function initGallerySwiper(
  container: HTMLElement,
  onImageClick: (imageIndex: number) => void,
) {
  const swiper = new Swiper(container, {
    modules: [Keyboard],
    spaceBetween: 12,
    slidesPerView: 1,
  });

  const imageSlides = Array.from(
    container.querySelectorAll<HTMLElement>('.swiper-slide[data-gallery-type="image"]'),
  );
  imageSlides.forEach((slide, imageIndex) => {
    slide.addEventListener('click', () => onImageClick(imageIndex));
  });

  return swiper;
}
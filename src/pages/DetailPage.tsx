import React, { useMemo, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { portfolios } from '@/data/portfolio';
import type { GalleryItem } from '@/data/portfolio';
import Lightbox from '@/components/Lightbox';
import ThemeToggle from '@/components/ThemeToggle';
import BrandLogo from '@/components/BrandLogo';
import 'swiper/css';

// -- Gallery Swiper --

const GallerySwiper: React.FC<{
  items: GalleryItem[];
  onImageClick: (index: number) => void;
}> = ({ items, onImageClick }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const imageIndices = useMemo(() => {
    const map: number[] = [];
    items.forEach((item, i) => {
      if (item.type === 'image') map.push(i);
    });
    return map;
  }, [items]);

  const isMulti = items.length > 1;

  const goPrev = useCallback(() => swiper?.slidePrev(), [swiper]);
  const goNext = useCallback(() => swiper?.slideNext(), [swiper]);

  return (
    <div>
      <div className="group/swiper relative">
        <Swiper
          modules={[Keyboard]}
          spaceBetween={12}
          slidesPerView={1}
          keyboard={{ enabled: true }}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActiveIdx(s.activeIndex)}
          className="overflow-hidden rounded-xl bg-muted/30"
        >
          {items.map((item) => (
            <SwiperSlide key={item.src}>
              {item.type === 'image' ? (
                <button
                  type="button"
                  onClick={() => {
                    const lightboxIdx = imageIndices.indexOf(items.indexOf(item));
                    if (lightboxIdx >= 0) onImageClick(lightboxIdx);
                  }}
                  className="block w-full cursor-zoom-in focus:outline-none"
                >
                  <img
                    src={item.src}
                    alt="Gallery"
                    className="h-auto max-h-[70vh] w-full bg-muted/20 object-contain"
                  />
                </button>
              ) : (
                <video
                  src={item.src}
                  poster={item.poster}
                  controls
                  preload="metadata"
                  className="h-auto max-h-[70vh] w-full bg-muted/20 object-contain"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom nav arrows */}
        {isMulti && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 transition-opacity hover:bg-black/50 group-hover/swiper:opacity-100"
              aria-label="Previous slide"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 transition-opacity hover:bg-black/50 group-hover/swiper:opacity-100"
              aria-label="Next slide"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Zoom hint */}
        <div className="pointer-events-none absolute right-3 top-3 z-10 select-none rounded-md bg-black/50 px-2.5 py-1 text-xs text-white/60">
          Click image to zoom
        </div>
      </div>

      {/* Custom dots — below the asset */}
      {isMulti && (
        <div className="mt-3 flex justify-center gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => swiper?.slideTo(i)}
              className={`rounded-full transition-all ${
                i === activeIdx
                  ? 'h-1.5 w-4 bg-foreground'
                  : 'h-1.5 w-1.5 bg-foreground/20 hover:bg-foreground/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// -- Detail Page --

const DetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const template = portfolios.find((t) => t.slug === slug);

  const imageSrcs = useMemo(
    () => template?.gallery.filter((i) => i.type === 'image').map((i) => i.src as string) ?? [],
    [template]
  );

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Helmet>
          <title>Project Not Found — Wreative Showcase</title>
        </Helmet>
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Project Not Found</h1>
          <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
            &larr; Back to Showcase
          </Link>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev === 0 ? imageSrcs.length - 1 : prev - 1) : null
    );
  };

  const handleNext = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev === imageSrcs.length - 1 ? 0 : prev + 1) : null
    );
  };

  const projectUrl = `https://showcase.wreative.com/project/${template.slug}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{template.title} — Wreative Showcase</title>
        <meta name="description" content={template.description} />
        <link rel="canonical" href={projectUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: template.title,
            url: template.url,
            description: template.description,
            creator: { '@id': 'https://showcase.wreative.com/#person' },
            provider: { '@id': 'https://showcase.wreative.com/#org' },
            keywords: template.tags.join(', '),
            about: template.category,
          })}
        </script>
      </Helmet>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link
            to="/"
            className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform group-hover:-translate-x-0.5"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Showcase</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <BrandLogo className="h-5 w-7" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium capitalize text-muted-foreground">
            {template.platform}
          </span>
        </div>

        <section className="mb-8">
          <GallerySwiper
            items={template.gallery}
            onImageClick={(index) => setLightboxIndex(index)}
          />
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {template.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{template.title}</h1>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              {template.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-4 rounded-xl border border-border bg-card p-5">
              {template.platform === 'mobile' ? (
                (template.playStoreUrl || template.appStoreUrl) && (
                  <div>
                    <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
                      Live App
                    </p>
                    <div className="flex flex-col gap-2">
                      {template.playStoreUrl && (
                        <a
                          href={template.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 1.658l10.937 6.333-2.302 2.302-8.635-8.635z" />
                          </svg>
                          Play Store
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          >
                            <path d="M7 17L17 7M7 7h10v10" />
                          </svg>
                        </a>
                      )}
                      {template.appStoreUrl && (
                        <a
                          href={template.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                          </svg>
                          App Store
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          >
                            <path d="M7 17L17 7M7 7h10v10" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )
              ) : (
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                    Live Website
                  </p>
                  <a
                    href={template.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    Visit Site
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              )}
              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                  Platform
                </p>
                <p className="text-sm capitalize">{template.platform}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                  Category
                </p>
                <p className="text-sm">{template.category}</p>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {template.gallery.length > 1 && (
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                    Media
                  </p>
                  <p className="text-sm">
                    {template.gallery.filter((i) => i.type === 'image').length} images
                    {template.gallery.some((i) => i.type === 'video') &&
                      ` + ${template.gallery.filter((i) => i.type === 'video').length} video`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {lightboxIndex !== null && imageSrcs.length > 0 && (
        <Lightbox
          images={imageSrcs}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default DetailPage;

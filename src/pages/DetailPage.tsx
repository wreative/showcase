import React, { useMemo, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { portfolios } from "@/data/portfolio";
import type { GalleryItem } from "@/data/portfolio";
import Lightbox from "@/components/Lightbox";
import ThemeToggle from "@/components/ThemeToggle";
import BrandLogo from "@/components/BrandLogo";
import "swiper/css";

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
      if (item.type === "image") map.push(i);
    });
    return map;
  }, [items]);

  const isMulti = items.length > 1;

  const goPrev = useCallback(() => swiper?.slidePrev(), [swiper]);
  const goNext = useCallback(() => swiper?.slideNext(), [swiper]);

  return (
    <div>
      <div className="relative group/swiper">
        <Swiper
          modules={[Keyboard]}
          spaceBetween={12}
          slidesPerView={1}
          keyboard={{ enabled: true }}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActiveIdx(s.activeIndex)}
          className="rounded-xl overflow-hidden bg-muted/30"
        >
          {items.map((item) => (
            <SwiperSlide key={item.src}>
              {item.type === "image" ? (
                <button
                  type="button"
                  onClick={() => {
                    const lightboxIdx = imageIndices.indexOf(
                      items.indexOf(item),
                    );
                    if (lightboxIdx >= 0) onImageClick(lightboxIdx);
                  }}
                  className="block w-full cursor-zoom-in focus:outline-none"
                >
                  <img
                    src={item.src}
                    alt="Gallery"
                    className="w-full h-auto max-h-[70vh] object-contain bg-muted/20"
                  />
                </button>
              ) : (
                <video
                  src={item.src}
                  poster={item.poster}
                  controls
                  preload="metadata"
                  className="w-full h-auto max-h-[70vh] object-contain bg-muted/20"
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
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/swiper:opacity-100 transition-opacity"
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
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/swiper:opacity-100 transition-opacity"
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
        <div className="absolute top-3 right-3 z-10 bg-black/50 rounded-md px-2.5 py-1 text-white/60 text-xs pointer-events-none select-none">
          Click image to zoom
        </div>
      </div>

      {/* Custom dots — below the asset */}
      {isMulti && (
        <div className="flex justify-center gap-1.5 mt-3">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => swiper?.slideTo(i)}
              className={`rounded-full transition-all ${
                i === activeIdx
                  ? "w-4 h-1.5 bg-foreground"
                  : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/40"
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
    () =>
      template?.gallery
        .filter((i) => i.type === "image")
        .map((i) => i.src as string) ?? [],
    [template],
  );

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Helmet>
          <title>Project Not Found — Wreative Showcase</title>
        </Helmet>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Project Not Found
          </h1>
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Back to Showcase
          </Link>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev === 0 ? imageSrcs.length - 1 : prev - 1) : null,
    );
  };

  const handleNext = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev === imageSrcs.length - 1 ? 0 : prev + 1) : null,
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
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: template.title,
            url: template.url,
            description: template.description,
            creator: { "@id": "https://showcase.wreative.com/#person" },
            provider: { "@id": "https://showcase.wreative.com/#org" },
            keywords: template.tags.join(", "),
            about: template.category,
          })}
        </script>
      </Helmet>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:-translate-x-0.5 transition-transform"
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

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 text-xs font-medium rounded bg-muted text-muted-foreground capitalize">
            {template.platform}
          </span>
        </div>

        <section className="mb-8">
          <GallerySwiper
            items={template.gallery}
            onImageClick={(index) => setLightboxIndex(index)}
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                  {template.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {template.title}
              </h1>
            </div>

            <p className="text-muted-foreground text-base leading-relaxed">
              {template.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-md bg-muted text-muted-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-card border border-border p-5 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Live Website
                </p>
                <a
                  href={template.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg font-medium text-sm hover:opacity-90 transition-opacity group"
                >
                  Visit Site
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  >
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Platform
                </p>
                <p className="text-sm capitalize">{template.platform}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Category
                </p>
                <p className="text-sm">{template.category}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {template.gallery.length > 1 && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Media
                  </p>
                  <p className="text-sm">
                    {template.gallery.filter((i) => i.type === "image").length}{" "}
                    images
                    {template.gallery.some((i) => i.type === "video") &&
                      ` + ${template.gallery.filter((i) => i.type === "video").length} video`}
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

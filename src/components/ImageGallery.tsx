import React, { useRef, useState, useCallback, useMemo } from 'react';
import type { GalleryItem } from '@/data/portfolio';

interface ImageGalleryProps {
  items: GalleryItem[];
  onImageClick: (index: number) => void;
}

const sortVideosLast = (items: GalleryItem[]): GalleryItem[] => {
  const images = items.filter((i) => i.type === 'image');
  const videos = items.filter((i) => i.type === 'video');
  return [...images, ...videos];
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, onImageClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartX = useRef(0);
  const moved = useRef(false);

  const sorted = useMemo(() => sortVideosLast(items), [items]);
  const isMulti = sorted.length > 1;

  const updateActive = useCallback(() => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.clientWidth;
    if (w === 0) return;
    const raw = scrollRef.current.scrollLeft / w;
    setActiveIndex(
      Math.min(
        Math.max(raw - Math.floor(raw) >= 0.5 ? Math.ceil(raw) : Math.floor(raw), 0),
        sorted.length - 1
      )
    );
  }, [sorted.length]);

  // Only track drag vs click — NEVER preventDefault() (that kills native scroll)
  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    moved.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (Math.abs(e.clientX - pointerStartX.current) > 5) {
      moved.current = true;
    }
  };

  const onSlideClick = (idx: number) => {
    if (!moved.current) onImageClick(idx);
    moved.current = false;
  };

  const containerClass = isMulti ? 'flex overflow-x-auto snap-x snap-mandatory scrollbar-hide' : '';

  // ---- single item ----
  if (!isMulti) {
    const item = sorted[0];
    return (
      <div>
        <div className="overflow-hidden rounded-xl bg-muted">
          {item.type === 'image' ? (
            <img
              src={item.src}
              alt="Preview"
              draggable={false}
              onClick={() => onImageClick(0)}
              className="max-h-[70vh] w-full select-none object-contain"
              style={
                {
                  cursor: 'zoom-in',
                  userDrag: 'none',
                  WebkitUserDrag: 'none',
                } as React.CSSProperties
              }
            />
          ) : (
            <video
              src={item.src}
              poster={item.poster}
              controls
              preload="metadata"
              className="max-h-[70vh] w-full bg-black object-contain"
            />
          )}
        </div>
        {item.type === 'image' && <ZoomHint />}
      </div>
    );
  }

  // ---- multi item ----
  return (
    <div className="relative select-none">
      <div
        ref={scrollRef}
        className={containerClass}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onScroll={updateActive}
        style={{ touchAction: 'pan-x' }}
      >
        {sorted.map((item, i) => (
          <div
            key={i}
            className="min-w-full flex-shrink-0 snap-center"
            onClick={() => onSlideClick(i)}
          >
            <div className="overflow-hidden rounded-xl bg-muted">
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={`Slide ${i + 1}`}
                  draggable={false}
                  className="max-h-[70vh] w-full select-none object-contain"
                  style={
                    {
                      userDrag: 'none',
                      WebkitUserDrag: 'none',
                      cursor: 'zoom-in',
                    } as React.CSSProperties
                  }
                />
              ) : (
                <video
                  src={item.src}
                  poster={item.poster}
                  controls
                  preload="metadata"
                  className="max-h-[70vh] w-full bg-black object-contain"
                />
              )}
            </div>
            {item.type === 'video' && <VideoBadge />}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-3 flex justify-center gap-1.5">
        {sorted.map((_, i) => (
          <button
            key={i}
            onClick={() =>
              scrollRef.current?.scrollTo({
                left: i * scrollRef.current.clientWidth,
                behavior: 'smooth',
              })
            }
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-6 bg-foreground'
                : 'w-1.5 bg-foreground/30 hover:bg-foreground/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <ZoomHint />
    </div>
  );
};

const ZoomHint: React.FC = () => (
  <div className="pointer-events-none absolute right-3 top-3 select-none rounded-md bg-black/50 px-2.5 py-1 text-xs text-white/60">
    Click to zoom
  </div>
);

const VideoBadge: React.FC = () => (
  <div className="pointer-events-none absolute left-3 top-3 flex select-none items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1 text-xs text-white/75">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
    Video
  </div>
);

export default ImageGallery;

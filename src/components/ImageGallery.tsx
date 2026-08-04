import React, { useRef, useState, useCallback, useMemo } from "react";
import type { GalleryItem } from "@/data/template";

interface ImageGalleryProps {
  items: GalleryItem[];
  onImageClick: (index: number) => void;
}

const sortVideosLast = (items: GalleryItem[]): GalleryItem[] => {
  const images = items.filter((i) => i.type === "image");
  const videos = items.filter((i) => i.type === "video");
  return [...images, ...videos];
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, onImageClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const didDrag = useRef(false);

  const sorted = useMemo(() => sortVideosLast(items), [items]);

  // Count image-type items
  const imageCount = useMemo(
    () => sorted.filter((i) => i.type === "image").length,
    [sorted],
  );

  const isMulti = sorted.length > 1;

  // -- Drag handlers --
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMulti || !scrollRef.current) return;
    setIsDragging(true);
    didDrag.current = false;
    dragStart.current = { x: e.clientX, scrollLeft: scrollRef.current.scrollLeft };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMulti || !isDragging || !scrollRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    if (Math.abs(dx) > 3) didDrag.current = true;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleClick = (idx: number) => {
    if (!isMulti || !didDrag.current) onImageClick(idx);
  };

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    setActiveIndex(Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth));
  }, []);

  if (sorted.length === 0) return null;

  // -- Single item: static display --
  if (!isMulti) {
    const item = sorted[0];
    return (
      <div className="relative">
        <div className="rounded-xl overflow-hidden bg-muted">
          {item.type === "image" ? (
            <img
              src={item.src}
              alt="Preview"
              className="w-full max-h-[70vh] object-contain cursor-zoom-in"
              draggable={false}
              onClick={() => onImageClick(0)}
            />
          ) : (
            <video
              src={item.src}
              poster={item.poster}
              controls
              preload="metadata"
              className="w-full max-h-[70vh] object-contain bg-black"
            />
          )}
        </div>
        {item.type === "image" && (
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1 text-white/70 text-xs pointer-events-none">
            Click to zoom
          </div>
        )}
      </div>
    );
  }

  // -- Multi-item: scrollable gallery --
  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onScroll={handleScroll}
      >
        {sorted.map((item, i) => (
          <div
            key={i}
            className="min-w-full snap-center flex-shrink-0"
            onClick={() => item.type === "image" && handleClick(i)}
          >
            <div className="rounded-xl overflow-hidden bg-muted">
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={`Screenshot ${i + 1}`}
                  className="w-full max-h-[70vh] object-contain cursor-zoom-in"
                  draggable={false}
                />
              ) : (
                <video
                  src={item.src}
                  poster={item.poster}
                  controls
                  preload="metadata"
                  className="w-full max-h-[70vh] object-contain bg-black"
                />
              )}
            </div>
            {item.type === "video" && (
              <VideoBadge />
            )}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {sorted.map((_, i) => (
          <button
            key={i}
            onClick={() =>
              scrollRef.current?.scrollTo({
                left: i * scrollRef.current.clientWidth,
                behavior: "smooth",
              })
            }
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-6 bg-foreground"
                : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Zoom hint — only if there are images */}
      {imageCount > 0 && (
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1 text-white/70 text-xs pointer-events-none">
          Click image to zoom
        </div>
      )}
    </div>
  );
};

const VideoBadge: React.FC = () => (
  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1 text-white/80 text-xs pointer-events-none flex items-center gap-1.5">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
    Video
  </div>
);

export default ImageGallery;

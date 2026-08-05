import React from "react";
import { Link } from "react-router-dom";
import type { PortfolioItem } from "@/data/portfolio";

interface TemplateCardProps {
  template: PortfolioItem;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <Link
      to={`/project/${template.slug}`}
      className="group relative overflow-hidden rounded-xl bg-card border border-border cursor-pointer block
        hover:border-foreground/20 transition-colors duration-300"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={template.image}
          alt={template.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay — subtle, only at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Title + category */}
      <div className="absolute bottom-0 inset-x-0 p-5">
        <div className="flex items-end justify-between gap-2">
          <h2 className="text-lg font-semibold text-white leading-tight">
            {template.title}
          </h2>
          <span className="shrink-0 px-2.5 py-0.5 text-xs font-medium rounded-full bg-white/15 text-white/90">
            {template.category}
          </span>
        </div>
      </div>

      {/* Platform badge — top-left */}
      <span className="absolute top-3 left-3 px-2 py-0.5 text-[11px] font-medium rounded-md bg-black/50 text-white/70 capitalize">
        {template.platform}
      </span>

      {/* Media count badge — top-right, only when multi-item */}
      {template.gallery.length > 1 && (
        <span className="absolute top-3 right-3 px-2 py-0.5 text-[11px] rounded-md bg-black/50 text-white/70">
          {template.gallery.filter((i) => i.type === "image").length} img
          {template.gallery.some((i) => i.type === "video") && " + vid"}
        </span>
      )}
    </Link>
  );
};

export default TemplateCard;

import React from "react";
import { Link } from "react-router-dom";
import type { PortfolioItem } from "@/data/portfolio";

interface TemplateCardProps {
  template: PortfolioItem;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <Link
      to={`/project/${template.id}`}
      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl bg-card border border-border cursor-pointer block"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={template.image}
          alt={template.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
        <div className="absolute bottom-0 p-6 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {template.title}
            </h2>
            <span className="px-3 py-1 text-sm bg-white/20 backdrop-blur-sm rounded-full text-white">
              {template.category}
            </span>
          </div>
        </div>
      </div>

      {/* Platform badge */}
      <div className="absolute top-3 left-3 capitalize px-2 py-0.5 text-xs rounded-md font-medium bg-black/40 backdrop-blur-sm text-white/80">
        {template.platform}
      </div>

      {/* Media badge */}
      {template.gallery.length > 1 && (
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-lg px-2 py-0.5 text-white/70 text-xs">
          {template.gallery.filter((i) => i.type === "image").length} images
          {template.gallery.some((i) => i.type === "video") && " + video"}
        </div>
      )}
    </Link>
  );
};

export default TemplateCard;

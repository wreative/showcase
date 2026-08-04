import React from "react";
import TemplateCard from "./TemplateCard";
import LoadingIndicator from "./LoadingIndicator";
import type { PortfolioItem } from "@/data/portfolio";

interface TemplateGridProps {
  templates: PortfolioItem[];
  loading: boolean;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ templates, loading }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {loading && <LoadingIndicator />}

      {templates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Nothing found matching your criteria.
          </p>
        </div>
      )}
    </>
  );
};

export default TemplateGrid;

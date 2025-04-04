import React from 'react';
import TemplateCard from './TemplateCard';
import LoadingIndicator from './LoadingIndicator';
import {TemplateData} from "@/data/template.tsx";

interface TemplateGridProps {
    templates: TemplateData[];
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
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        No templates found matching your criteria.
                    </p>
                </div>
            )}
        </>
    );
};

export default TemplateGrid;

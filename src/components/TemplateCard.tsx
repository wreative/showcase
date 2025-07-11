import React from 'react';
import {TemplateData} from '../data/template';

interface TemplateCardProps {
    template: TemplateData;
}

const getTrackedUrl = (url: string) => {
    try {
        const u = new URL(url);
        u.searchParams.set('utm_source', 'showcase');
        return u.toString();
    } catch {
        return url;
    }
};

const TemplateCard: React.FC<TemplateCardProps> = ({template}) => {
    return (
        <a
            href={getTrackedUrl(template.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800 cursor-pointer"
        >
            <div className="aspect-[16/9] overflow-hidden">
                <img
                    src={template.image}
                    alt={template.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <div className="absolute bottom-0 p-6 w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                            {template.title}
                        </h2>
                        <span className="px-3 py-1 text-sm bg-primary/20 backdrop-blur-sm rounded-full text-white">
              {template.category}
            </span>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default TemplateCard;

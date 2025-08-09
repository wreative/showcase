import React, {useEffect, useState} from 'react';
import './App.css';
import {TemplateData, templates} from "@/data/template.tsx";
import Header from './components/Header';
import TemplateGrid from './components/TemplateGrid';
import Footer from './components/Footer';
import {Alert, AlertDescription, AlertTitle} from './components/ui/alert';

// Constants
const ITEMS_PER_PAGE = 4;
const categories: string[] = ['All', ...new Set(templates.map(template => template.category))];

const App: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [visibleItems, setVisibleItems] = useState<number>(ITEMS_PER_PAGE);
    const [loading, setLoading] = useState<boolean>(false);

    // Filter templates based on search query and category
    const filteredTemplates: TemplateData[] = templates.filter(template => {
        const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Handle infinite scroll
    useEffect(() => {
        const handleScroll = (): void => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
                if (!loading && visibleItems < filteredTemplates.length) {
                    loadMore();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleItems, filteredTemplates.length, loading]);

    const loadMore = (): void => {
        setLoading(true);
        // Simulate loading delay
        setTimeout(() => {
            setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredTemplates.length));
            setLoading(false);
        }, 500);
    };

    // Reset visible items when filters change
    useEffect(() => {
        setVisibleItems(ITEMS_PER_PAGE);
    }, [searchQuery, selectedCategory]);

    const visibleTemplates: TemplateData[] = filteredTemplates.slice(0, visibleItems);

    return (
        <div
            className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
            />

            <main className="flex-1 w-full mx-auto px-2 py-4">
                <Alert className="mb-4">
                    <div>
                        <AlertTitle className="text-base font-semibold">Announcement</AlertTitle>
                        <AlertDescription className="text-sm text-muted-foreground">
                            Not all websites are mirrored, and the <b>mirroring</b> is done to maintain the original
                            theme we've created, in case there are any changes from the client's side. Some functions
                            may not work properly.
                        </AlertDescription>
                    </div>
                </Alert>
                <TemplateGrid
                    templates={visibleTemplates}
                    loading={loading}
                />
            </main>

            <Footer brandName="Wreative"/>
        </div>
    );
};

export default App;

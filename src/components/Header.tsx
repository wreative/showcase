import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import React from "react";

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    categories: string[];
}

const Header: React.FC<HeaderProps> = ({
                                           searchQuery,
                                           setSearchQuery,
                                           selectedCategory,
                                           setSelectedCategory,
                                           categories
                                       }) => {
    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
            <div className="w-full mx-auto">
                <div className="py-4 px-2">
                    {/* Logo and Title */}
                    <div className="flex items-center justify-between mb-4 px-2">
                        <div className="flex items-center space-x-2">
                            <img src="/assets/wreative.png" alt="Logo" className="h-6 w-9" />
                            <h1 className="text-2xl font-bold text-primary">Wreative Showcase</h1>
                        </div>
                    </div>

                    {/* Search and Category Filter */}
                    <div className="flex gap-2 px-2">
                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                        <CategoryFilter
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            categories={categories}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

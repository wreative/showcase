import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ThemeToggle from './ThemeToggle';
import BrandLogo from './BrandLogo';
import React from 'react';
import { Link } from 'react-router-dom';
import type { Platform } from '@/data/portfolio';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPlatform: Platform | 'all';
  setSelectedPlatform: (platform: Platform | 'all') => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedPlatform,
  setSelectedPlatform,
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  const tabs: { key: Platform | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'website', label: 'Website' },
    { key: 'mobile', label: 'Mobile' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2.5">
            <BrandLogo />
            <h1 className="text-xl font-bold text-foreground transition-colors group-hover:text-muted-foreground">
              Wreative Showcase
            </h1>
          </Link>
          <ThemeToggle />
        </div>

        <div className="mb-3 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedPlatform(tab.key)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedPlatform === tab.key
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

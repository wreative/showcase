import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import ThemeToggle from "./ThemeToggle";
import BrandLogo from "./BrandLogo";
import React from "react";
import { Link } from "react-router-dom";
import type { Platform } from "@/data/template";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPlatform: Platform | "all";
  setSelectedPlatform: (platform: Platform | "all") => void;
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
  const tabs: { key: Platform | "all"; label: string }[] = [
    { key: "all", label: "All" },
    { key: "website", label: "Website" },
    { key: "mobile", label: "Mobile" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <BrandLogo />
            <h1 className="text-xl font-bold text-foreground group-hover:text-muted-foreground transition-colors">
              Wreative Showcase
            </h1>
          </Link>
          <ThemeToggle />
        </div>

        {/* Platform tabs */}
        <div className="flex gap-1 mb-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedPlatform(tab.key)}
              className={`px-4 py-1.5 text-sm rounded-lg transition-colors font-medium ${
                selectedPlatform === tab.key
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
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

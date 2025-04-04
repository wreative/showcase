import { ChevronDown, GalleryHorizontal, Search, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import './App.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Data template dengan kategori
const templates = [
  {
    id: 1,
    title: "Modern Dashboard",
    category: "Admin",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    url: "https://example.com/templates/modern-dashboard"
  },
  {
    id: 2,
    title: "E-commerce Store",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2000&auto=format&fit=crop",
    url: "https://example.com/templates/ecommerce-store"
  },
  {
    id: 3,
    title: "Portfolio Site",
    category: "Portfolio",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2000&auto=format&fit=crop",
    url: "https://example.com/templates/portfolio-site"
  },
  {
    id: 4,
    title: "Blog Platform",
    category: "Blog",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop",
    url: "https://example.com/templates/blog-platform"
  },
  {
    id: 5,
    title: "Landing Page",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    url: "https://example.com/templates/landing-page"
  },
  {
    id: 6,
    title: "Admin Panel",
    category: "Admin",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    url: "https://example.com/templates/admin-panel"
  }
];

// Get unique categories
const categories = ['All', ...new Set(templates.map(template => template.category))];

const ITEMS_PER_PAGE = 4;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  // Filter templates based on search query and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        if (!loading && visibleItems < filteredTemplates.length) {
          loadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleItems, filteredTemplates.length, loading]);

  const loadMore = () => {
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

  const visibleTemplates = filteredTemplates.slice(0, visibleItems);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
        <div className="w-full mx-auto">
          <div className="py-4 px-2">
            {/* Logo and Title */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center space-x-2">
                <GalleryHorizontal className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-primary">Template Gallery</h1>
              </div>
            </div>
            
            {/* Search and Category Filter */}
            <div className="flex gap-2 px-2">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {/* Category Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                  {selectedCategory}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "bg-secondary" : ""}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full mx-auto px-2 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {visibleTemplates.map((template) => (
            <a
              key={template.id}
              href={template.url}
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
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          </div>
        )}

        {/* No Results Message */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No templates found matching your criteria.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="w-full mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-primary">Your Brand</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Your Brand. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
import React, { useEffect, useState, useCallback } from "react";
import { portfolios, type Platform } from "@/data/portfolio";
import Header from "@/components/Header";
import TemplateGrid from "@/components/TemplateGrid";
import Footer from "@/components/Footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ITEMS_PER_PAGE = 8;

const categories = [
  "All",
  ...new Set(portfolios.map((t) => t.category)),
];

const LandingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  const filtered = portfolios.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === "all" || t.platform === selectedPlatform;
    const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
    return matchesSearch && matchesPlatform && matchesCategory;
  });

  const loadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, filtered.length));
      setLoading(false);
    }, 400);
  }, [filtered.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200
      ) {
        if (!loading && visibleItems < filtered.length) loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleItems, filtered.length, loading, loadMore]);

  useEffect(() => {
    setVisibleItems(ITEMS_PER_PAGE);
  }, [searchQuery, selectedPlatform, selectedCategory]);

  const visible = filtered.slice(0, visibleItems);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        <Alert className="mb-6 bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-200">
          <AlertTitle className="text-base font-semibold text-amber-700 dark:text-amber-100">
            Announcement
          </AlertTitle>
          <AlertDescription className="text-sm text-amber-600/70 dark:text-amber-200/70">
            Not all websites are mirrored, and the <b>mirroring</b> is done to
            maintain the original theme we've created, in case there are any
            changes from the client's side. Some functions may not work properly.
          </AlertDescription>
        </Alert>

        {selectedPlatform !== "all" && (
          <p className="text-sm text-muted-foreground mb-4 capitalize">
            Showing {selectedPlatform} projects
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        )}

        <TemplateGrid templates={visible} loading={loading} />

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </main>

      <Footer brandName="Wreative" />
    </div>
  );
};

export default LandingPage;

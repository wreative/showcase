export interface TemplateData {
    id: number;
    title: string;
    category: string;
    image: string;
    url: string;
}

export const templates: TemplateData[] = [
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
    },
];
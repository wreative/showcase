import {ChevronDown} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

interface CategoryFilterProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    categories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
                                                           selectedCategory,
                                                           setSelectedCategory,
                                                           categories
                                                       }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                {selectedCategory}
                <ChevronDown className="h-4 w-4"/>
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
    );
};

export default CategoryFilter;

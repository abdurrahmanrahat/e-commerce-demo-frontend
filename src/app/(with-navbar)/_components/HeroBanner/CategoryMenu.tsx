"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  subCategories?: SubCategory[];
}

interface CategoryMenuProps {
  categories: Category[];
}

const CategoryMenu = ({ categories }: CategoryMenuProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="bg-card border-r border-border h-full">
      <div className="py-2">
        {categories.map((category) => (
          <div
            key={category._id}
            className="relative"
            onMouseEnter={() => setHoveredCategory(category._id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[hsl(var(--category-hover))] transition-colors group">
              <span className="text-sm font-medium text-foreground">
                {category.name}
              </span>
              {category.subCategories && category.subCategories.length > 0 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              )}
            </div>

            <AnimatePresence>
              {hoveredCategory === category._id &&
                category.subCategories &&
                category.subCategories.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="absolute left-full top-0 ml-1 bg-[hsl(var(--subcategory-bg))] border border-border rounded-lg shadow-2xl z-50 min-w-[240px]"
                  >
                    <div className="py-2">
                      {category.subCategories.map((subCategory, index) => (
                        <motion.div
                          key={subCategory._id}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.15,
                            delay: index * 0.03,
                            ease: "easeOut",
                          }}
                        >
                          <a
                            href={`/category/${category.slug}/${subCategory.slug}`}
                            className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            {subCategory.name}
                          </a>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TCategory, TSubCategory } from "@/types";
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const CategoryCard = ({ category }: { category: TCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubCategories =
    category.subCategories && category.subCategories.length > 0;

  return (
    <Card className="group transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-3">
      <CardContent className="px-4 ">
        {/* Category Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors truncate">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {hasSubCategories
                  ? `${category.subCategories.length} Subcategories`
                  : "No subcategories"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {!hasSubCategories ? (
              // Show edit/delete for categories without subcategories
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            ) : (
              // Show toggle arrow for categories with subcategories
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Subcategory List */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen
              ? "grid-rows-[1fr] opacity-100 mt-4"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-0">
              {category.subCategories?.map((sub: TSubCategory) => (
                <div
                  key={sub._id}
                  className="flex items-center justify-between px-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group/sub border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground group-hover/sub:text-primary transition-colors truncate">
                      {sub.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                      /{sub.slug}
                    </span>
                  </div>

                  {/* Subcategory Actions */}
                  <div className="flex items-center  opacity-0 group-hover/sub:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:text-primary hover:bg-primary/10"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-primary hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;

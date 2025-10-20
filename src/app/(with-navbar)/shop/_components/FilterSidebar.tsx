import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TCategory } from "@/types";
import { useEffect, useState } from "react";

interface FilterSidebarProps {
  categories: TCategory[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  maxPrice: number;
}

export const FilterSidebar = ({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  maxPrice,
}: FilterSidebarProps) => {
  const [localMin, setLocalMin] = useState(priceRange[0].toString());
  const [localMax, setLocalMax] = useState(priceRange[1].toString());

  useEffect(() => {
    setLocalMin(priceRange[0].toString());
    setLocalMax(priceRange[1].toString());
  }, [priceRange]);

  const handleParentCategoryToggle = (
    category: TCategory,
    checked: boolean
  ) => {
    const subcategoryIds = category.subCategories.map((sub) => sub._id);
    const allIds = [category._id, ...subcategoryIds];

    if (checked) {
      onCategoryChange([...new Set([...selectedCategories, ...allIds])]);
    } else {
      onCategoryChange(selectedCategories.filter((id) => !allIds.includes(id)));
    }
  };

  const handleSubcategoryToggle = (subcategoryId: string, checked: boolean) => {
    if (checked) {
      onCategoryChange([...selectedCategories, subcategoryId]);
    } else {
      onCategoryChange(selectedCategories.filter((id) => id !== subcategoryId));
    }
  };

  const handlePriceInputChange = () => {
    const min = Math.max(0, parseInt(localMin) || 0);
    const max = Math.min(maxPrice, parseInt(localMax) || maxPrice);
    onPriceChange([min, max]);
  };

  const handleClearFilters = () => {
    onCategoryChange([]);
    onPriceChange([0, maxPrice]);
  };

  const isParentChecked = (category: TCategory) => {
    const subcategoryIds = category.subCategories.map((sub) => sub._id);
    return (
      selectedCategories.includes(category._id) &&
      subcategoryIds.every((id) => selectedCategories.includes(id))
    );
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleClearFilters}>
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <Accordion type="multiple" className="w-full">
          {categories.map((category) => {
            const parentChecked = isParentChecked(category);

            return (
              <AccordionItem key={category._id} value={category._id}>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 flex-1">
                    <Checkbox
                      id={`category-${category._id}`}
                      checked={parentChecked}
                      onCheckedChange={(checked) =>
                        handleParentCategoryToggle(category, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`category-${category._id}`}
                      className="flex-1 cursor-pointer"
                    >
                      {category.name}
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      ({category.productsCount})
                    </span>
                  </div>
                  {category.subCategories.length > 0 && (
                    <AccordionTrigger className="ml-2" />
                  )}
                </div>

                {category.subCategories.length > 0 && (
                  <AccordionContent>
                    <div className="pl-6 space-y-2">
                      {category.subCategories.map((sub) => (
                        <div
                          key={sub._id}
                          className="flex items-center justify-between py-1"
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`sub-${sub._id}`}
                              checked={selectedCategories.includes(sub._id)}
                              onCheckedChange={(checked) =>
                                handleSubcategoryToggle(
                                  sub._id,
                                  checked as boolean
                                )
                              }
                            />
                            <Label
                              htmlFor={`sub-${sub._id}`}
                              className="cursor-pointer text-sm"
                            >
                              {sub.name}
                            </Label>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({sub.productsCount})
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceChange(value as [number, number])}
            max={maxPrice}
            step={10}
            className="w-full"
          />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="min-price" className="text-xs">
                Min
              </Label>
              <Input
                id="min-price"
                type="number"
                value={localMin}
                onChange={(e) => setLocalMin(e.target.value)}
                onBlur={handlePriceInputChange}
                min={0}
                max={maxPrice}
                className="h-9"
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="text-xs">
                Max
              </Label>
              <Input
                id="max-price"
                type="number"
                value={localMax}
                onChange={(e) => setLocalMax(e.target.value)}
                onBlur={handlePriceInputChange}
                min={0}
                max={maxPrice}
                className="h-9"
              />
            </div>
          </div>
        </div>
      </div>

      <Button className="w-full" onClick={() => {}}>
        Apply Filters
      </Button>
    </div>
  );
};

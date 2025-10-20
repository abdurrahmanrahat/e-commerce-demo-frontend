"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const sortOptions = [
  { label: "Sort By", value: "all" },
  { label: "Price: Low to High", value: "price:low_to_high" },
  { label: "Price: High to Low", value: "price:high_to_low" },
  { label: "Newest", value: "newest" },
  { label: "Best Selling", value: "best_selling" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];

const ManageProductsSort = () => {
  const [sortBy, setSortBy] = useState("");
  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-full sm:w-[160px] bg-card">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option?.value} value={option?.value}>
            {option?.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ManageProductsSort;

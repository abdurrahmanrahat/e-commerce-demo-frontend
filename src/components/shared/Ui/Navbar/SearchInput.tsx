"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchInput = () => {
  const [query, setQuery] = useState("");

  return (
    <div
      className={cn(
        "relative w-full md:max-w-sm lg:max-w-md",
        "transition-colors"
      )}
    >
      {/* Search Icon */}
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4"
        strokeWidth={2}
      />

      {/* Input Field */}
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className={cn(
          "pl-9 pr-4 py-[10px] text-sm rounded-md border border-gray-200 dark:border-gray-700",
          "text-gray-900 dark:text-gray-100",
          "placeholder:text-gray-400 dark:placeholder:text-gray-500",
          "focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none",
          "transition-all duration-300 ease-in-out"
        )}
      />
    </div>
  );
};

export default SearchInput;

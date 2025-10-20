"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type TManageProductsCategoryFilterProps = {
  categories: { value: string; label: string }[];
};
const ManageProductsCategoryFilter = ({
  categories,
}: TManageProductsCategoryFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
      <SelectTrigger className="w-full sm:w-[180px] bg-card">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>

        {categories.map((category) => (
          <SelectItem key={category?.value} value={category?.value}>
            {category?.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ManageProductsCategoryFilter;

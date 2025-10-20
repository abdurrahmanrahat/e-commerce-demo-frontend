"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const ManageProductsCategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
      <SelectTrigger className="w-full sm:w-[180px] bg-card">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        <SelectItem value="keyboards-and-mice">Keyboards & Mice</SelectItem>
        <SelectItem value="laptops-and-computers">
          Laptops & Computers
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ManageProductsCategoryFilter;

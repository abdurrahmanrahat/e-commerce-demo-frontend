"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const ManageProductsSort = () => {
  const [sortBy, setSortBy] = useState("");
  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-full sm:w-[160px] bg-card">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name">Name</SelectItem>
        <SelectItem value="price">Price</SelectItem>
        <SelectItem value="stock">Stock</SelectItem>
        <SelectItem value="rating">Rating</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ManageProductsSort;

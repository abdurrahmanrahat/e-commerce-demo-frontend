"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const typeOptions = [
  { label: "Default", value: "all" },
  { label: "Fixed", value: "fixed" },
  { label: "Percentage", value: "percentage" },
];

const CouponsType = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [type, setSort] = useState("");

  // Initialize state from URL
  useEffect(() => {
    const existingSort = searchParams.get("type") || "";

    setSort(existingSort);
  }, [searchParams]);

  // Update URL whenever type changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (type && type !== "all") {
      params.set("type", type);
    } else {
      params.delete("type");
    }

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    // const newUrl = params.toString() ?
    //    `/dashboard/admin/manage-products?${params.toString()}`
    //   : "/dashboard/admin/manage-products";

    router.push(newUrl, { scroll: false });
  }, [type]);

  const handleSortChange = (value: string) => {
    if (value === "all") {
      setSort("");
    } else {
      setSort(value);
    }
  };

  return (
    <Select value={type} onValueChange={handleSortChange}>
      <SelectTrigger className="w-auto sm:w-45 bg-card">
        <SelectValue placeholder="Select Type" />
      </SelectTrigger>
      <SelectContent>
        {typeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CouponsType;

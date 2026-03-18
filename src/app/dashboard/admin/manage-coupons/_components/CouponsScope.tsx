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

const scopeOptions = [
  { label: "Default", value: "all-value" },
  { label: "All Products", value: "all" },
  { label: "Specific", value: "specific" },
];

const CouponsScope = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [scope, setSort] = useState("");

  // Initialize state from URL
  useEffect(() => {
    const existingSort = searchParams.get("scope") || "";

    setSort(existingSort);
  }, [searchParams]);

  // Update URL whenever scope changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (scope && scope !== "all-value") {
      params.set("scope", scope);
    } else {
      params.delete("scope");
    }

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    // const newUrl = params.toString() ?
    //    `/dashboard/admin/manage-products?${params.toString()}`
    //   : "/dashboard/admin/manage-products";

    router.push(newUrl, { scroll: false });
  }, [scope]);

  const handleSortChange = (value: string) => {
    if (value === "all-value") {
      setSort("");
    } else {
      setSort(value);
    }
  };

  return (
    <Select value={scope} onValueChange={handleSortChange}>
      <SelectTrigger className="w-auto sm:w-[180px] bg-card">
        <SelectValue placeholder="Select Scope" />
      </SelectTrigger>
      <SelectContent>
        {scopeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CouponsScope;

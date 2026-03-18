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

const statusOptions = [
  { label: "Default", value: "all" },
  { label: "Active", value: "true" },
  { label: "Inactive", value: "false" },
];

const CouponsStatus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setSort] = useState("");

  // Initialize state from URL
  useEffect(() => {
    const existingSort = searchParams.get("isActive") || "";

    setSort(existingSort);
  }, [searchParams]);

  // Update URL whenever status changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (status && status !== "all") {
      params.set("isActive", status);
    } else {
      params.delete("isActive");
    }

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    // const newUrl = params.toString() ?
    //    `/dashboard/admin/manage-products?${params.toString()}`
    //   : "/dashboard/admin/manage-products";

    router.push(newUrl, { scroll: false });
  }, [status]);

  const handleSortChange = (value: string) => {
    if (value === "all") {
      setSort("");
    } else {
      setSort(value);
    }
  };

  return (
    <Select value={status} onValueChange={handleSortChange}>
      <SelectTrigger className="w-auto sm:w-[180px] bg-card">
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CouponsStatus;

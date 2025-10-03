"use server";

import { tagLists } from "@/constants/tag";

export const getAllCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKED_URL}/categories`, {
    cache: "force-cache",
    next: {
      tags: [tagLists.CATEGORY],
    },
  });
  const categories = await res.json();

  return categories;
};

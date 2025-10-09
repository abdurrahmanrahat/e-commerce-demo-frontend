"use server";

import { tagLists } from "@/constants/tag";
import { revalidateTag } from "next/cache";

export const getAllCategoriesFromDB = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKED_URL}/categories`, {
    cache: "force-cache",
    next: {
      tags: [tagLists.CATEGORY],
    },
  });
  const categories = await res.json();

  return categories;
};

export const addCategoryToDB = async (categoryData) => {
  console.log("categoryData", categoryData);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKED_URL}/categories/create-category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
        cache: "no-store",
      }
    );
    console.log("res", res);

    if (!res.ok) {
      throw new Error(`Failed to add category. Status: ${res.status}`);
    }

    const data = await res.json();

    revalidateTag(tagLists.CATEGORY);

    return data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

"use server";

import { tagLists } from "@/constants/tag";
import { TCategoryUploadData } from "@/types";
import { revalidateTag } from "next/cache";
import { fetchWithAuth } from "./fetchWithAuth";

export const getAllCategoriesFromDB = async () => {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKED_URL}/categories`,
    {
      cache: "force-cache",
      next: {
        tags: [tagLists.CATEGORY],
      },
    }
  );
  const categories = await res.json();

  return categories;
};

export const addCategoryToDB = async (categoryData: TCategoryUploadData) => {
  let newCategory = {};

  if (categoryData?.subCategoryOf) {
    newCategory = {
      name: categoryData.name,
      slug: categoryData.slug,
      subCategoryOf: categoryData.subCategoryOf,
    };
  }

  if (categoryData?.image) {
    newCategory = {
      name: categoryData.name,
      slug: categoryData.slug,
      image: categoryData.image,
    };
  }

  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKED_URL}/categories/create-category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
        cache: "no-store",
      }
    );

    // if (!res.ok) {
    //   throw new Error(`Failed to add category. Status: ${res.status}`);
    // }

    const data = await res.json();

    revalidateTag(tagLists.CATEGORY);

    return data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

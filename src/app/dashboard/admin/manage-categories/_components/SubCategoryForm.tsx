"use client";

import { addCategoryToDB } from "@/app/actions/categories";
import MYForm from "@/components/shared/Forms/MYForm";
import MYInput from "@/components/shared/Forms/MYInput";
import MYSelect from "@/components/shared/Forms/MYSelect";
import { LoaderSpinner } from "@/components/shared/Ui/LoaderSpinner";
import { Button } from "@/components/ui/button";
import { createSlug } from "@/utils/createSlug";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

// Example parent list (replace later with API data)
const parentCategories = [
  { value: "1", label: "Food" },
  { value: "2", label: "Clothes" },
];

const subCategorySchema = z.object({
  name: z.string().min(1, "Please provide a subcategory name."),
  subCategoryOf: z.string().min(1, "Please select a parent category."),
});

type SubCategoryFormValues = z.infer<typeof subCategorySchema>;

export default function SubCategoryForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSubCategory = async (values: SubCategoryFormValues) => {
    setIsLoading(true);

    try {
      const slug = createSlug(values.name);

      const newCategoryData = {
        name: values.name,
        slug,
        subCategoryOf: values.subCategoryOf,
      };

      await addCategoryToDB(newCategoryData);

      toast.success("Subcategory added successfully!");
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const subCategoryDefaultValues: SubCategoryFormValues = {
    name: "",
    subCategoryOf: "",
  };

  return (
    <MYForm
      onSubmit={handleAddSubCategory}
      schema={subCategorySchema}
      defaultValues={subCategoryDefaultValues}
    >
      <div className="flex flex-col gap-6">
        {/* Fields */}
        <div className="flex flex-col gap-4">
          {/* Parent Dropdown */}
          <div className="grid gap-1">
            <label
              htmlFor="subCategoryOf"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Select Parent Category{" "}
              <span className="text-red-500 font-medium">*</span>
            </label>

            <MYSelect
              name="subCategoryOf"
              options={parentCategories}
              placeholder="Select parent category"
            />
          </div>

          {/* Name Field */}
          <div className="grid gap-1">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Subcategory Name{" "}
              <span className="text-red-500 font-medium">*</span>
            </label>
            <MYInput name="name" placeholder="Subcategory name" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-2 w-full">
          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 cursor-pointer w-full bg-primary text-white hover:bg-primary/90"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <LoaderSpinner /> <span>Adding...</span>
              </span>
            ) : (
              "Add Subcategory"
            )}
          </Button>
        </div>
      </div>
    </MYForm>
  );
}

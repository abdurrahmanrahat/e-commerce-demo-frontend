"use client";

import { addCouponToDB } from "@/app/actions/coupon";
import MYForm from "@/components/shared/Forms/MYForm";
import MYInput from "@/components/shared/Forms/MYInput";
import MYSelect from "@/components/shared/Forms/MYSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import ProductSelection from "./ProductSelection";

/* ============================================
   Validation Schema
============================================ */
const couponSchema = z
  .object({
    code: z.string().min(1, "Coupon code is required"),
    type: z.enum(["fixed", "percentage"], {
      errorMap: () => ({
        message: "Type must be either 'fixed' or 'percentage'",
      }),
    }),
    value: z.coerce.number().min(1, "Value must be greater than 0"),

    minOrder: z.coerce.string().optional(),
    maxDiscount: z.coerce.string().optional(),

    limit: z.coerce.string().optional(),
    expiresAt: z.string().optional(),

    scope: z.enum(["all", "specific"]),
    productIds: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.scope === "specific") {
        return data.productIds && data.productIds.length > 0;
      }
      return true;
    },
    {
      message: "Please select at least one product",
      path: ["productIds"],
    },
  );

type CouponFormValues = z.infer<typeof couponSchema>;

/* ============================================
   Component
============================================ */
export default function AddCouponForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCoupon = async (values: CouponFormValues) => {
    setIsLoading(true);

    const { code, productIds, scope, type, value } = values;

    try {
      const payload = {
        code,
        type,
        value,
        ...(values.expiresAt && {
          expiresAt: new Date(values.expiresAt),
        }),
        ...(values.minOrder !== "" && {
          minOrder: Number(values.minOrder),
        }),
        ...(values.maxDiscount !== "" && {
          maxDiscount: Number(values.maxDiscount),
        }),
        ...(values.limit !== "" && {
          limit: Number(values.limit),
        }),
        scope,
        ...(scope === "specific" && { productIds }),
      };

      const res = await addCouponToDB(payload);

      if (res?.success) {
        toast.success("Coupon added successfully!");
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const defaultValues: CouponFormValues = {
    code: "",
    type: "fixed",
    value: 0,
    minOrder: "",
    maxDiscount: "",
    limit: "",
    expiresAt: "",
    scope: "all",
    productIds: [],
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="h-9 xl:h-10 hover:bg-muted w-auto px-3 xl:px-4"
        >
          Add Coupon
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="max-w-[880px]! 2xl:max-w-[960px]! py-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add New Coupon
          </DialogTitle>
        </DialogHeader>

        <MYForm
          onSubmit={handleAddCoupon}
          schema={couponSchema}
          defaultValues={defaultValues}
        >
          <div className="flex flex-col gap-6">
            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Code */}
              <div className="grid gap-1">
                <label className="text-sm 2xl:text-base font-medium">
                  Coupon Code <span className="text-red-500">*</span>
                </label>
                <MYInput name="code" placeholder="e.g. SAVE10" />
              </div>

              {/* Type */}
              <div className="grid gap-1">
                <label className="text-sm 2xl:text-base font-medium">
                  Discount Type <span className="text-red-500">*</span>
                </label>
                <MYSelect
                  name="type"
                  options={[
                    { value: "fixed", label: "Fixed" },
                    { value: "percentage", label: "Percentage" },
                  ]}
                  placeholder="Select type"
                />
              </div>

              {/* Value */}
              <div className="grid gap-1">
                <label className="text-sm 2xl:text-base font-medium">
                  Value (Discount Amount){" "}
                  <span className="text-red-500">*</span>
                </label>
                <MYInput name="value" type="number" placeholder="Enter value" />
              </div>

              {/* Minimum Order Requirement */}
              <div className="grid gap-1">
                <label className="text-sm 2xl:text-base font-medium">
                  Minimum Order Amount (Optional)
                </label>
                <MYInput
                  name="minOrder"
                  type="number"
                  placeholder="Enter minimum order value required to apply this coupon"
                />
              </div>

              {/* Maximum Discount Limit */}
              <div className="grid gap-1">
                <label className="text-sm 2xl:text-base font-medium">
                  Maximum Discount Amount (Optional)
                </label>
                <MYInput
                  name="maxDiscount"
                  type="number"
                  placeholder="Enter maximum discount value this coupon can apply"
                />
              </div>

              {/* Coupon Usage Limit */}
              <div className="grid gap-1">
                <label className="text-sm 2xl:text-base font-medium">
                  Usage Limit (Optional)
                </label>
                <MYInput
                  name="limit"
                  type="number"
                  placeholder="Enter maximum number of times this coupon can be used"
                />
              </div>

              {/* Coupon Expiration */}
              <div className="grid gap-1">
                <label className="text-sm 2xl:text-base font-medium">
                  Coupon Expiration Date & Time
                </label>
                <MYInput
                  name="expiresAt"
                  type="datetime-local"
                  placeholder="Select the date and time when this coupon will expire"
                />
              </div>

              {/* Scope */}
              <div className="grid gap-1">
                <label className="text-sm 2xl:text-base font-medium">
                  Scope <span className="text-red-500">*</span>
                </label>
                <MYSelect
                  name="scope"
                  options={[
                    { value: "all", label: "All Products" },
                    { value: "specific", label: "Specific Products" },
                  ]}
                  placeholder="Select scope"
                />
              </div>
            </div>
            {/* Product Selection (only when scope = specific) */}
            <ProductSelection />

            {/* Submit */}
            <div className="mt-2 w-full">
              <DialogClose asChild>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-11 2xl:h-12 w-full bg-primary text-white hover:bg-primary/90"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Adding...</span>
                    </span>
                  ) : (
                    "Add Coupon"
                  )}
                </Button>
              </DialogClose>
            </div>
          </div>
        </MYForm>
      </DialogContent>
    </Dialog>
  );
}

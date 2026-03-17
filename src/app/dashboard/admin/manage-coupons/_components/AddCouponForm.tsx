"use client";

import { addCouponToDB } from "@/app/actions/coupon";
import MYForm from "@/components/shared/Forms/MYForm";
import MYInput from "@/components/shared/Forms/MYInput";
import MYSelect from "@/components/shared/Forms/MYSelect";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

/* ============================================
   Validation Schema
============================================ */
const couponSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
  type: z.enum(["fixed", "percentage"]),
  value: z.coerce.number().min(1, "Value must be greater than 0"),

  minOrder: z.coerce.number().optional(),
  maxDiscount: z.coerce.number().optional(),

  limit: z.coerce.number().optional(),
  expiresAt: z.string().optional(),

  scope: z.enum(["all", "specific"]),
});

type CouponFormValues = z.infer<typeof couponSchema>;

/* ============================================
   Component
============================================ */
export default function AddCouponForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCoupon = async (values: CouponFormValues) => {
    setIsLoading(true);

    try {
      const payload = {
        ...values,
        uses: 0,
        isActive: true,
        isDeleted: false,
        expiresAt: values.expiresAt ? new Date(values.expiresAt) : undefined,
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
    minOrder: undefined,
    maxDiscount: undefined,
    limit: undefined,
    expiresAt: "",
    scope: "all",
  };

  return (
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
            <label className="text-sm font-medium">
              Coupon Code <span className="text-red-500">*</span>
            </label>
            <MYInput name="code" placeholder="e.g. SAVE10" />
          </div>

          {/* Type */}
          <div className="grid gap-1">
            <label className="text-sm font-medium">
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
            <label className="text-sm font-medium">
              Value <span className="text-red-500">*</span>
            </label>
            <MYInput name="value" type="number" placeholder="Enter value" />
          </div>

          {/* Min Order */}
          <div className="grid gap-1">
            <label className="text-sm font-medium">Minimum Order</label>
            <MYInput name="minOrder" type="number" placeholder="Optional" />
          </div>

          {/* Max Discount */}
          <div className="grid gap-1">
            <label className="text-sm font-medium">Max Discount</label>
            <MYInput name="maxDiscount" type="number" placeholder="Optional" />
          </div>

          {/* Limit */}
          <div className="grid gap-1">
            <label className="text-sm font-medium">Usage Limit</label>
            <MYInput name="limit" type="number" placeholder="Optional" />
          </div>

          {/* Expiry */}
          <div className="grid gap-1">
            <label className="text-sm font-medium">Expiry Date</label>
            <MYInput name="expiresAt" type="date" placeholder="" />
          </div>

          {/* Scope */}
          <div className="grid gap-1">
            <label className="text-sm font-medium">
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

        {/* Submit */}
        <div className="mt-2 w-full">
          <DialogClose asChild>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full bg-primary text-white hover:bg-primary/90"
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
  );
}

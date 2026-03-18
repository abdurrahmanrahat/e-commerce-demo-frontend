"use client";

import MYForm from "@/components/shared/Forms/MYForm";
import MYInput from "@/components/shared/Forms/MYInput";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const orderTrackingSchema = z.object({
  orderNumber: z.string().min(1, "Please provide your order ID."),
  phone: z.string().min(1, "Please provide your phone number."),
});

type OrderTrackingFormValues = z.infer<typeof orderTrackingSchema>;

const OrderTrackingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: OrderTrackingFormValues) => {
    setIsLoading(true);
    const { orderNumber, phone } = values;

    router.push(
      `/order-tracking/info?orderNumber=${encodeURIComponent(orderNumber)}&phone=${encodeURIComponent(phone)}`,
    );
    setIsLoading(false);
  };

  const defaultValues: OrderTrackingFormValues = {
    orderNumber: "",
    phone: "",
  };

  return (
    <CardContent>
      <MYForm
        onSubmit={handleSubmit}
        schema={orderTrackingSchema}
        defaultValues={defaultValues}
      >
        <div className="flex flex-col gap-5">
          {/* Order Number */}
          <div className="grid gap-1">
            <label
              htmlFor="orderNumber"
              className="text-sm 2xl:text-base font-medium text-gray-700 dark:text-gray-300"
            >
              Order ID <span className="text-red-500">*</span>
            </label>

            <MYInput name="orderNumber" placeholder="Enter your order ID" />
          </div>

          {/* Phone */}
          <div className="grid gap-1">
            <label
              htmlFor="phone"
              className="text-sm 2xl:text-base font-medium text-gray-700 dark:text-gray-300"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>

            <MYInput name="phone" placeholder="Enter your phone number" />
          </div>

          {/* Submit */}
          <div className="mt-2 w-full">
            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 2xl:h-12 w-full cursor-pointer bg-primary text-white hover:bg-primary/90"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin animation-duration-[1.4s]" />{" "}
                  <span>Adding...</span>
                </span>
              ) : (
                "Track Order"
              )}
            </Button>
          </div>
        </div>
      </MYForm>
    </CardContent>
  );
};

export default OrderTrackingForm;

"use client";

import { updateCouponInDB } from "@/app/actions/coupon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TCoupon } from "@/types/coupon.type";
import { Loader, Power } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CouponStatusChangeModal({
  coupon,
}: {
  coupon: TCoupon;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const isActive = coupon.isActive;
  const nextStatus = !isActive;

  const handleUpdateStatus = async () => {
    setIsLoading(true);

    try {
      const res = await updateCouponInDB(coupon._id, {
        isActive: nextStatus,
      });

      if (res?.success) {
        toast.success(
          `Coupon ${nextStatus ? "activated" : "deactivated"} successfully!`,
        );
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`h-7 w-7 transition ${
            isActive
              ? "text-orange-500 hover:text-orange-600 hover:bg-orange-500/10 dark:hover:bg-orange-500/20"
              : "text-green-500 hover:text-green-600 hover:bg-green-500/10 dark:hover:bg-green-500/20"
          }`}
        >
          <Power className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="max-w-115 border border-gray-200 dark:border-gray-800 shadow-lg">
        <DialogHeader>
          <DialogTitle
            className={`text-lg font-semibold flex items-center gap-2 ${
              isActive
                ? "text-orange-600 dark:text-orange-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            <Power className="h-5 w-5" />
            {isActive ? "Deactivate Coupon" : "Activate Coupon"}
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Are you sure you want to{" "}
            <span className="font-medium">
              {isActive ? "deactivate" : "activate"}
            </span>{" "}
            coupon <span className="font-semibold italic">{coupon.code}</span>?
          </DialogDescription>
        </DialogHeader>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              onClick={handleUpdateStatus}
              disabled={isLoading}
              className={`text-white ${
                isActive
                  ? "bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                  : "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin animation-duration-[1.4s]" />
                  Updating...
                </span>
              ) : isActive ? (
                "Deactivate"
              ) : (
                "Activate"
              )}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

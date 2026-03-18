"use client";

import { getSingleCouponFromDB } from "@/app/actions/coupon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TCartItem, TCartProduct } from "@/types";
import { Check, Loader, Tag, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type TCheckoutCouponProps = {
  subtotal: number;
  cartItems: TCartItem[];
  cartProducts: TCartProduct[];
  onApply: (discount: number, couponCode: string) => void;
  onRemove: () => void;
};

const CheckoutCoupon = ({
  subtotal,
  cartItems,
  cartProducts,
  onApply,
  onRemove,
}: TCheckoutCouponProps) => {
  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const searchParams = useSearchParams();

  // Auto apply from URL
  useEffect(() => {
    const urlCode = searchParams.get("coupon");

    if (urlCode) {
      setCode(urlCode);
      handleApply(urlCode);
    }
  }, []);

  // Main apply logic
  const handleApply = async (couponCode?: string) => {
    const finalCode = couponCode || code;

    if (!finalCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsLoading(true);

    try {
      const res = await getSingleCouponFromDB(finalCode);

      if (!res?.success) {
        toast.error("Invalid coupon");
        return;
      }

      const coupon = res.data;

      // VALIDATIONS
      if (!coupon.isActive) {
        return toast.error("Coupon is inactive");
      }

      if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
        return toast.error("Coupon expired");
      }

      if (coupon.limit && (coupon.uses || 0) >= coupon.limit) {
        return toast.error("Coupon usage limit reached");
      }

      // Build product map (productId → cartProduct)
      const productMap = new Map(
        cartProducts.map((item) => [item.product._id, item]),
      );

      let eligibleSubtotal = subtotal;

      // Handle specific product coupons
      if (coupon.scope === "specific") {
        const eligibleItems = cartItems.filter((item) =>
          coupon.productIds.includes(item.productId),
        );

        if (eligibleItems.length === 0) {
          return toast.error("Coupon not applicable to your cart");
        }

        eligibleSubtotal = eligibleItems.reduce((sum, item) => {
          const cartProduct = productMap.get(item.productId);

          if (!cartProduct) return sum;

          return sum + cartProduct.product.sellingPrice * cartProduct.quantity;
        }, 0);
      }

      // Minimum order check (IMPORTANT FIX)
      if (coupon.minOrder && eligibleSubtotal < coupon.minOrder) {
        return toast.error(`Minimum order is $${coupon.minOrder}`);
      }

      // CALCULATION (FIXED)
      let discount = 0;

      if (coupon.type === "percentage") {
        discount = (eligibleSubtotal * coupon.value) / 100;
      } else {
        discount = coupon.value;
      }

      // Apply max cap
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }

      // Safety clamp
      discount = Math.min(discount, eligibleSubtotal);

      // APPLY
      setAppliedCoupon(coupon.code);
      onApply(discount, coupon.code);

      toast.success(`Coupon applied! You saved $${discount.toFixed(2)}`);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    setAppliedCoupon(null);
    setCode("");
    onRemove();
  };

  return (
    <div className="space-y-3">
      {!showInput && !appliedCoupon && (
        <button
          onClick={() => setShowInput(true)}
          className="text-sm text-primary hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Tag className="h-4 w-4" />
          Have a coupon code?
        </button>
      )}

      {showInput && !appliedCoupon && (
        <div className="flex items-center gap-2">
          <Input
            placeholder="Enter coupon code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-9"
          />

          <Button
            onClick={() => handleApply()}
            disabled={isLoading}
            size="sm"
            className="h-8 2xl:h-9"
          >
            {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : "Apply"}
          </Button>
        </div>
      )}

      {appliedCoupon && (
        <div className="flex items-center justify-between border border-muted rounded-md px-3 py-2 bg-green-50 dark:bg-green-500/10">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
            <Check className="h-4 w-4" />
            {appliedCoupon} applied!
          </div>

          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-600 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutCoupon;

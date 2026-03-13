"use client";

import { createOrderInDB } from "@/app/actions/order";
import MYForm from "@/components/shared/Forms/MYForm";
import MYInput from "@/components/shared/Forms/MYInput";
import MYTextArea from "@/components/shared/Forms/MYTextArea";
import EmptyCart from "@/components/shared/Ui/Data/EmptyCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  insideDhakaShippingCost,
  outsideDhakaShippingCost,
} from "@/constants/shippingKey";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart } from "@/redux/reducers/cartSlice";
import { TCartProduct, TProduct } from "@/types";
import { shippingOptions } from "@/utils/shippingOptions";
import { Loader, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import CheckoutProductCard from "./CheckoutProductCard";
import { CheckoutProductCardSkeleton } from "./CheckoutProductCardSkeleton";

const userBillingAddressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  fullAddress: z.string().min(1, "Full address is required"),
  phone: z
    .string()
    .min(11, "Number must be at least 11 digits")
    .max(14, "Number can't exceed 14 digits"),
  country: z.string().default("Bangladesh"), // or `.optional()` if not required
  orderNotes: z.string().optional(), // allow empty or undefined notes
});

const userBillingAddress = {
  fullName: "",
  fullAddress: "",
  phone: "",
  country: "Bangladesh",
  orderNotes: "",
};

const BillingDetails = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<TProduct[]>([]);

  const router = useRouter();
  const dispatch = useAppDispatch();

  // Payment Method state
  const shipOption = useAppSelector((state) => state.cart.shippingOption);

  const [shippingOption, setShippingOption] = useState(shipOption || "dhaka");

  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    let active = true;

    const fetchProducts = async () => {
      setIsLoading(true);

      if (cartItems.length === 0) {
        if (active) {
          setProducts([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        const ids = cartItems.map((item) => item.productId);

        const res = await fetch("/api/products/byIds", {
          method: "POST",
          body: JSON.stringify({ ids }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (active && data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchProducts();

    return () => {
      active = false;
    };
  }, [cartItems]);

  const cartProducts = useMemo(() => {
    const productMap = new Map(products.map((p) => [p._id, p]));

    return cartItems
      .map((item) => {
        const product = productMap.get(item.productId);
        if (!product) return null;

        return { product, quantity: item.quantity };
      })
      .filter((item): item is TCartProduct => item !== null);
  }, [cartItems, products]);

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.product.sellingPrice * item.quantity,
    0,
  );

  const orderItems = cartProducts.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
  }));

  const shippingCost =
    shippingOption === "dhaka"
      ? insideDhakaShippingCost
      : outsideDhakaShippingCost;
  const total = subtotal + shippingCost;

  const handleSubmit = async (values: FieldValues) => {
    setIsButtonLoading(true);

    const orderData = {
      ...values,
      shippingOption,
      orderItems,
      // subtotal,
      // total,
      paymentMethod: "CASH-ON-DELIVERY", // will be dynamic
    };

    // send to db
    try {
      const res = await createOrderInDB(orderData);

      if (res?.success) {
        toast.success("Order place successfully!");

        router.push(`/order-success?orderId=${res.data._id}`);
        dispatch(clearCart());
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <MYForm
      onSubmit={handleSubmit}
      defaultValues={userBillingAddress}
      schema={userBillingAddressSchema}
    >
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        {/* Billing & Shipping Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl 2xl:text-2xl">
                Billing & Shipping
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="">
                {/* Billing & Shipping Form */}
                <div className="">
                  <div className="rounded-lg">
                    <div className="space-y-6">
                      <div className="grid gap-1">
                        <label
                          htmlFor="fullName"
                          className="text-sm 2xl:text-base font-medium"
                        >
                          Full Name{" "}
                          <span className="text-red-500 font-medium">*</span>
                        </label>

                        <MYInput
                          name="fullName"
                          type="text"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="grid gap-1">
                        <label
                          htmlFor="fullAddress"
                          className="text-sm 2xl:text-base font-medium"
                        >
                          Full Address{" "}
                          <span className="text-red-500 font-medium">*</span>
                        </label>

                        <MYInput
                          name="fullAddress"
                          type="text"
                          placeholder="City, area, house number and street name etc"
                        />
                      </div>

                      <div className="grid gap-1">
                        <label
                          htmlFor="phone"
                          className="text-sm 2xl:text-base font-medium"
                        >
                          Phone No{" "}
                          <span className="text-red-500 font-medium">*</span>
                        </label>

                        <MYInput
                          name="phone"
                          type="tel"
                          placeholder="Enter your contact number"
                        />
                      </div>

                      <div className="grid gap-1">
                        <label
                          htmlFor="country"
                          className="text-sm 2xl:text-base font-medium"
                        >
                          Country / Region{" "}
                          <span className="text-red-500 font-medium">*</span>
                        </label>

                        <MYInput name="country" type="text" placeholder="" />
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">
                        Additional information
                      </h3>

                      <div className="grid gap-1">
                        <label
                          htmlFor="orderNotes"
                          className="text-sm 2xl:text-base font-medium"
                        >
                          Order notes (optional)
                        </label>

                        <MYTextArea
                          placeholder="Notes about your order, e.g. special notes for delivery"
                          name="orderNotes"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="md:text-lg 2xl:text-xl">
                Your order
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-2">
                {cartItems.length === 0 ? (
                  <EmptyCart />
                ) : (
                  <>
                    {isLoading ? (
                      <>
                        <CheckoutProductCardSkeleton />
                      </>
                    ) : (
                      <>
                        {cartProducts.map((item) => (
                          <CheckoutProductCard item={item} />
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>

              <Separator />

              {/* Subtotal */}
              <div className="flex justify-between text-sm 2xl:text-base">
                <span className="">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              {/* Shipping */}
              <div>
                <h4 className="font-medium mb-3 2xl:text-lg">Shipping</h4>
                <RadioGroup
                  value={shippingOption}
                  onValueChange={(value) =>
                    setShippingOption(value as "dhaka" | "outside")
                  }
                  className="space-y-0"
                >
                  {shippingOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label
                          htmlFor={option.id}
                          className="text-sm 2xl:text-base cursor-pointer"
                        >
                          {option.name}
                        </Label>
                      </div>

                      <span className="text-sm 2xl:text-base font-medium">
                        ${option.price}
                      </span>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between text-base 2xl:text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>

              {/* Payment Method */}
              <Card className="border-2">
                <CardContent className="">
                  {/* will be dynamic */}
                  <RadioGroup>
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="cod" id="cod" checked />
                      <div className="flex-1">
                        <Label
                          htmlFor="cod"
                          className="font-medium cursor-pointer"
                        >
                          Cash on delivery
                        </Label>
                        <p className="text-sm 2xl:text-base mt-1">
                          Pay with cash upon delivery.
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <p className="text-xs 2xl:text-sm text-muted-foreground">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary hover:underline"
                >
                  privacy policy
                </Link>
                .
              </p>

              <Button
                className="w-full"
                size="lg"
                disabled={isButtonLoading || cartItems.length === 0}
              >
                {isButtonLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin [animation-duration:1.4s]" />
                    <span>Processing...</span>
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 2xl:w-5 2xl:h-5 mr-2" />
                    Place order
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MYForm>
  );
};

export default BillingDetails;

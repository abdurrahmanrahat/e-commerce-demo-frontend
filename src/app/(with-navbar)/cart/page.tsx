"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { QuantityStepper } from "../shop/[productSlug]/_components/QuantityStepper";
import { CheckoutSteps } from "./_components/CheckoutSteps";

export const cart = [
  {
    product: {
      _id: "68f4e96529e421708d9131bc",
      name: "Logitech MX Keys S Wireless Keyboard & MX Master 3S Mouse Combo",
      slug: "logitech-mx-keys-s-wireless-keyboard-and-mx-master-3s-mouse-combo",
      images: [
        "https://i.ibb.co/fVkmd3fH/keyboards-and-mice1.jpg",
        "https://i.ibb.co/SX8ChhG3/keyboards-and-mice2.jpg",
      ],
      sellingPrice: 160,
      price: 190,
      stock: 40,
    },
    quantity: 1,
  },
  {
    product: {
      _id: "68f4e96529e421708d9131bd",
      name: "Apple AirPods Pro (2nd Generation, 2024 Edition)",
      slug: "apple-airpods-pro-2nd-generation-2024",
      images: [
        "https://i.ibb.co/N2WnYv8/airpods-pro1.jpg",
        "https://i.ibb.co/kB2cgqx/airpods-pro2.jpg",
      ],
      sellingPrice: 290,
      price: 329,
      stock: 60,
    },
    quantity: 2,
  },
  {
    product: {
      _id: "68f4e96529e421708d9131be",
      name: "Anker PowerCore 20000mAh PD Power Bank",
      slug: "anker-powercore-20000mah-pd-power-bank",
      images: [
        "https://i.ibb.co/m8jPtv6/power-bank1.jpg",
        "https://i.ibb.co/YX5LZrS/power-bank2.jpg",
      ],
      sellingPrice: 75,
      price: 95,
      stock: 100,
    },
    quantity: 1,
  },
];

export type ShippingOption = {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
};

const shippingOptions: ShippingOption[] = [
  {
    id: "dhaka",
    name: "Inside Dhaka city (2-3 Days)",
    price: 70,
    estimatedDays: "2-3 days",
  },
  {
    id: "outside",
    name: "Outside Dhaka City (3-5 Days)",
    price: 120,
    estimatedDays: "3-5 days",
  },
];

export default function Cart() {
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(
    shippingOptions[1]
  );
  const subtotal = 400;
  const total = 400;

  //   const subtotal = getCartTotal();
  //   const total = subtotal + selectedShipping.price;

  //   const handleRemoveItem = (productId: string) => {
  //     removeFromCart(productId);
  //     toast.success("Item removed from cart");
  //   };

  //   const handleProceedToCheckout = () => {
  //     if (cart.length === 0) {
  //       toast.error("Your cart is empty");
  //       return;
  //     }
  //     navigate("/checkout");
  //   };

  // cart.length === 0
  if (false) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <CheckoutSteps currentStep={1} />

          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="w-24 h-24 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some products to get started
            </p>
            <Link href="/shop">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <CheckoutSteps currentStep={1} />

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.product._id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-muted"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-medium hover:text-primary line-clamp-2 mb-2"
                      >
                        {item.product.name}
                      </Link>

                      <div className="flex flex-wrap items-center gap-4">
                        <QuantityStepper
                          value={item.quantity}
                          //   onChange={(qty) =>
                          //     updateCartQuantity(item.product._id, qty)
                          //   }
                          onChange={() => {}}
                          max={item.product.stock}
                          size="sm"
                        />

                        <span className="text-lg font-bold">
                          ৳{" "}
                          {(item.product.sellingPrice * item.quantity).toFixed(
                            2
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      //   onClick={() => handleRemoveItem(item.product._id)}
                      className="shrink-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">৳ {subtotal.toFixed(2)}</span>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Shipping</h3>
                  <RadioGroup
                    value={selectedShipping.id}
                    onValueChange={(value) => {
                      const option = shippingOptions.find(
                        (opt) => opt.id === value
                      );
                      if (option) setSelectedShipping(option);
                    }}
                    className="space-y-3"
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
                            className="text-sm cursor-pointer"
                          >
                            {option.name}
                          </Label>
                        </div>
                        <span className="text-sm font-medium">
                          ৳ {option.price}
                        </span>
                      </div>
                    ))}
                  </RadioGroup>
                  <p className="text-xs text-muted-foreground mt-2">
                    Shipping options will be updated during checkout.
                  </p>
                </div>

                <Separator />

                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-primary">৳ {total.toFixed(2)}</span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  //   onClick={handleProceedToCheckout}
                >
                  Proceed to checkout
                </Button>

                <Link href="/shop">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

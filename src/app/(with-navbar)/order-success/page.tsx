"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Package, Truck } from "lucide-react";
import Link from "next/link";
import { CheckoutSteps } from "../cart/_components/CheckoutSteps";
import { cart } from "../cart/page";

export default function OrderSuccess() {
  const subtotal = 400;

  const orderNumber = "122";
  const total = 50;

  const formData = {
    fullName: "John Doe",
    fullAddress: "123 Maing",
    country: "BD",
    phoneNumber: "452438",
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <CheckoutSteps currentStep={3} />

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6" />
                  <CardTitle>Order Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Order Number
                    </p>
                    <p className="font-semibold">{orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Order Date
                    </p>
                    <p className="font-semibold">
                      {new Date().toLocaleDateString("en-GB")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Payment Method
                    </p>
                    <p className="font-semibold">CASH-ON-DELIVERY</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6" />
                  <CardTitle>Shipping Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{formData.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.fullAddress}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formData.country}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formData.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-4 flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">
                      Estimated Delivery
                    </p>
                    <p className="text-sm">4 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item: any) => (
                  <div key={item.product._id} className="flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 rounded object-cover bg-muted"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">
                      ৳ {(item.product.sellingPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">৳ {subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="font-medium">৳ {total.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-base font-bold">
                  <span>Total:</span>
                  <span className="text-primary">৳ {total.toFixed(2)}</span>
                </div>

                <Link href="/shop">
                  <Button className="w-full" size="lg">
                    Continue Shopping →
                  </Button>
                </Link>

                <div className="pt-6">
                  <h4 className="font-medium mb-2">Need Help?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact our customer support team for any questions about
                    your order.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

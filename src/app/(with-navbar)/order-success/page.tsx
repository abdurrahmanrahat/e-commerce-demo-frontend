"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  CheckCircle2,
  Mail,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { CheckoutSteps } from "../../../components/common/Cart/CheckoutSteps";

export default function OrderSuccess() {
  const subtotal = 400;

  const orderNumber = "122";
  const total = 50;
  const shipping = 50;

  const formData = {
    fullName: "John Doe",
    fullAddress: "123 Maing",
    country: "BD",
    phoneNumber: "452438",
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <CheckoutSteps currentStep={3} />

        <div className="text-center mb-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-muted-foreground">
            Thank you for your order. We'll send you a confirmation email
            shortly.
          </p>
        </div>
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
              {/* <CardContent className="space-y-4">
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
                      $ {(item.product.sellingPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </CardContent> */}
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="font-medium">$ {shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>$ {total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Link href="/shop">
              <Button size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Contact our customer support team for any questions about your
                  order.
                </p>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

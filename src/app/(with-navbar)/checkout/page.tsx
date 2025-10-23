"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Lock } from "lucide-react";
import { useState } from "react";
import { CheckoutSteps } from "../cart/_components/CheckoutSteps";
import { cart } from "../cart/page";

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

interface FormData {
  fullName: string;
  fullAddress: string;
  phoneNumber: string;
  email: string;
  country: string;
  orderNotes: string;
}

export default function Checkout() {
  //   const navigate = useNavigate();
  //   const { cart, getCartTotal, clearCart } = useShop();
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(
    shippingOptions[1]
  );
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    fullAddress: "",
    phoneNumber: "",
    email: "",
    country: "Bangladesh",
    orderNotes: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const subtotal = 400;
  const total = 500;

  //   const validateForm = () => {
  //     const newErrors: Partial<FormData> = {};

  //     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
  //     if (!formData.fullAddress.trim())
  //       newErrors.fullAddress = "Full address is required";
  //     if (!formData.phoneNumber.trim())
  //       newErrors.phoneNumber = "Phone number is required";
  //     if (!formData.email.trim()) newErrors.email = "Email is required";
  //     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
  //       newErrors.email = "Invalid email address";

  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  //   };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  //   const handlePlaceOrder = () => {
  //     if (!validateForm()) {
  //       toast.error("Please fill in all required fields");
  //       return;
  //     }

  //     if (cart.length === 0) {
  //       toast.error("Your cart is empty");
  //       return;
  //     }

  //     // Simulate order placement
  //     const orderNumber = "ORD-" + Math.floor(Math.random() * 10000);

  //     // Clear cart and navigate to success page
  //     clearCart();
  //     navigate("/order-success", {
  //       state: {
  //         orderNumber,
  //         formData,
  //         cart,
  //         shipping: selectedShipping,
  //         total,
  //       },
  //     });
  //   };

  //   if (cart.length === 0) {
  //     navigate("/cart");
  //     return null;
  //   }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <CheckoutSteps currentStep={2} />

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Billing & Shipping Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Shipping</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Full Address */}
                <div>
                  <Label htmlFor="fullAddress">
                    Full Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullAddress"
                    name="fullAddress"
                    placeholder="City, area, house number and street name etc"
                    value={formData.fullAddress}
                    onChange={handleInputChange}
                    className={errors.fullAddress ? "border-destructive" : ""}
                  />
                  {errors.fullAddress && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.fullAddress}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <Label htmlFor="phoneNumber">
                    Phone No <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={errors.phoneNumber ? "border-destructive" : ""}
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <Label htmlFor="country">
                    Country / Region <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>

                <Separator />

                {/* Order Notes */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">
                    Additional information
                  </h3>
                  <Label htmlFor="orderNotes">Order notes (optional)</Label>
                  <Textarea
                    id="orderNotes"
                    name="orderNotes"
                    placeholder="Notes about your order, e.g. special notes for delivery"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Your order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.product._id} className="flex gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 rounded object-cover bg-muted"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        ${" "}
                        {(item.product.sellingPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span className="font-medium">$ {subtotal.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div>
                  <h4 className="font-medium mb-3">Shipping</h4>
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
                          $ {option.price}
                        </span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-primary">$ {total.toFixed(2)}</span>
                </div>

                {/* Payment Method */}
                <Card className="border-2">
                  <CardContent className="p-4">
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
                          <p className="text-sm text-muted-foreground mt-1">
                            Pay with cash upon delivery.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <p className="text-xs text-muted-foreground">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our{" "}
                  <a href="#" className="text-primary hover:underline">
                    privacy policy
                  </a>
                  .
                </p>

                <Button className="w-full" size="lg">
                  <Lock className="w-4 h-4 mr-2" />
                  Place order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

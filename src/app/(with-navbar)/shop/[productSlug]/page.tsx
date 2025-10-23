"use client";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { QuantityStepper } from "@/components/common/Product/QuantityStepper";
import { Rating } from "@/components/common/Product/Rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const product = {
  _id: "68f4e96529e421708d9131bc",
  name: "Logitech MX Keys S Wireless Keyboard & MX Master 3S Mouse Combo",
  slug: "logitech-mx-keys-s-wireless-keyboard-and-mx-master-3s-mouse-combo",
  description:
    "<p>Enhance your productivity setup with the Logitech MX Keys S and MX Master 3S combo.</p>",
  images: [
    "https://i.ibb.co/fVkmd3fH/keyboards-and-mice1.jpg",
    "https://i.ibb.co/SX8ChhG3/keyboards-and-mice2.jpg",
    "https://i.ibb.co/q3tL1PbW/keyboards-and-mice3.jpg",
    "https://i.ibb.co/qMPq5qwH/keyboards-and-mice4.jpg",
    "https://i.ibb.co/1Sn1RWN/keyboards-and-mice5.jpg",
  ],
  category: "keyboards-and-mice",
  price: 190,
  sellingPrice: 160,
  stock: 40,
  tags: ["laptops-and-computers", "keyboards-and-mice"],
  totalReviews: 24,
  averageRatings: 4.5,
  salesCount: 156,
  isDeleted: false,
  createdAt: "2025-10-19T13:36:37.158Z",
  updatedAt: "2025-10-19T13:36:37.158Z",
  __v: 0,
};

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const discount =
    product.price > product.sellingPrice
      ? Math.round(
          ((product.price - product.sellingPrice) / product.price) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[{ label: "Shop", href: "/shop" }, { label: product.name }]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded font-semibold">
                    -{discount}% OFF
                  </div>
                )}
              </div>
            </Card>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <Rating
                rating={product.averageRatings}
                totalReviews={product.totalReviews}
                size="md"
              />
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">
                ${product.sellingPrice}
              </span>
              {product.price > product.sellingPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.price}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  In Stock ({product.stock} available)
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                max={product.stock}
              />
              <Button
                className="flex-1"
                size="lg"
                // onClick={() => addToCart(product, quantity)}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                // onClick={() => toggleWishlist(product)}
              >
                <Heart className={`h-5 w-5 fill-red-500 text-red-500`} />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Button
              size="lg"
              className="w-full"
              variant="secondary"
              onClick={() => {
                // addToCart(product, quantity);
                window.location.href = "/checkout";
              }}
              disabled={product.stock === 0}
            >
              Buy Now
            </Button>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center space-y-2">
                <Truck className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <Shield className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs text-muted-foreground">Secure Payment</p>
              </div>
              <div className="text-center space-y-2">
                <RotateCcw className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mt-12">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.totalReviews})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <Card className="p-6">
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card className="p-6">
              <p className="text-muted-foreground text-center py-8">
                Reviews section coming soon
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

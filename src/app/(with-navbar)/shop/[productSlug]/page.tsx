"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Package, Share2, ShoppingCart, TrendingUp } from "lucide-react";
import { useState } from "react";

import { TProduct } from "@/types";
import Link from "next/link";
import { Rating } from "../_components/Rating";
import { QuantityStepper } from "./_components/QuantityStepper";

// Mock product data
const mockProduct: TProduct = {
  _id: "68f4e96529e421708d9131bc",
  name: "Logitech MX Keys S Wireless Keyboard & MX Master 3S Mouse Combo",
  slug: "logitech-mx-keys-s-wireless-keyboard-and-mx-master-3s-mouse-combo",
  description: `<p>Enhance your productivity setup with the Logitech MX Keys S and MX Master 3S combo — the ultimate wireless keyboard and mouse pair designed for professionals, creators, and multitaskers. With precision typing, silent clicks, and seamless multi-device connectivity, this duo brings comfort and control to your workflow.</p>
  
  <h3>Premium Build & Comfortable Design</h3>
  <p>The MX Keys S features spherically dished keys that match the shape of your fingertips, providing a smooth, precise, and quiet typing experience. Its solid metal body ensures stability while maintaining a slim, modern design that complements any workspace.</p>
  
  <p>The MX Master 3S mouse fits perfectly in your hand, with ergonomic contours that reduce wrist strain. Its upgraded 8,000 DPI sensor allows pixel-precise control on any surface — even glass.</p>
  
  <h3>Smart Backlighting & Custom Shortcuts</h3>
  <p>The keyboard intelligently detects your hands and adjusts the backlighting automatically based on room lighting. You can customize function keys, create app-specific shortcuts, and automate repetitive actions using Logitech Options+ software — perfect for design, coding, and video editing tasks.</p>
  
  <h3>Silent Precision Scrolling</h3>
  <p>The MX Master 3S features MagSpeed electromagnetic scrolling, letting you switch instantly between ratchet and free-spin modes. Enjoy ultra-fast scrolling through long documents or precise step-by-step navigation — 90% quieter than the previous generation.</p>
  
  <h3>Multi-Device & Cross-Platform Connectivity</h3>
  <p>Connect up to three devices simultaneously and switch between them with a tap using Bluetooth or the Logi Bolt receiver. Compatible with Windows, macOS, Linux, iPadOS, and ChromeOS, this combo adapts to any setup seamlessly.</p>`,
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
  tags: [
    "laptops-and-computers",
    "keyboards-and-mice",
    "wireless",
    "productivity",
  ],
  totalReviews: 24,
  averageRatings: 4.5,
  salesCount: 156,
  isDeleted: false,
  createdAt: "2025-10-19T13:36:37.158Z",
  updatedAt: "2025-10-19T13:36:37.158Z",
  __v: 0,
};

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = mockProduct; // In real app, fetch by slug
  //   const inWishlist = isInWishlist(product._id);

  //   const handleAddToCart = () => {
  //     addToCart(product, quantity);
  //     toast.success(`Added ${quantity} item(s) to cart!`);
  //   };

  //   const handleBuyNow = () => {
  //     addToCart(product, quantity);
  //     window.location.href = "/cart";
  //   };

  //   const handleToggleWishlist = () => {
  //     toggleWishlist(product);
  //     toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  //   };

  const discount = Math.round(
    ((product.price - product.sellingPrice) / product.price) * 100
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <Rating
                  rating={product.averageRatings}
                  totalReviews={product.totalReviews}
                />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>{product.salesCount} sold</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">
                  ৳ {product.sellingPrice.toFixed(2)}
                </span>
                {product.price > product.sellingPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ৳ {product.price.toFixed(2)}
                    </span>
                    <Badge variant="destructive">-{discount}%</Badge>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm mb-6">
                <Package className="w-4 h-4" />
                <span
                  className={
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Quantity
                </label>
                <QuantityStepper
                  value={quantity}
                  onChange={setQuantity}
                  max={product.stock}
                  size="lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  //   onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  //   onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full"
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  //   onClick={handleToggleWishlist}
                  className="flex-1"
                >
                  <Heart className={`w-5 h-5 mr-2 fill-red-500 text-red-500`} />
                  {/* {inWishlist ? "In Wishlist" : "Add to Wishlist"} */}
                  Add to Wishlist
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.totalReviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div
              className="prose prose-sm md:prose-base dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

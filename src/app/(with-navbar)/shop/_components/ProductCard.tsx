"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TProduct } from "@/types/product.type";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Rating } from "../../../../components/common/Product/Rating";

interface ProductCardProps {
  product: TProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const discount =
    product.price > product.sellingPrice
      ? Math.round(
          ((product.price - product.sellingPrice) / product.price) * 100
        )
      : 0;

  //   const handleAddToCart = (e: React.MouseEvent) => {
  //     e.preventDefault();
  //     addToCart(product);
  //     toast.success("Added to cart!");
  //   };

  //   const handleToggleWishlist = (e: React.MouseEvent) => {
  //     e.preventDefault();
  //     toggleWishlist(product);
  //     toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  //   };

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/shop/${product.slug}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {discount > 0 && (
              <Badge variant="destructive" className="font-semibold">
                -{discount}%
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="secondary">Out of Stock</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="secondary"
            size="icon"
            className={`absolute top-2 right-2 transition-opacity ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            // aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 fill-red-500 text-red-500`} />
          </Button>
        </div>

        <CardContent className="p-4">
          {/* Product Name */}
          <h3 className="font-medium text-sm md:text-base line-clamp-2 mb-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mb-3">
            <Rating
              rating={product.averageRatings}
              totalReviews={product.totalReviews}
              size="sm"
            />
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-primary">
              ৳ {product.sellingPrice.toFixed(2)}
            </span>
            {product.price > product.sellingPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ৳ {product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full"
            // onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};

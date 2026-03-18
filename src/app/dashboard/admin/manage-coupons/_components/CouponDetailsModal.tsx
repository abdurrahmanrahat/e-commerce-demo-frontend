"use client";

import { getProductsByIdsFromDB } from "@/app/actions/product";
import { LoaderSpinner } from "@/components/shared/Ui/Loader/LoaderSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { TProduct } from "@/types";
import { TCoupon } from "@/types/coupon.type";
import { Calendar, DollarSign, Eye, LayoutGrid, Percent } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ExpiryRemaining from "./ExpiryRemaining";

const CouponDetailsModal = ({ coupon }: { coupon: TCoupon }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<TProduct[]>([]);
  console.log("products", products);
  console.log("test...");

  useEffect(() => {
    if (!open) return;

    const fetchProducts = async () => {
      if (!coupon.productIds?.length) return;
      setIsLoading(true);

      const results = await getProductsByIdsFromDB(coupon.productIds);
      setProducts(results.data || []);
      setIsLoading(false);
    };

    fetchProducts();
  }, [open, coupon.productIds]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-3xl! max-h-[90vh] overflow-y-auto"
        // showCloseButton={false}
      >
        <DialogHeader className="">
          <DialogTitle className="text-lg font-semibold">
            Coupon: <span className="italic">{coupon.code}</span>
          </DialogTitle>
          <Badge
            variant={coupon.isActive ? "default" : "secondary"}
            className="text-white "
          >
            {coupon.isActive ? "Active" : "Inactive"}
          </Badge>
        </DialogHeader>

        <Separator />

        <div className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <div className="flex items-center gap-2">
                {coupon.type === "percentage" ? (
                  <Percent className="h-4 w-4" />
                ) : (
                  <DollarSign className="h-4 w-4" />
                )}
                <span className="font-medium capitalize">{coupon.type}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Value</p>
              <p className="font-semibold">
                {coupon.type === "percentage"
                  ? `${coupon.value}%`
                  : `$${coupon.value}`}
              </p>
            </div>

            {/* Min Order */}
            <div>
              <p className="text-sm text-muted-foreground">Min Order Amount</p>
              <p className="font-medium">
                {coupon.minOrder ? `$${coupon.minOrder}` : "No minimum order"}
              </p>
            </div>

            {/* Max Discount */}
            <div>
              <p className="text-sm text-muted-foreground">Max Discount</p>
              <p className="font-medium">
                {coupon.maxDiscount ? `$${coupon.maxDiscount}` : "No limit"}
              </p>
            </div>

            {/* Uses */}
            <div>
              <p className="text-sm text-muted-foreground">Total Uses</p>
              <p className="font-semibold">{coupon.uses}</p>
            </div>

            {/* Scope */}
            <div>
              <p className="text-sm text-muted-foreground">Scope</p>
              <Badge variant="outline" className="capitalize">
                {coupon.scope}
              </Badge>
            </div>
          </div>

          {/* Expiry */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Expiry</span>
            </div>

            <ExpiryRemaining expiresAt={coupon?.expiresAt} />
          </div>

          {/* Products */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <LayoutGrid className="h-4 w-4" />
              <span className="text-sm">Applicable Products</span>
            </div>
            {isLoading ? (
              <div className="text-center pt-4">
                <LoaderSpinner />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 animate-pulse">
                  Loading...
                </p>
              </div>
            ) : (
              <>
                {coupon.scope === "all" ? (
                  <p className="text-sm">Applies to all products</p>
                ) : products.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {products.map((product) => (
                      <Link key={product._id} href={`/shop/${product.slug}`}>
                        <div className="border border-muted rounded-md p-2 flex items-center gap-2">
                          <Image
                            src={product.images?.[0]}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                          <span className="text-sm line-clamp-1">
                            {product.name}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-foreground">
                    No specific products assigned
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CouponDetailsModal;

"use client";

import { Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types";
import { useRouter } from "next/navigation";
import WishlistCard from "./WishListCard";

export default function WishlistSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<TProduct[]>([]);

  const router = useRouter();

  const wishlists = useAppSelector((state) => state.wishlist.items);
  console.log("wishlists", wishlists);

  useEffect(() => {
    if (!isOpen) return;

    let active = true;

    const fetchProducts = async () => {
      setIsLoading(true);

      if (wishlists.length === 0) {
        if (active) {
          setProducts([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        const ids = wishlists.map((item) => item.productId);

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
  }, [wishlists, isOpen]);

  const wishlistProducts = useMemo(() => {
    if (!products.length || !wishlists.length) return [];

    const productMap = new Map(products.map((p) => [p._id, p]));

    return wishlists
      .map((item) => {
        const product = productMap.get(item.productId);
        return product ? { product } : undefined;
      })
      .filter(Boolean) as { product: TProduct }[];
  }, [wishlists, products]);

  console.log("wishlistProducts", wishlistProducts);

  const handleContinueShopping = () => {
    setIsOpen((prev) => !prev);
    router.push("/shop");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <span className="relative cursor-pointer">
          <Heart className="w-5 h-5 2xl:w-6 2xl:h-6" />

          {wishlists.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-[10px] h-4 2xl:h-5 w-4 2xl:w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary"
            >
              {wishlists.length}
            </Badge>
          )}
        </span>
      </SheetTrigger>
      <SheetContent
        showCloseButton={true}
        className="w-full sm:max-w-[400px] border-none"
      >
        <SheetHeader className="-mb-4">
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Your Wishlist Items
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full overflow-auto">
          {/* Main Content */}
          <div className="w-full pb-6 px-4">
            <div>
              <div>
                <div className="">
                  {wishlists.length === 0 && !isLoading ? (
                    <div className="flex flex-col items-center justify-center gap-1 py-12">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <Heart className="w-12 h-12" />
                        <h4 className="text-lg lg:text-xl font-medium">
                          Your wishlist is empty!
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                          Add some products to get started
                        </p>
                      </div>
                      <Button onClick={handleContinueShopping}>
                        Continue Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="py-6">
                      {wishlistProducts.map(({ product }, index) => (
                        <div key={product._id}>
                          <WishlistCard
                            product={product}
                            onSheetClose={setIsOpen}
                          />

                          {index < wishlists.length - 1 && (
                            <hr className="my-4 border border-primary/10" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

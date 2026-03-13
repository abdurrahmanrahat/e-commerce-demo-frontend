import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-6">
      <div className="flex flex-col items-center justify-center gap-1">
        <ShoppingBag className="w-12 h-12" />
        <h4 className="text-lg lg:text-xl font-medium">Your cart is empty!</h4>
        <p className="text-sm 2xl:text-base text-gray-600 dark:text-gray-300 mb-6">
          Add some products to get started
        </p>
      </div>
      <Button asChild>
        <Link href="/shop">Continue Shopping</Link>
      </Button>
    </div>
  );
};

export default EmptyCart;

import { CheckoutSteps } from "@/components/common/Cart/CheckoutSteps";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const NotFoundCartItems = ({ step }: { step: 1 | 2 | 3 }) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <CheckoutSteps currentStep={step} />

        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingBag className="w-20 h-20 md:w-24 md:h-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Add some products to get started
          </p>

          <Link href="/shop">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundCartItems;

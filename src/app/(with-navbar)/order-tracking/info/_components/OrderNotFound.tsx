import Container from "@/components/shared/Ui/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

const OrderNotFound = ({ message }: { message: string }) => {
  return (
    <Container className="">
      <div className="h-screen flex items-center justify-center">
        <Card className="max-w-lg mx-auto border-muted shadow-sm">
          <CardContent className="py-14 flex flex-col items-center text-center gap-5">
            {/* Icon */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 text-red-600">
              <AlertCircle size={28} />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <p className="text-xl font-semibold text-red-500">
                {message || "Order not found"}
              </p>

              <p className="text-sm text-muted-foreground max-w-sm">
                We couldn't locate the order using the provided information.
                Please check your order ID and phone number, or continue
                shopping.
              </p>
            </div>

            {/* Button */}
            <Link href="/shop">
              <Button className="mt-2 px-6">Continue Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default OrderNotFound;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TOrder } from "@/types/order.type";

const OrderSummary = ({ order }: { order: TOrder }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 -mt-2">
        <div className="flex justify-between text-sm 2xl:text-base">
          <span className="text-muted-foreground">Subtotal:</span>
          <span className="font-medium">${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm 2xl:text-base">
          <span className="text-muted-foreground">Shipping:</span>
          <span className="font-medium">${order.shippingCost.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;

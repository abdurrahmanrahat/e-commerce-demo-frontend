import MyImage from "@/components/shared/Ui/Image/MyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOrder, TOrderItem } from "@/types/order.type";

const OrderItems = ({ order }: { order: TOrder }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {order.orderItems.map((item: TOrderItem) => (
          <div key={item._id} className="flex gap-2 md:gap-4">
            <MyImage
              src={item.product.images[0]}
              alt={item.product.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded object-cover bg-muted"
            />
            <div className="flex-1">
              <p className="text-sm 2xl:text-base md:text-base font-medium line-clamp-2">
                {item.product.name}
              </p>
              <p className="text-sm 2xl:text-base text-muted-foreground">
                Qty: {item.quantity}
              </p>
            </div>
            <span className="font-medium">
              ${(item.product.sellingPrice * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderItems;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOrder } from "@/types/order.type";
import { formatDateFromIOS } from "@/utils/date";
import { Package } from "lucide-react";

const OrderDetails = ({ order }: { order: TOrder }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6" />
          <CardTitle>Order Details</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm 2xl:text-base text-muted-foreground mb-1">
              Order Number
            </p>
            <p className="font-semibold">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-sm 2xl:text-base text-muted-foreground mb-1">
              Order Date
            </p>
            <p className="font-semibold">
              {formatDateFromIOS(order.createdAt)}
              {/* {new Date(order.createdAt).toLocaleDateString("en-GB")} */}
            </p>
          </div>
          <div>
            <p className="text-sm 2xl:text-base text-muted-foreground mb-1">
              Payment Method
            </p>
            <p className="font-semibold">{order.paymentMethod}</p>
          </div>
          <div>
            <p className="text-sm 2xl:text-base text-muted-foreground mb-1">
              Status
            </p>
            <p
              className={`font-semibold ${
                order.status === "pending"
                  ? "text-yellow-600"
                  : order.status === "delivered"
                    ? "text-green-600"
                    : "text-red-600"
              }`}
            >
              {order.status}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDetails;

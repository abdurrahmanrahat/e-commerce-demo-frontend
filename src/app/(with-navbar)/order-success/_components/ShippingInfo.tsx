import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOrder } from "@/types/order.type";
import { Calendar, MapPin, Truck } from "lucide-react";

const ShippingInfo = ({ order }: { order: TOrder }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Truck className="w-6 h-6" />
          <CardTitle>Shipping Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">{order.fullName}</p>
            <p className="text-sm 2xl:text-base text-muted-foreground">
              {order.fullAddress}
            </p>
            <p className="text-sm 2xl:text-base text-muted-foreground">
              {order.country}
            </p>
            <p className="text-sm 2xl:text-base text-muted-foreground">
              {order.phone}
            </p>
          </div>
        </div>
        <div>
          {order?.orderNotes && (
            <div className="text-sm 2xl:text-base text-muted-foreground">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Special Notes:
              </span>{" "}
              <p>{order?.orderNotes}</p>
            </div>
          )}
        </div>

        <div className="bg-primary/10 rounded-lg p-4 flex items-start gap-3">
          <Calendar className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-primary">Estimated Delivery</p>
            <p className="text-sm 2xl:text-base">
              {order.shippingOption === "dhaka"
                ? "1–2 Days (Inside Dhaka)"
                : "2–4 Days (Outside Dhaka)"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingInfo;

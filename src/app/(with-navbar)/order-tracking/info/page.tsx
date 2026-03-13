import { trackingOrderFromDB } from "@/app/actions/order";
import Container from "@/components/shared/Ui/Container";
import { Card, CardContent } from "@/components/ui/card";
import OrderDetails from "../../order-success/_components/OrderDetails";
import OrderItems from "../../order-success/_components/OrderItems";
import OrderSummary from "../../order-success/_components/OrderSummary";
import ShippingInfo from "../../order-success/_components/ShippingInfo";
import OrderNotFound from "./_components/OrderNotFound";
import OrderStatusTimeline from "./_components/OrderStatusTimeline";

const OrderTrackingInfoPage = async (props: {
  searchParams: Promise<{
    orderNumber: string;
    phone: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const { orderNumber, phone } = searchParams;

  const res = await trackingOrderFromDB(orderNumber, phone);

  if (!res.success) {
    return <OrderNotFound message={res?.message} />;
  }

  const order = res.data;

  return (
    <Container className="py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold">Order Tracking</h1>
        <p className="text-muted-foreground">Track the status of your order</p>
      </div>

      {/* Order Info */}
      <Card>
        <CardContent>
          <OrderStatusTimeline status={order.status} />
        </CardContent>
      </Card>

      {/* Order Details */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Items */}
        <div className="md:col-span-2 space-y-2">
          {/* Order Details */}
          <OrderDetails order={order} />

          {/* Shipping Info */}
          <ShippingInfo order={order} />
          <OrderItems order={order} />
        </div>

        {/* Summary */}
        <OrderSummary order={order} />
      </div>
    </Container>
  );
};

export default OrderTrackingInfoPage;

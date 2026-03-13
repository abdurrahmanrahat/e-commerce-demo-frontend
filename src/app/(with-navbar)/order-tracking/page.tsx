import Container from "@/components/shared/Ui/Container";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Truck } from "lucide-react";
import OrderTrackingForm from "./_components/OrderTrackingForm";

const OrderTrackingPage = () => {
  return (
    <Container className="">
      <div className="h-screen flex items-center justify-center">
        <Card className="w-full max-w-lg mx-auto shadow-cardLightShadow dark:shadow-cardDarkShadow border-muted py-8">
          <CardHeader className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="p-3 2xl:p-4 rounded-full bg-red-100 text-red-600">
                <Truck size={26} />
              </div>
            </div>

            <CardTitle className="text-2xl 2xl:text-3xl font-semibold">
              Track Your Order
            </CardTitle>

            <CardDescription>
              Enter your order ID and phone number to check the current status
              of your order.
            </CardDescription>
          </CardHeader>

          <OrderTrackingForm />
        </Card>
      </div>
    </Container>
  );
};

export default OrderTrackingPage;

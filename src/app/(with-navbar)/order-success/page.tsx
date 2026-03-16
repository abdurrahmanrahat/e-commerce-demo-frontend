import { getSingleOrderFromDB } from "@/app/actions/order";
import Container from "@/components/shared/Ui/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, PhoneCall } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckoutSteps } from "../../../components/common/Cart/CheckoutSteps";
import InvoiceViewer from "./_components/InvoiceViewer";
import OrderDetails from "./_components/OrderDetails";
import OrderItems from "./_components/OrderItems";
import OrderSummary from "./_components/OrderSummary";
import ShippingInfo from "./_components/ShippingInfo";

export const metadata: Metadata = {
  title: "Order Success | Gadgetoria",
  description:
    "Discover genuine electronic parts and accessories for every device",
};

const OrderSuccessPage = async (props: {
  searchParams: Promise<{ orderId: string }>;
}) => {
  const searchParams = await props.searchParams;
  const orderId = searchParams.orderId;

  if (!orderId) redirect("/shop");

  const res = await getSingleOrderFromDB(orderId);

  if (!res?.data) redirect("/shop");

  const order = res.data;

  return (
    <div className="min-h-screen">
      <Container className="py-6">
        <div className="max-w-4xl mx-auto">
          <CheckoutSteps currentStep={3} />

          {/* Success Message */}
          <div className="text-center my-8">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h1 className="text-xl md:text-2xl 2xl:text-3xl font-semibold">
              Order Placed Successfully!
            </h1>
            <p className="text-sm 2xl:text-base text-gray-600 dark:text-gray-400 mt-1">
              Thank you for your order. We&apos;ll send you a confirmation call
              shortly.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Details */}
              <OrderDetails order={order} />

              {/* Shipping Info */}
              <ShippingInfo order={order} />

              {/* Order Items */}
              <OrderItems order={order} />
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              <OrderSummary order={order} />

              <div className="flex flex-col gap-4">
                <Link href="/shop">
                  <Button size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Invoice  */}
                <InvoiceViewer order={order} />
              </div>

              <Card>
                <CardHeader className="">
                  <CardTitle className="text-base">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 -mt-4">
                  <p className="text-sm 2xl:text-base text-muted-foreground">
                    Contact our customer support team for any questions about
                    your order.
                  </p>
                  <Button variant="outline" className="w-full">
                    <PhoneCall className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderSuccessPage;

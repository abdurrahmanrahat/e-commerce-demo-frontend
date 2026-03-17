import { Metadata } from "next";
import AddCouponForm from "./_components/AddCouponForm";

export const metadata: Metadata = {
  title: "Manage Coupons > Dashboard | Gadgetoria",
  description:
    "Discover genuine electronic parts and accessories for every device",
};

const ManageCouponsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl md:text-2xl 2xl:text-3xl font-semibold">
            Manage Coupons
          </h2>
          <p className="text-base 2xl:text-lg mt-1">
            Explore all available coupons
          </p>
        </div>

        <AddCouponForm />
      </div>

      <div>Lists here</div>
    </div>
  );
};

export default ManageCouponsPage;

import { getAllCouponsFromDB } from "@/app/actions/coupon";
import NoDataFound from "@/components/shared/Ui/Data/NoDataFound";
import NoDataFoundBySearchFilter from "@/components/shared/Ui/Data/NoDataFoundBySearchFilter";
import MYPagination from "@/components/shared/Ui/Pagination/MYPagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import AddCouponForm from "./_components/AddCouponForm";
import CouponsSearch from "./_components/CouponsSearch";
import CouponsType from "./_components/CouponsType";

import { TCoupon } from "@/types";
import CouponsScope from "./_components/CouponsScope";
import CouponsStatus from "./_components/CouponsStatus";
import TableList from "./_components/TableList";

export const metadata: Metadata = {
  title: "Manage Coupons > Dashboard | Gadgetoria",
  description:
    "Discover genuine electronic parts and accessories for every device",
};

type TManageCouponsPageParams = {
  searchTerm?: string;
  type?: string;
  isActive?: string;
  scope?: string;
  page?: string;
  limit?: string;
};

const MANAGE_COUPONS_DATA_LIMIT = "8";

const ManageCouponsPage = async (props: {
  searchParams: Promise<TManageCouponsPageParams>;
}) => {
  const searchParams = await props?.searchParams;

  const {
    searchTerm,
    type,
    isActive,
    scope,
    page = "1",
    limit = MANAGE_COUPONS_DATA_LIMIT,
  } = searchParams || {};

  const params: Record<string, string> = {};

  if (searchTerm) {
    params.searchTerm = searchTerm;
  }
  if (type) {
    params.type = type;
  }
  if (isActive) {
    params.isActive = isActive;
  }
  if (scope) {
    params.scope = scope;
  }
  if (page) {
    params.page = page;
  }
  if (limit) {
    params.limit = limit;
  }

  const couponsResponse = await getAllCouponsFromDB(params);

  const totalData = couponsResponse?.data?.totalCount || 0;

  const expiredCoupons = couponsResponse?.data?.data?.filter(
    (coupon: TCoupon) =>
      coupon.expiresAt && new Date(coupon.expiresAt) < new Date(),
  );

  const unexpiredCoupons = couponsResponse?.data?.data?.filter(
    (coupon: TCoupon) =>
      !coupon.expiresAt || new Date(coupon.expiresAt) >= new Date(),
  );

  return (
    <div className="min-h-screen w-full">
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-card px-3 md:px-6">
          <div className="flex gap-4 items-center justify-between">
            <div>
              <CardTitle className="text-xl md:text-2xl 2xl:text-3xl font-semibold">
                All Coupon List
              </CardTitle>
              <CardDescription className="text-sm 2xl:text-base">
                Explore all available coupons
              </CardDescription>
            </div>

            <AddCouponForm />
          </div>
        </CardHeader>

        {!couponsResponse?.success ? (
          <NoDataFound
            title="Coupons not found!"
            description="We couldn’t find any coupons right now. Please check back later for new arrivals."
          />
        ) : (
          <CardContent className="px-3 md:px-6">
            {/* Filters Section */}
            <div className="mb-6 flex flex-col gap-2 md:gap-4 sm:flex-row sm:items-center">
              <CouponsSearch />

              <CouponsType />
              <CouponsScope />
              <CouponsStatus />
            </div>

            {/* table */}
            {couponsResponse?.data?.data?.length === 0 ? (
              <NoDataFoundBySearchFilter
                title="Coupons not found!"
                description="Try searching for something else or clear all filters to explore available coupons."
              />
            ) : (
              <div>
                <div>
                  {/* Unexpired Coupon Table */}
                  <h2 className="text-xl md:text-2xl 2xl:text-3xl font-semibold mb-4 text-green-600">
                    Unexpired Coupons:
                  </h2>
                  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 ">
                    {unexpiredCoupons.length === 0 ? (
                      <NoDataFoundBySearchFilter
                        title="Unexpired coupons not found!"
                        description="Try searching for something else or clear all filters to explore available coupons."
                      />
                    ) : (
                      <TableList coupons={unexpiredCoupons} />
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  {/* Expired Coupon Table */}
                  <h2 className="text-xl md:text-2xl 2xl:text-3xl font-semibold mb-4 text-primary">
                    Expired Coupons:
                  </h2>
                  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 ">
                    {expiredCoupons.length === 0 ? (
                      <NoDataFoundBySearchFilter
                        title="Expired coupons not found!"
                        description="Try searching for something else or clear all filters to explore available coupons."
                      />
                    ) : (
                      <TableList coupons={expiredCoupons} />
                    )}
                  </div>
                </div>
              </div>
            )}

            {couponsResponse?.data?.data?.length !== 0 &&
              MANAGE_COUPONS_DATA_LIMIT < totalData && (
                <div className="mt-6">
                  <MYPagination
                    totalData={totalData}
                    dataLimit={Number(MANAGE_COUPONS_DATA_LIMIT)}
                  />
                </div>
              )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ManageCouponsPage;

{
  /* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-muted"
                              >
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-60">
                              <DropdownMenuItem asChild>
                                <CouponDetailsModal coupon={coupon} />
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                  onClick={() => handleToggleStatus(product)}
                                >
                                  {product?.isActive
                                    ? "Set Inactive"
                                    : "Set Active"}
                                </DropdownMenuItem>

                              <DropdownMenuItem
                                asChild
                                className="text-red-500"
                              >
                                <div>
                                  <DeleteCouponModal couponId={coupon?._id} />
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu> */
}

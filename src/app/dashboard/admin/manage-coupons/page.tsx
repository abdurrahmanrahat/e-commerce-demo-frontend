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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Infinity, Pencil } from "lucide-react";
import { Metadata } from "next";
import AddCouponForm from "./_components/AddCouponForm";
import CouponsSearch from "./_components/CouponsSearch";
import CouponsType from "./_components/CouponsType";

import { Button } from "@/components/ui/button";
import { TCoupon } from "@/types";
import CouponDetailsModal from "./_components/CouponDetailsModal";
import DeleteCouponModal from "./_components/DeleteCouponModal";
import ExpiryRemaining from "./_components/ExpiryRemaining";

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
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 ">
              {couponsResponse?.data?.data?.length === 0 ? (
                <NoDataFoundBySearchFilter
                  title="Coupons not found!"
                  description="Try searching for something else or clear all filters to explore available collections."
                />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Coupon Code</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Discount Amount</TableHead>
                      <TableHead>Uses</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>isActive</TableHead>
                      <TableHead>Scope</TableHead>
                      <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {couponsResponse?.data?.data?.map((coupon: TCoupon) => (
                      <tr
                        key={coupon._id}
                        className="group border-b border-gray-200 dark:border-gray-700 hover:bg-muted/30 transition-colors"
                      >
                        <TableCell className="">{coupon.code}</TableCell>

                        <TableCell className="font-medium capitalize">
                          {coupon.type}
                        </TableCell>
                        <TableCell>
                          {coupon.type === "percentage"
                            ? `${coupon.value}%`
                            : `$${coupon.value}`}
                        </TableCell>
                        <TableCell>{coupon.uses}</TableCell>
                        <TableCell>
                          {coupon.expiresAt ? (
                            <ExpiryRemaining expiresAt={coupon?.expiresAt} />
                          ) : (
                            <Infinity className="w-5 h-5" />
                          )}
                        </TableCell>
                        <TableCell>
                          {coupon.isActive ? "Active" : "Inactive"}
                        </TableCell>
                        <TableCell>
                          {coupon.scope === "all"
                            ? "All Products"
                            : "Specific Products"}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center justify-center gap-1 md:gap-2">
                            <CouponDetailsModal coupon={coupon} />

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-muted"
                            >
                              <Pencil className="h-4 w-4 text-muted-foreground" />
                            </Button>

                            <DeleteCouponModal couponId={coupon?._id} />
                          </div>
                        </TableCell>
                      </tr>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Infinity } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TCoupon } from "@/types";
import CouponDetailsModal from "./CouponDetailsModal";
import CouponStatusChangeModal from "./CouponStatusChangeModal";
import DeleteCouponModal from "./DeleteCouponModal";
import ExpiryRemaining from "./ExpiryRemaining";

const TableList = ({ coupons }: { coupons: TCoupon[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Coupon Code</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Discount Amount</TableHead>
          <TableHead>Uses</TableHead>
          <TableHead>Available</TableHead>
          <TableHead>Scope</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {coupons?.map((coupon: TCoupon) => (
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
              {coupon.scope === "all" ? "All Products" : "Specific"}
            </TableCell>

            <TableCell className="p-0">
              <Badge
                variant="outline"
                className={`flex items-center gap-1  text-xs font-medium ${
                  coupon.isActive
                    ? "border-green-500/30 text-green-600 dark:text-green-400"
                    : "border-red-500/30 text-red-600 dark:text-red-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    coupon.isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                {coupon.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>

            <TableCell>
              <div className="flex items-center justify-center gap-1 md:gap-2">
                <CouponDetailsModal coupon={coupon} />

                <CouponStatusChangeModal coupon={coupon} />

                <DeleteCouponModal couponId={coupon?._id} />
              </div>
            </TableCell>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableList;

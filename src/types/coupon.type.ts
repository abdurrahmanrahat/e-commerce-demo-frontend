export type TCouponType = "fixed" | "percentage";
export type TCouponScope = "all" | "specific";

export type TCoupon = {
  _id: string;

  code: string;
  type: TCouponType;
  value: number;

  minOrder?: number;
  maxDiscount?: number;

  uses: number;

  expiresAt?: string;

  isActive: boolean;

  scope: TCouponScope;

  productIds: string[];

  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;
  __v: number;
};

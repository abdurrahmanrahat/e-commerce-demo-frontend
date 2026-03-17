"use server";

import { tagLists } from "@/constants/tag";
import { TServerResponse } from "@/types/action.type";
import { revalidateTag } from "next/cache";
import { fetchWithAuth } from "./fetchWithAuth";

/* ============================================
   Get All Coupons
============================================ */
export const getAllCouponsFromDB = async (
  params?: Record<string, any>,
): Promise<TServerResponse> => {
  try {
    const queryParams = params
      ? "?" + new URLSearchParams(params).toString()
      : "";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKED_URL}/coupons${queryParams}`,
      {
        cache: "no-store",
        next: { tags: [tagLists.COUPON] },
      },
    );

    if (!res.ok) {
      return { success: false, data: [], message: "Failed to fetch coupons" };
    }

    const data = await res.json();

    if (data?.success) {
      return {
        success: data?.success ?? true,
        data: data?.data || [],
        message: data?.message,
      };
    } else {
      return {
        success: data?.success ?? false,
        data: data?.data || null,
        message: data?.errorSources?.[0]?.message || data?.message,
      };
    }
  } catch (error: any) {
    console.error("Error fetching coupons:", error);
    return { success: false, data: [], message: "Network or server error" };
  }
};

/* ============================================
   Get Single Coupon
============================================ */
export const getSingleCouponFromDB = async (
  couponId: string,
): Promise<TServerResponse> => {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKED_URL}/coupons/${couponId}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return { success: false, data: null, message: "Failed to fetch coupon" };
    }

    const data = await res.json();

    if (data?.success) {
      return {
        success: data?.success ?? true,
        data: data?.data || {},
        message: data?.message,
      };
    } else {
      return {
        success: data?.success ?? false,
        data: data?.data || null,
        message: data?.errorSources?.[0]?.message || data?.message,
      };
    }
  } catch (error: any) {
    console.error("Error fetching coupon:", error);
    return { success: false, data: null, message: "Network or server error" };
  }
};

/* ============================================
   Add Coupon
============================================ */
export const addCouponToDB = async (
  couponData: Record<string, any>,
): Promise<TServerResponse> => {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKED_URL}/coupons`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(couponData),
        cache: "no-store",
      },
    );

    const data = await res.json();
    revalidateTag(tagLists.COUPON, "max");

    if (data?.success) {
      return {
        success: data?.success ?? true,
        data: data?.data || [],
        message: data?.message,
      };
    } else {
      return {
        success: data?.success ?? false,
        data: data?.data || null,
        message: data?.errorSources?.[0]?.message || data?.message,
      };
    }
  } catch (error) {
    console.error("Error adding coupon:", error);
    return { success: false, data: null, message: "Network or server error" };
  }
};

/* ============================================
   Update Coupon
============================================ */
export const updateCouponInDB = async (
  couponId: string,
  updatedData: Record<string, any>,
): Promise<TServerResponse> => {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKED_URL}/coupons/${couponId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return {
        success: false,
        data: null,
        message: "Failed to update coupon",
      };
    }

    const data = await res.json();
    revalidateTag(tagLists.COUPON, "max");

    if (data?.success) {
      return {
        success: data?.success ?? true,
        data: data?.data || [],
        message: data?.message,
      };
    } else {
      return {
        success: data?.success ?? false,
        data: data?.data || null,
        message: data?.errorSources?.[0]?.message || data?.message,
      };
    }
  } catch (error: any) {
    console.error("Error updating coupon:", error);
    return { success: false, data: null, message: "Network or server error" };
  }
};

/* ============================================
   Delete Coupon
============================================ */
export const deleteCouponFromDB = async (
  couponId: string,
): Promise<TServerResponse> => {
  try {
    const res = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKED_URL}/coupons/${couponId}`,
      {
        method: "DELETE",
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return {
        success: false,
        data: null,
        message: "Failed to delete coupon",
      };
    }

    const data = await res.json();
    revalidateTag(tagLists.COUPON, "max");

    if (data?.success) {
      return {
        success: data?.success ?? true,
        data: data?.data || [],
        message: data?.message,
      };
    } else {
      return {
        success: data?.success ?? false,
        data: data?.data || null,
        message: data?.errorSources?.[0]?.message || data?.message,
      };
    }
  } catch (error: any) {
    console.error("Error deleting coupon:", error);
    return { success: false, data: null, message: "Network or server error" };
  }
};

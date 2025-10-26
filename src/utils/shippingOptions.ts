import {
  insideDhakaShippingCost,
  outsideDhakaShippingCost,
} from "@/constants/shippingKey";

export type TShippingOption = {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
};

export const shippingOptions: TShippingOption[] = [
  {
    id: "dhaka",
    name: "Inside Dhaka city (2-3 Days)",
    price: insideDhakaShippingCost,
    estimatedDays: "2-3 days",
  },
  {
    id: "outside",
    name: "Outside Dhaka City (3-5 Days)",
    price: outsideDhakaShippingCost,
    estimatedDays: "3-5 days",
  },
];

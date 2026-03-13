import { TProduct } from "./product.type";

export type TCartItem = {
  productId: string;
  quantity: number;
};

export type TCartProduct = {
  product: TProduct;
  quantity: number;
};

import { TCartItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TCartState = {
  items: TCartItem[];
  shippingOption: "dhaka" | "outside";
};

const initialState: TCartState = {
  items: [],
  shippingOption: "dhaka",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
      }>,
    ) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId,
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    updateShippingOption: (
      state,
      action: PayloadAction<"dhaka" | "outside">,
    ) => {
      state.shippingOption = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  updateShippingOption,
} = cartSlice.actions;

export default cartSlice.reducer;

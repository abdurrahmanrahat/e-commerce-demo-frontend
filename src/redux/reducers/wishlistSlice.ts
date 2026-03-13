import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TWishlistItem = {
  productId: string;
};

type TWishlistState = {
  items: TWishlistItem[];
};

const initialState: TWishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      const exists = state.items.find(
        (item) => item.productId === action.payload,
      );

      if (!exists) {
        state.items.push({ productId: action.payload });
      }
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;

import { TResponseUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TAuthState = {
  user: null | TResponseUser;
  accessToken: null | string;
  refreshToken: null | string;
};

const initialState: TAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentUser = (state: RootState) => state.auth.user;
export const useRefreshToken = (state: RootState) => state.auth.refreshToken;

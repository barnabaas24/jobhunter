import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice";
import { authSlice } from "./authSlice";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(authApiSlice.middleware),
});

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice";
import { authSlice } from "./authSlice";
import { jobApiSlice } from "./jobApiSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [jobApiSlice.reducerPath]: jobApiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(authApiSlice.middleware).concat(jobApiSlice.middleware),
});

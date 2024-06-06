import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { jobHunterApi } from "./api/jobHunterApi";
import { authSlice } from "./authSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [jobHunterApi.reducerPath]: jobHunterApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(jobHunterApi.middleware),
});

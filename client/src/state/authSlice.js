import { createSlice } from "@reduxjs/toolkit";
import { jobHunterApi } from "./api/jobHunterApi";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(jobHunterApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.accessToken;
    });
  },
  selectors: {
    selectUserRole: (state) => state.user?.role ?? undefined,
  },
});

export const { login, logout } = authSlice.actions;
export const { selectUserRole } = authSlice.selectors;

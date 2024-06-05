import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice";

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
    builder.addMatcher(authApiSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    });
  },
});

export const { login, logout } = authSlice.actions;

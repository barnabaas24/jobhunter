import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3030",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    // const token = localStorage.getItem("accessToken");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const jobHunterApi = createApi({
  reducerPath: "jobHunterApi",
  tagTypes: ["Jobs", "Experiences", "Applicants"],
  baseQuery,
  endpoints: () => ({}),
});

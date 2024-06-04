import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApiSlice = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/jobs" }),
  tagTypes: ["Jobs"],
  endpoints: (build) => ({
    getAllJobs: build.query({
      query: () => "",
      transformResponse: (result) => result.data,
      providesTags: ["Jobs"],
    }),
  }),
});

export const { useGetAllJobsQuery } = jobApiSlice;

import { jobHunterApi } from "./jobHunterApi";

const jobApi = jobHunterApi.injectEndpoints({
  endpoints: (build) => ({
    getAllJobs: build.query({
      query: () => "/jobs",
      transformResponse: (result) => result.data,
      providesTags: ["Jobs"],
    }),
    createNewJob: build.mutation({
      query: (body) => ({
        url: "/jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllJobsQuery, useCreateNewJobMutation } = jobApi;

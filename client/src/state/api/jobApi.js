import { jobHunterApi } from "./jobHunterApi";

const jobApi = jobHunterApi.injectEndpoints({
  endpoints: (build) => ({
    getAllJobs: build.query({
      query: () => "/jobs",
      transformResponse: (result) => result.data,
      providesTags: ["Jobs"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllJobsQuery } = jobApi;

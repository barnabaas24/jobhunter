import { jobHunterApi } from "./jobHunterApi";

const applicantsApi = jobHunterApi.injectEndpoints({
  endpoints: (build) => ({
    getJobApplicants: build.query({
      query: (jobId) => `/applicants?jobId=${jobId}`,
      providesTags: ["Applicants"],
    }),
    applyForJob: build.mutation({
      query: (body) => ({
        url: "/applicants",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs", "Applicants"],
    }),
  }),
  overrideExisting: false,
});

export const { useApplyForJobMutation, useGetJobApplicantsQuery } = applicantsApi;

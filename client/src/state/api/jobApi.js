import { jobHunterApi } from "./jobHunterApi";

const jobApi = jobHunterApi.injectEndpoints({
  endpoints: (build) => ({
    getAllJobs: build.query({
      query: () => "/jobs",
      transformResponse: (result) => result.data,
      providesTags: ["Jobs"],
    }),
    getJobById: build.query({
      query: (id) => `/jobs/${id}`,
      providesTags: ["Jobs"],
    }),
    getJobsByUserId: build.query({
      query: (userId) => `/jobs?userId=${userId}`,
      method: "GET",
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
    editJob: build.mutation({
      query: ({ id, body }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),
    removeJob: build.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllJobsQuery,
  useCreateNewJobMutation,
  useGetJobByIdQuery,
  useGetJobsByUserIdQuery,
  useEditJobMutation,
  useRemoveJobMutation,
} = jobApi;

import { jobHunterApi } from "./jobHunterApi";

const experienceApi = jobHunterApi.injectEndpoints({
  endpoints: (build) => ({
    getExperiences: build.query({
      query: () => "/experiences",
      transformResponse: (result) => result.data,
      providesTags: ["Experiences"],
    }),
    addExperiences: build.mutation({
      query: (body) => ({
        url: "/experiences",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetExperiencesQuery, useAddExperiencesMutation } = experienceApi;

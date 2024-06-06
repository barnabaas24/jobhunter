import { jobHunterApi } from "./jobHunterApi";

const authApi = jobHunterApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body: { ...body },
      }),
    }),
    login: build.mutation({
      query: (body) => ({
        url: "/authentication",
        method: "POST",
        body: {
          ...body,
          strategy: "local",
        },
      }),
    }),
    getUserInfo: build.query({
      query: (id) => ({
        url: "/users/" + id,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation, useGetUserInfoQuery } = authApi;

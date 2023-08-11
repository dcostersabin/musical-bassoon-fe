import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ----------------------------------------------------------------------

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_HOST_API,
  prepareHeaders: (headers, { getState, endpoint }) => {
    headers.set("authorization", `Bearer ${localStorage.getItem("access")}`);
    return headers;
  },
});

const baseQueryWithAuthValidation = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  let status = response?.error?.status;

  //   if (status === 401) logoutUser(currentUser, api.dispatch);

  return response;
};

export const apiTags = ["users"];

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuthValidation,
  tagTypes: apiTags,
  endpoints: (builder) => ({}),
});

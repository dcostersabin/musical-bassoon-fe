import { apiSlice } from "../../../app/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listUsers: builder.query({
      query: ({ page, role }) => ({
        url: `users`,
        method: "GET",
        params: { page, role },
      }),
      providesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `users`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useListUsersQuery, useDeleteUserMutation } = dashboardApi;

export default dashboardApi;

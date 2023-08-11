import { apiSlice } from '../../../app/apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ data }) => ({
        url: `login`,
        method: 'POST',
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: ({ data }) => ({
        url: `register`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags:["users"]
    }),
    userDetails: builder.query({
      query: () => ({
        url: `profile`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useUserDetailsQuery,
  useLazyUserDetailsQuery,
} = authApi;

export default authApi;


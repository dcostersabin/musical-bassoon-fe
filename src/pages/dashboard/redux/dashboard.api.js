import {apiSlice} from '../../../app/apiSlice.js';

export const dashboardApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		listUsers: builder.query({
			query: ({page, role}) => ({
				url: 'users',
				method: 'GET',
				params: {page, role},
			}),
			providesTags: ['users'],
		}),
		deleteUser: builder.mutation({
			query: ({id}) => ({
				url: 'users',
				method: 'DELETE',
				params: {id},
			}),
			invalidatesTags: ['users'],
		}),
		updateUser: builder.mutation({
			query: ({user_id, data}) => ({
				url: 'users',
				method: 'PUT',
				params: {user_id},
				body: {...data},
			}),
			invalidatesTags: ['users'],
		}),
	}),
});

export const {useListUsersQuery, useDeleteUserMutation, useUpdateUserMutation} = dashboardApi;

export default dashboardApi;

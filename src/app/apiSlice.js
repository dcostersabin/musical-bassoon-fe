import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {logout} from '../pages/auth/redux/auth.slice';

// ----------------------------------------------------------------------

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_HOST_API,
	prepareHeaders(headers, {getState, endpoint}) {
		headers.set('authorization', `Bearer ${localStorage.getItem('access')}`);
		return headers;
	},
});

const baseQueryWithAuthValidation = async (args, api, extraOptions) => {
	const response = await baseQuery(args, api, extraOptions);

	const status = response?.error?.status;

	if (status === 401) {
		api.dispatch(logout());
		api.dispatch(apiSlice.util.resetApiState());
		api.dispatch(apiSlice.util.invalidateTags(apiTags));
	}

	return response;
};

export const apiTags = ['users', 'music'];

export const apiSlice = createApi({
	baseQuery: baseQueryWithAuthValidation,
	tagTypes: apiTags,
	endpoints: builder => ({}),
});

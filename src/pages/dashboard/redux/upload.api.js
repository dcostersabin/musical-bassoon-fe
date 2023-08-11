import {apiSlice} from '../../../app/apiSlice.js';

export const uploadApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		uploadMusic: builder.mutation({
			query: ({data}) => ({
				url: 'upload',
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {useUploadMusicMutation} = uploadApi;
export default uploadApi;

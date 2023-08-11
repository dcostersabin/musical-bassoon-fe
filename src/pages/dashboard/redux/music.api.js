import {apiSlice} from '../../../app/apiSlice.js';

export const musicApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		listMusic: builder.query({
			query: ({page, user_id}) => ({
				url: 'music',
				method: 'GET',
				params: {page, user_id},
			}),
			providesTags: ['music'],
		}),
		addMusic: builder.mutation({
			query: ({data}) => ({
				url: 'music',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['music'],
		}),
		deleteMusic: builder.mutation({
			query: ({music_id}) => ({
				url: 'music',
				method: 'DELETE',
				params: {music_id},
			}),
			invalidatesTags: ['music'],
		}),
		updateMusic: builder.mutation({
			query: ({music_id, data}) => ({
				url: 'music',
				method: 'PUT',
				params: {music_id},
				body: {...data},
			}),
			invalidatesTags: ['music'],
		}),
	}),
});

export const {useAddMusicMutation, useListMusicQuery, useDeleteMusicMutation, useUpdateMusicMutation} = musicApi;

export default musicApi;

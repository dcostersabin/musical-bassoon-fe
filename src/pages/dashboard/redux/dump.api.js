import {apiSlice} from '../../../app/apiSlice.js';

export const dumpApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		dumpMusic: builder.query({
			query: ({page, artist_id}) => ({
				url: 'dump',
				method: 'GET',
				params: {page, artist_id},
				responseType: 'blob',
				responseHandler: async response => response.blob(),
			}),
		}),
	}),
});

export const {useLazyDumpMusicQuery} = dumpApi;

export default dumpApi;

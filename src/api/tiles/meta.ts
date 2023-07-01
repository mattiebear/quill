import { useQuery } from '@tanstack/react-query';

import { getHttpClient, useHttpClient } from '@/lib/http';
import { getQueryClient } from '@/lib/queries';
import { TileSchema } from '@/lib/quill/types/map';

import { Resource } from '../types';

const buildKey = () => [Resource.TileMeta];

const buildPath = () => {
	return 'tile-manifest.json';
};

export const fetchTileManifest = async () => {
	const http = await getHttpClient();
	const queryClient = await getQueryClient();

	return queryClient.fetchQuery(
		buildKey(),
		() => {
			return http.get<TileSchema[]>(buildPath(), {
				baseURL: '/',
			});
		},
		{
			staleTime: Infinity,
		}
	);
};

// TODO: Pass query options for select
export const useTileManifest = () => {
	const http = useHttpClient();

	return useQuery(
		buildKey(),
		() => {
			return http.get<TileSchema[]>(buildPath(), {
				// TODO: Should this be a separate client?
				baseURL: '/',
			});
		},
		{
			staleTime: Infinity,
		}
	);
};

import { useQuery } from '@tanstack/react-query';

import { getHttpClient, useHttpClient } from '@/lib/http';
import { getQueryClient } from '@/lib/queries';
import { TokenSchema } from '@/lib/quill/types/token';

import { Resource } from '../types';

const buildKey = () => [Resource.TokenMeta];

const buildPath = () => {
	return 'token-manifest.json';
};

export const fetchTokenManifest = async () => {
	const http = await getHttpClient();
	const queryClient = await getQueryClient();

	return queryClient.fetchQuery(
		buildKey(),
		() => {
			return http.get<TokenSchema[]>(buildPath(), {
				baseURL: '/',
			});
		},
		{
			staleTime: Infinity,
		}
	);
};

export const useTokenManifest = () => {
	const http = useHttpClient();

	return useQuery(
		buildKey(),
		() => {
			return http.get<TokenSchema[]>(buildPath(), {
				// TODO: Should this be a separate client?
				baseURL: '/',
			});
		},
		{
			staleTime: Infinity,
		}
	);
};

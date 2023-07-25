import { useQuery } from '@tanstack/react-query';

import { getHttpClient, useHttpClient } from '@/lib/http';
import { getQueryClient } from '@/lib/queries';
import { DynamicPath } from '@/lib/url';
import { ModuleMapDetailData } from '@/types/map';

import { Resource } from '../types';

const buildKey = (id: string) => [Resource.Map, id];

const buildPath = (id: string) => {
	return new DynamicPath('/maps/:id').for(id).toString();
};

export const fetchMapDetail = async (id: string) => {
	const http = await getHttpClient();
	const queryClient = await getQueryClient();

	return queryClient.fetchQuery(
		buildKey(id),
		() => {
			return http.get<ModuleMapDetailData>(buildPath(id));
		},
		{
			staleTime: Infinity,
		}
	);
};

export const useMapDetail = (id: string) => {
	const http = useHttpClient();

	return useQuery(
		buildKey(id),
		() => {
			return http.get<ModuleMapDetailData>(buildPath(id));
		},
		{
			select: (data) => data.data,
			staleTime: Infinity,
		}
	);
};

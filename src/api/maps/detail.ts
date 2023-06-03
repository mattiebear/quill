import { useQuery } from '@tanstack/react-query';

import { getHttpClient, useHttpClient } from '@/lib/http';
import { getQueryClient } from '@/lib/queries';
import { DynamicPath } from '@/lib/url';

import { Resource } from '../types';

interface MapData {
	id: string;
	name: string;
	userId: string;
}

const buildKey = (id: string) => [Resource.Map, id];

const buildPath = (id: string) => {
	return new DynamicPath('/maps/:id').for(id).toString();
};

export const fetchMapDetail = async (id: string) => {
	const http = await getHttpClient();
	const queryClient = await getQueryClient();

	return queryClient.fetchQuery(buildKey(id), () => {
		return http.get<MapData>(buildPath(id));
	});
};

export const useMapDetail = (id: string) => {
	const http = useHttpClient();

	return useQuery(buildKey(id), () => {
		return http.get<MapData>(buildPath(id));
	});
};

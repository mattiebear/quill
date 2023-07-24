import { useQuery } from '@tanstack/react-query';

import { getHttpClient, useHttpClient } from '@/lib/http';
import { getQueryClient } from '@/lib/queries';
import { ModuleMapListData } from '@/types/map';

import { Resource } from '../types';

const buildKey = () => [Resource.Map];

const buildPath = () => {
	return 'maps';
};

export const fetchMapsList = async () => {
	const http = await getHttpClient();
	const queryClient = await getQueryClient();

	return queryClient.fetchQuery(buildKey(), () => {
		return http.get<ModuleMapListData[]>(buildPath());
	});
};

// TODO: Pass query options for select
export const useMapsList = () => {
	const http = useHttpClient();

	// TODO: Add some kind of pagination
	return useQuery(buildKey(), () => {
		return http.get<ModuleMapListData[]>(buildPath());
	});
};

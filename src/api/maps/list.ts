import { useQuery, useQueryClient } from '@tanstack/react-query';
import { JsonConvert } from 'json2typescript';
import { useCallback } from 'react';

import { MapEntity } from '@/entites/map-entity';
import { getHttpClient, useHttpClient } from '@/lib/http';
import { getQueryClient } from '@/lib/queries';

import { Resource } from '../types';

const buildKey = () => [Resource.Map];

const buildPath = () => {
	return 'maps';
};

export const fetchMapsList = async () => {
	const http = await getHttpClient();
	const queryClient = await getQueryClient();

	return queryClient.fetchQuery(buildKey(), () => {
		return http.get(buildPath());
	});
};

// TODO: Pass query options for select
export const useMapsList = () => {
	const http = useHttpClient();

	// TODO: Add some kind of pagination
	return useQuery(
		buildKey(),
		() => {
			return http.get(buildPath());
		},
		{
			select: (response) => {
				const convert = new JsonConvert();
				return convert.deserializeArray(response.data, MapEntity);
			},
		}
	);
};

export const useInvalidateMaps = () => {
	const queryClient = useQueryClient();

	return useCallback(async () => {
		await queryClient.invalidateQueries(buildKey());
	}, [queryClient]);
};

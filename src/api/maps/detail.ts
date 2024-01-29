import { useQuery, useQueryClient } from '@tanstack/react-query';
import { JsonConvert } from 'json2typescript';
import { useCallback } from 'react';

import { MapEntity } from '@/entites/map-entity';
import { getHttpClient, useHttpClient } from '@/lib/http';
import { getQueryClient } from '@/lib/queries';
import { DynamicPath } from '@/lib/url';

import { Resource } from '../types';

const buildKey = (id: string) => [Resource.Map, id];

const buildPath = (id: string) => {
	return new DynamicPath('/game/maps/:id').for(id).toString();
};

export const fetchMapDetail = async (id: string) => {
	const http = await getHttpClient();
	const queryClient = await getQueryClient();

	return queryClient.fetchQuery(buildKey(id), () => {
		return http.get(buildPath(id));
	});
};

export const useMapDetail = (id: string) => {
	const http = useHttpClient();

	return useQuery(
		buildKey(id),
		() => {
			return http.get(buildPath(id));
		},
		{
			select: (response) => {
				const convert = new JsonConvert();
				return convert.deserializeObject(response.data, MapEntity);
			},
		}
	);
};

export const useInvalidateMap = (map: MapEntity) => {
	const queryClient = useQueryClient();

	return useCallback(async () => {
		await queryClient.invalidateQueries(buildKey(map.id));
	}, [queryClient, map.id]);
};

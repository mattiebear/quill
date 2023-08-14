import { useQuery } from '@tanstack/react-query';
import { JsonConvert } from 'json2typescript';

import { MapEntity } from '@/entites/map-entity';
import { getHttpClient, useHttpClient } from '@/lib/http';
import { getQueryClient } from '@/lib/queries';
import { DynamicPath } from '@/lib/url';

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
			return http.get(buildPath(id));
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
			return http.get(buildPath(id));
		},
		{
			select: (response) => {
				const convert = new JsonConvert();
				return convert.deserializeObject(response.data, MapEntity);
			},
			staleTime: Infinity,
		}
	);
};

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { JsonConvert } from 'json2typescript';
import { useCallback } from 'react';

import { Connection } from '@/entites/connection';
import { getHttpClient, useHttpClient } from '@/lib/http';
import { getQueryClient } from '@/lib/queries';
import { ConnectionListData } from '@/types/connection';

import { Resource } from '../types';

const buildKey = () => [Resource.Connection];

const buildPath = () => {
	return 'connections';
};

export const fetchConnectionsList = async () => {
	const http = await getHttpClient();
	const queryClient = await getQueryClient();

	return queryClient.fetchQuery(buildKey(), () => {
		return http.get<ConnectionListData[]>(buildPath());
	});
};

export const useConnectionsList = () => {
	const http = useHttpClient();

	return useQuery(
		buildKey(),
		() => {
			return http.get<ConnectionListData[]>(buildPath());
		},
		{
			select: (response) => {
				const convert = new JsonConvert();
				return convert.deserialize(response.data, Connection) as Connection[];
			},
		}
	);
};

export const useInvalidateConnections = () => {
	const queryClient = useQueryClient();

	return useCallback(async () => {
		await queryClient.invalidateQueries(buildKey());
	}, [queryClient]);
};

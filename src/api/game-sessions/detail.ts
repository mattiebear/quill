import { useQuery } from '@tanstack/react-query';
import { JsonConvert } from 'json2typescript';

import { GameSession } from '@/entites/game-session';
import { getHttpClient, useHttpClient } from '@/lib/http';
import { getQueryClient } from '@/lib/queries';
import { DynamicPath } from '@/lib/url';

import { Resource } from '../types';

const buildKey = (id: string) => [Resource.GameSession, id];

const buildPath = (id: string) => {
	return new DynamicPath('/game_sessions/:id').for(id).toString();
};

export const fetchGameSessionDetail = async (id: string) => {
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

export const useGameSessionDetail = (id: string) => {
	const http = useHttpClient();

	return useQuery(
		buildKey(id),
		() => {
			return http.get(buildPath(id));
		},
		{
			select: (response) => {
				const convert = new JsonConvert();
				return convert.deserializeObject(response.data, GameSession);
			},
			staleTime: Infinity,
		}
	);
};

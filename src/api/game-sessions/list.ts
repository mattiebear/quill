import { useQuery, useQueryClient } from '@tanstack/react-query';
import { JsonConvert } from 'json2typescript';
import { useCallback } from 'react';

import { GameSession } from '@/entites/game-session';
import { getHttpClient, useHttpClient } from '@/lib/http';
import { getQueryClient } from '@/lib/queries';

import { Resource } from '../types';

const buildKey = () => [Resource.GameSession];

const buildPath = () => {
	return 'game_sessions';
};

export const fetchGameSessionsList = async () => {
	const http = await getHttpClient();
	const queryClient = await getQueryClient();

	return queryClient.fetchQuery(buildKey(), () => {
		return http.get(buildPath());
	});
};

export const useGameSessionsList = () => {
	const http = useHttpClient();

	return useQuery(
		buildKey(),
		() => {
			return http.get(buildPath());
		},
		{
			select: (response) => {
				const convert = new JsonConvert();
				return convert.deserializeArray(response.data, GameSession);
			},
		}
	);
};

export const useInvalidateGameSessions = () => {
	const queryClient = useQueryClient();

	return useCallback(async () => {
		await queryClient.invalidateQueries(buildKey());
	}, [queryClient]);
};

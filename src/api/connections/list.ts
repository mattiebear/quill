import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { Resource } from '../types';

const buildKey = () => [Resource.Connection];

export const useInvalidateConnections = () => {
	const queryClient = useQueryClient();

	return useCallback(async () => {
		await queryClient.invalidateQueries(buildKey());
	}, [queryClient]);
};

import { useQuery } from '@tanstack/react-query';

import { getHttpClient, useHttpClient } from '@/lib/http';
import { getQueryClient } from '@/lib/queries';

const queryKey = 'maps';

interface MapData {
	id: string;
	name: string;
	userId: string;
}

export const fetchMapsList = async () => {
	const http = await getHttpClient();
	const queryClient = await getQueryClient();

	return queryClient.fetchQuery([queryKey], () => {
		return http.get<MapData[]>('maps');
	});
};

export const useMapsList = () => {
	const http = useHttpClient();

	// TODO: Add some kind of pagination
	return useQuery([queryKey], () => {
		return http.get<MapData[]>('maps');
	});
};

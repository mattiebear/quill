import { QueryClient } from '@tanstack/react-query';

import { StaticStore } from '../store';

export const getQueryClient = () => {
	const client = StaticStore.getState().queryClient;

	if (client) {
		return client;
	}

	return new Promise<QueryClient>((resolve) => {
		const unsubscribe = StaticStore.subscribe((state) => {
			if (state.queryClient) {
				unsubscribe();
				resolve(state.queryClient);
			}
		});
	});
};

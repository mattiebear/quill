import { QueryClient } from '@tanstack/react-query';

import { staticStore } from '../store';

export const getQueryClient = () => {
	const client = staticStore.getState().queryClient;

	if (client) {
		return client;
	}

	return new Promise<QueryClient>((resolve) => {
		const unsubscribe = staticStore.subscribe((state) => {
			if (state.queryClient) {
				unsubscribe();
				resolve(state.queryClient);
			}
		});
	});
};

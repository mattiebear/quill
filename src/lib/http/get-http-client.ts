import { StaticStore } from '../store';
import { HttpClient } from './types';

export const getHttpClient = () => {
	const client = StaticStore.getState().httpClient;

	if (client) {
		return client;
	}

	return new Promise<HttpClient>((resolve) => {
		const unsubscribe = StaticStore.subscribe((state) => {
			if (state.httpClient) {
				unsubscribe();
				resolve(state.httpClient);
			}
		});
	});
};

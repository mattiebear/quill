import { staticStore } from '../store';
import { HttpClient } from './types';

export const getHttpClient = () => {
	const client = staticStore.getState().httpClient;

	if (client) {
		return client;
	}

	return new Promise<HttpClient>((resolve) => {
		const unsubscribe = staticStore.subscribe((state) => {
			if (state.httpClient) {
				unsubscribe();
				resolve(state.httpClient);
			}
		});
	});
};

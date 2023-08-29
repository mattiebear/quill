import { staticStore } from '../store';

export const getHttpClient = () => {
	return staticStore.getState().httpClient;
};

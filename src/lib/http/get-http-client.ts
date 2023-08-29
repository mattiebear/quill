import { staticStore } from '../state';

export const getHttpClient = () => {
	return staticStore.getState().httpClient;
};

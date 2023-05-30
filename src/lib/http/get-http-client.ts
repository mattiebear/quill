import { AxiosInstance } from 'axios';

import { StaticStore } from '../store/static-store';

export const getHttpClient = () => {
	return StaticStore.fetch<AxiosInstance>('http');
};

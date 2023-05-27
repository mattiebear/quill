import axios, { CreateAxiosDefaults } from 'axios';

interface CreateHttpClientConfig extends CreateAxiosDefaults {
	getToken?: () => Promise<string | null>;
}

export const createHttpClient = ({
	getToken,
	...config
}: CreateHttpClientConfig = {}) => {
	const client = axios.create(config);

	client.interceptors.request.use(
		async (config) => {
			const token = await getToken?.();

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}

			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	return client;
};

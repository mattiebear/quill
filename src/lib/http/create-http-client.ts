import axios, { CreateAxiosDefaults } from 'axios'

interface CreateHttpClientConfig extends CreateAxiosDefaults {
	sourceToken?:  () => Promise<void>;
}

export const createHttpClient = ({ sourceToken, ...config }: CreateHttpClientConfig = {}) => {
	const client = axios.create(config);

	client.interceptors.request.use(async config => {
		const token = await sourceToken?.();

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	}, (error) => {
		return Promise.reject(error)
	})
}

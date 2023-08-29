import { useStaticStore } from '../state';

export const useHttpClient = () => {
	return useStaticStore((state) => state.httpClient);
};

import { useStaticStore } from '../store';

export const useHttpClient = () => {
	return useStaticStore((state) => state.httpClient);
};

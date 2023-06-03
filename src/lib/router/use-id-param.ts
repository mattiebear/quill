import { useParams } from './use-params';

export const useIdParam = () => {
	return useParams<{ id: string }>().id;
};

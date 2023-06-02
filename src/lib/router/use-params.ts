import { useParams as useBaseParams } from 'react-router-dom';

export const useParams = <T = Record<string, never>>() => {
	return useBaseParams() as T;
};

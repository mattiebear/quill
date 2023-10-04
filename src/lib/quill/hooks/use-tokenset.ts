import { useMemo } from 'react';

import { useTokenManifest } from '@/api/tokens/meta';

import { Tokenset } from '../map/tokenset';

export const useTokenset = () => {
	const { data } = useTokenManifest();

	return useMemo(() => {
		if (!data) {
			throw new Error('No tokenset data found');
		}

		return new Tokenset(data);
	}, [data]);
};

import { useMemo } from 'react';

import { useTileManifest } from '@/api/tiles/meta';
import { Tileset } from '@/lib/quill/map/tileset';

export const useTileset = () => {
	const { data } = useTileManifest();

	return useMemo(() => {
		if (!data) {
			throw new Error('No tileset data found');
		}

		return Tileset.from(data.data, { imageBaseURL: '/images/tiles' });
	}, [data]);
};

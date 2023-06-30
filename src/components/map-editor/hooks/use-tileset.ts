import { useMemo } from 'react';

import { useTileManifest } from '@/api/tiles/meta';
import { Tileset } from '@/lib/quill/map/tileset';

export const useTileset = () => {
	const { data } = useTileManifest();

	return useMemo(() => {
		if (!data) {
			return undefined;
		}

		return Tileset.from(data.data);
	}, [data]);
};

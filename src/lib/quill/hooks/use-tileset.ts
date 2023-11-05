import { useMemo } from 'react';

import { useTileManifest } from '@/api/tiles/meta';
import { Tileset } from '@/lib/quill/map/tileset';

import { TileType } from '../map';

export const useTileset = (type?: TileType) => {
	const { data } = useTileManifest();

	return useMemo(() => {
		if (!data) {
			throw new Error('No tileset data found');
		}

		const filteredData =
			type !== undefined
				? data.data.filter((tile) => tile.type === type)
				: data.data;

		return Tileset.from(filteredData, { imageBaseURL: '/images/tiles' });
	}, [data, type]);
};

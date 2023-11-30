import { useMemo } from 'react';

export type TileType = 'floor' | 'wall';

interface Tile {
	id: string;
	image: string;
	type: TileType;
}

const manifest: Tile[] = [
	{
		id: '1',
		image: 'floor-1.png',
		type: 'floor',
	},
	{
		id: '2',
		image: 'wall-1.png',
		type: 'wall',
	},
];

export const useTileset = (filter?: TileType) => {
	return useMemo<Tile[]>(() => {
		return manifest.filter(({ type }) => (filter ? type === filter : true));
	}, [filter]);
};

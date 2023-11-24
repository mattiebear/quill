import { useMemo } from 'react';

interface Tile {
	id: string;
	image: string;
	type: 'floor';
}

export const useTileset = () => {
	return useMemo<Tile[]>(() => {
		return [
			{
				id: '1',
				image: 'floor-1.png',
				type: 'floor',
			},
		];
	}, []);
};

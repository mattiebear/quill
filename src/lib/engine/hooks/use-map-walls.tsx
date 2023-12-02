import { FC, useMemo } from 'react';

import { useTileStore } from '@/lib/engine/store/tile-store';

import { Wall1 } from '../components/wall-1';

// TODO: Make some resolver class to do this
const Tiles: Record<string, FC<JSX.IntrinsicElements['group']>> = {
	'2': Wall1,
};

export const useMapWalls = () => {
	const walls = useTileStore((state) => state.walls);

	return useMemo(() => {
		return walls.map((wall) => {
			const Tile = Tiles[wall.tileId];

			return (
				<Tile
					key={wall.id}
					position={wall.position.toCoords()}
					rotation-y={wall.rotation}
				/>
			);
		});
	}, [walls]);
};

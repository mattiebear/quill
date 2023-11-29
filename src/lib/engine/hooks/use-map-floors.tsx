import { FC, useMemo } from 'react';

import { Floor1 } from '@/lib/engine/components/floor-1';
import { useTileStore } from '@/lib/engine/store/tile-store';

// TODO: Make some resolver class to do this
const Tiles: Record<string, FC<JSX.IntrinsicElements['group']>> = {
	'1': Floor1,
};

export const useMapFloors = () => {
	const floors = useTileStore((state) => state.floors);

	return useMemo(() => {
		return floors.map((floor) => {
			const Tile = Tiles[floor.tileId];

			return <Tile key={floor.id} position={floor.position.toCoords()} />;
		});
	}, [floors]);
};

import { useCallback } from 'react';

import { Floor } from '@/lib/engine/map/floor';
import { Position } from '@/lib/engine/map/position';
import { useTileStore } from '@/lib/engine/store/tile-store';

export const useMapInteractor = () => {
	const { placeFloor } = useTileStore();

	const onClickGrid = useCallback(
		(e: any) => {
			const floor = new Floor(
				Math.random().toString(),
				Position.fromPoint(e.point),
				'1',
				0
			);

			placeFloor(floor);
		},
		[placeFloor]
	);

	return { onClickGrid };
};

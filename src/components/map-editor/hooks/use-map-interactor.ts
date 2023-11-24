import { useCallback } from 'react';

import { Floor } from '@/lib/engine/map/floor';
import { Position } from '@/lib/engine/map/position';
import { EditorAction, EditorStore } from '@/lib/engine/store/editor-store';
import { useTileStore } from '@/lib/engine/store/tile-store';

export const useMapInteractor = () => {
	const { placeFloor } = useTileStore();

	const onClickGrid = useCallback(
		(e: any) => {
			const state = EditorStore.getState();

			if (state.action === EditorAction.PlaceFloor && state.placeTileId) {
				const floor = new Floor(
					Math.random().toString(),
					Position.fromPoint(e.point),
					state.placeTileId,
					0
				);

				placeFloor(floor);
			}
		},
		[placeFloor]
	);

	return { onClickGrid };
};

import { useCallback } from 'react';

import { Crypto } from '@/lib/crypto';
import { Floor } from '@/lib/engine/map/floor';
import { EditorAction, EditorStore } from '@/lib/engine/store/editor-store';
import { TileStore } from '@/lib/engine/store/tile-store';

import { AxisPosition, GridPosition, Wall } from '../map';
import { Point } from '../map/point';
import { useQueueMapUpdate } from './use-queue-map-update';

export const useMapInteractor = () => {
	const queue = useQueueMapUpdate();

	const onClickGrid = useCallback(
		(e: any) => {
			const { placeFloor, placeWall } = TileStore.getState();
			const state = EditorStore.getState();

			if (state.action === EditorAction.PlaceFloor && state.placeTileId) {
				const floor = new Floor(
					Crypto.uniqueId(),
					GridPosition.fromPoint(Point.at(e.point)),
					state.placeTileId,
					0
				);

				placeFloor(floor);
				queue();
			}

			if (state.action === EditorAction.PlaceWall && state.placeTileId) {
				const floor = new Wall(
					Crypto.uniqueId(),
					AxisPosition.fromPoint(Point.at(e.point)),
					state.placeTileId
				);

				placeWall(floor);
				queue();
			}
		},
		[queue]
	);

	const onMoveGrid = useCallback((e: any) => {
		EditorStore.setState({ pointerPosition: Point.at(e.point) });
	}, []);

	const onLeaveGrid = useCallback(() => {
		EditorStore.setState({ pointerPosition: null });
	}, []);

	return { onClickGrid, onLeaveGrid, onMoveGrid };
};

import { useCallback } from 'react';

import { Crypto } from '@/lib/crypto';
import { Floor } from '@/lib/engine/map/floor';
import { EditorAction, EditorStore } from '@/lib/engine/store/editor-store';
import { useTileStore } from '@/lib/engine/store/tile-store';

import { AxisPosition, GridPosition, Position } from '../map';
import { useQueueMapUpdate } from './use-queue-map-update';

export const useMapInteractor = () => {
	const { placeFloor } = useTileStore();
	const queue = useQueueMapUpdate();

	const onClickGrid = useCallback(
		(e: any) => {
			const state = EditorStore.getState();

			if (state.action === EditorAction.PlaceFloor && state.placeTileId) {
				const floor = new Floor(
					Crypto.uniqueId(),
					GridPosition.fromPoint(e.point),
					state.placeTileId,
					0
				);

				placeFloor(floor);
				queue();
			}
		},
		[placeFloor, queue]
	);

	const onMoveGrid = useCallback((e: any) => {
		const action = EditorStore.getState().action;

		if (action === null) {
			return;
		}

		const current = EditorStore.getState().pointerPosition;

		// let position: Position;

		// switch (action) {
		// 	case EditorAction.PlaceFloor:
		// 		position = GridPosition.fromPoint(e.point);
		// 		break;

		// 	case EditorAction.PlaceWall:
		// 		position = AxisPosition.fromPoint(e.point);
		// 		break;
		// }

		const position = GridPosition.fromPoint(e.point);

		if (!current || !current.equals(position)) {
			EditorStore.setState({ pointerPosition: position });
		}
	}, []);

	const onLeaveGrid = useCallback(() => {
		EditorStore.setState({ pointerPosition: null });
	}, []);

	return { onClickGrid, onLeaveGrid, onMoveGrid };
};

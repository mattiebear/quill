import { useCallback } from 'react';

import { Crypto } from '@/lib/crypto';
import { Floor } from '@/lib/engine/map/tiles/floor';
import { EditorAction, EditorStore } from '@/lib/engine/store/editor-store';
import { TileStore } from '@/lib/engine/store/tile-store';

import { AxisPosition, GridPosition, Wall } from '../../../lib/engine/map';
import { Point } from '../../../lib/engine/map/grid/point';
import { useQueueMapUpdate } from '../../../lib/engine/map/hooks/use-queue-map-update';

export const useEditorClick = () => {
	const queue = useQueueMapUpdate();

	return useCallback(
		(e: any) => {
			const { placeFloor, placeWall } = TileStore.getState();
			const { action, placeTileId } = EditorStore.getState();

			if (action === EditorAction.PlaceFloor && placeTileId) {
				const floor = new Floor(
					Crypto.uniqueId(),
					GridPosition.fromPoint(Point.at(e.point)),
					placeTileId,
					0
				);

				placeFloor(floor);
				queue();
			}

			if (action === EditorAction.PlaceWall && placeTileId) {
				const floor = new Wall(
					Crypto.uniqueId(),
					AxisPosition.fromPoint(Point.at(e.point)),
					placeTileId
				);

				placeWall(floor);
				queue();
			}

			if (action === EditorAction.PlaceToken) {
				console.log();
			}
		},
		[queue]
	);
};

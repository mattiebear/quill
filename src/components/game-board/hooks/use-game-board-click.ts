import { ThreeEvent } from '@react-three/fiber';
import { useCallback } from 'react';

import { RequestAddToken } from '@/lib/engine/events/outbound/request-add-token';
import { RequestMoveToken } from '@/lib/engine/events/outbound/request-move-token';
import { useEventManager } from '@/lib/engine/hooks/use-event-manager';
import { GridPosition } from '@/lib/engine/map';
import { Point } from '@/lib/engine/map/grid/point';
import { PlayAction, PlayStore } from '@/lib/engine/store/play-store';

export const useGameBoardClick = () => {
	const { transmit } = useEventManager();

	return useCallback(
		(e: ThreeEvent<MouseEvent>) => {
			e.stopPropagation();

			const { action, placeTokenId, selectedToken, setAction } =
				PlayStore.getState();
			const point = Point.at(e.point);

			if (action === PlayAction.PlaceToken && placeTokenId) {
				const pos = GridPosition.fromPoint(point);
				const event = new RequestAddToken(placeTokenId, pos);
				PlayStore.setState({ placeTokenId: null });

				transmit(event);
			}

			if (action === PlayAction.MoveToken && selectedToken) {
				setAction(PlayAction.SelectToken);

				const pos = GridPosition.fromPoint(point);
				const event = new RequestMoveToken(selectedToken, pos);

				transmit(event);
			}
		},
		[transmit]
	);
};

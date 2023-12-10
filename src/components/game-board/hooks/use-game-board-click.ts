import { ThreeEvent } from '@react-three/fiber';
import { useCallback } from 'react';

import { useCurrentUser } from '@/lib/auth/use-current-user';
import { RequestAddToken } from '@/lib/engine/events/outbound/request-add-token';
import { useEventManager } from '@/lib/engine/hooks/use-event-manager';
import { GridPosition } from '@/lib/engine/map';
import { Point } from '@/lib/engine/map/grid/point';
import { PlayAction, PlayStore } from '@/lib/engine/store/play-store';

export const useGameBoardClick = () => {
	const { transmit } = useEventManager();
	const user = useCurrentUser();

	return useCallback(
		(e: ThreeEvent<MouseEvent>) => {
			e.stopPropagation();

			const { action, placeTokenId, selectedToken, setAction } =
				PlayStore.getState();
			const point = Point.at(e.point);

			if (action === PlayAction.PlaceToken && placeTokenId) {
				const pos = GridPosition.fromPoint(point);
				const event = new RequestAddToken(placeTokenId, user.id, pos);

				transmit(event);
			}

			// FIXME: selected token is being set to null

			if (action === PlayAction.MoveToken && selectedToken) {
				setAction(PlayAction.SelectToken);
				console.log('move token to', selectedToken, point);
			}
		},
		[transmit, user]
	);
};

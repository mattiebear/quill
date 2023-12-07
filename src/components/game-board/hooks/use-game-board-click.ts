import { useCallback } from 'react';

import { useCurrentUser } from '@/lib/auth/use-current-user';
import { RequestAddToken } from '@/lib/engine/events/outbound/request-add-token';
import { useEventManager } from '@/lib/engine/hooks/use-event-manager';
import { GridPosition } from '@/lib/engine/map';
import { Point } from '@/lib/engine/map/grid/point';
import { EditorAction, EditorStore } from '@/lib/engine/store/editor-store';

export const useGameBoardClick = () => {
	const { transmit } = useEventManager();
	const user = useCurrentUser();

	return useCallback(
		(e: any) => {
			const { action, placeTokenId } = EditorStore.getState();

			if (action === EditorAction.PlaceToken && placeTokenId) {
				const pos = GridPosition.fromPoint(Point.at(e.point));
				const event = new RequestAddToken(placeTokenId, user.id, pos);

				transmit(event);
			}
		},
		[transmit, user]
	);
};

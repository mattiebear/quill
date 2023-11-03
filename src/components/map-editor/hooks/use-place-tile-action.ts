import { useCallback } from 'react';

import { PlaceTileAction, useAction } from '@/lib/quill/actions';
import { useActionManager } from '@/lib/quill/actions/hooks/use-action-manager';
import { Direction } from '@/lib/quill/types/map';
import { find, shift } from '@/utils/array';

export const usePlaceTileAction = () => {
	const actions = useActionManager();
	const action = useAction(PlaceTileAction);

	const rotate = useCallback(
		(places: number) => {
			const directions = Object.values(Direction);

			const index = find(directions, action.direction);
			const direction = shift(directions)(index, places);

			actions.update(action.clone({ direction }));
		},
		[action, actions]
	);

	const rotateLeft = useCallback(() => rotate(-1), [rotate]);
	const rotateRight = useCallback(() => rotate(1), [rotate]);

	const selectTile = useCallback(
		(id: string) => {
			actions.activate(action.clone({ id }));
		},
		[action, actions]
	);

	return { action, rotateLeft, rotateRight, selectTile };
};

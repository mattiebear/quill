import { useCallback } from 'react';

import { PlaceTileAction, useAction } from '@/lib/quill/actions';
import { useActionManager } from '@/lib/quill/actions/hooks/use-action-manager';

export const usePlaceTileAction = () => {
	const actions = useActionManager();
	const action = useAction(PlaceTileAction);

	const selectTile = useCallback(
		(id: string) => {
			actions.activate(action.clone({ id }));
		},
		[action, actions]
	);

	return { action, selectTile };
};

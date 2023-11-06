import { useCallback } from 'react';

import { useAction } from '@/lib/quill/actions';
import { PlaceTokenAction } from '@/lib/quill/actions/actions/place-token-action';
import { useActionManager } from '@/lib/quill/actions/hooks/use-action-manager';

export const usePlaceTokenAction = () => {
	const actions = useActionManager();
	const action = useAction(PlaceTokenAction);

	const selectToken = useCallback(
		(id: string) => {
			actions.activate(action.clone({ id }));
		},
		[action, actions]
	);

	return { action, selectToken };
};

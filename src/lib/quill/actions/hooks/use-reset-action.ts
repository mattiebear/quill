import { useCallback } from 'react';

import { useActionManager } from './use-action-manager';

export const useResetAction = () => {
	const manager = useActionManager();

	return useCallback(() => {
		manager.reset();
	}, [manager]);
};

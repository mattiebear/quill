import { useCallback } from 'react';

import { eventManager } from '../events/register';

export const useEventManager = () => {
	const transmit = useCallback((event: any) => {
		eventManager.transmit(event);
	}, []);

	return { transmit };
};

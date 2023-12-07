import { useCallback } from 'react';

import { getEventManager } from '../events/get-event-manager';

export const useEventManager = () => {
	const transmit = useCallback(async (event: any) => {
		const eventManager = await getEventManager();
		eventManager.transmit(event);
	}, []);

	return { transmit };
};

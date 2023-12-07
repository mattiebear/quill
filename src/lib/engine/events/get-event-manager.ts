import { StaticStore } from '@/lib/store';

import { EventManager } from './event-manager';

export const getEventManager = () => {
	const client = StaticStore.getState().eventManager;

	if (client) {
		return client;
	}

	return new Promise<EventManager>((resolve) => {
		const unsubscribe = StaticStore.subscribe((state) => {
			if (state.eventManager) {
				unsubscribe();
				resolve(state.eventManager);
			}
		});
	});
};

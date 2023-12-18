import { useCallback } from 'react';

import { MapEntity } from '@/entites/map-entity';
import { getEventManager } from '@/lib/engine/events/get-event-manager';
import { RequestChangeMap } from '@/lib/engine/events/outbound/request-change-map';

export const useChangeMap = () => {
	return useCallback(async (map: MapEntity) => {
		const eventManager = await getEventManager();
		eventManager.transmit(new RequestChangeMap(map));
	}, []);
};

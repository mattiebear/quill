import { useCallback } from 'react';

import { MapEntity } from '@/entites/map-entity';
import { getEventManager } from '@/lib/engine/events/get-event-manager';
import { SelectMap } from '@/lib/engine/events/outbound/select-map';
import { PlayStore } from '@/lib/engine/store/play-store';

export const useSelectMap = () => {
	return useCallback(async (map: MapEntity) => {
		const eventManager = await getEventManager();
		// TODO: Use map change request and WS response
		PlayStore.setState({ mapId: map.id });
		eventManager.transmit(new SelectMap(map));
	}, []);
};

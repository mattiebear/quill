import { useCallback } from 'react';

import { MapEntity } from '@/entites/map-entity';
import { SelectMap } from '@/lib/engine/events/outbound/select-map';
import { eventManager } from '@/lib/engine/events/register';
import { PlayStore } from '@/lib/engine/store/play-store';

export const useSelectMap = (map: MapEntity) => {
	return useCallback(() => {
		// TODO: Use map change request and WS response
		PlayStore.setState({ mapId: map.id });
		eventManager.transmit(new SelectMap(map));
	}, [map]);
};

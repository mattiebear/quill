import { useCallback } from 'react';

import { MapEntity } from '@/entites/map-entity';
import { useTransmit } from '@/lib/engine/events/hooks/use-transmit';
import { SelectMap } from '@/lib/engine/events/structs/select-map';
import { PlayStore } from '@/lib/engine/store/play-store';

export const useSelectMap = () => {
	const transmit = useTransmit();

	return useCallback(
		async (map: MapEntity) => {
			// TODO: Use map change request and WS response
			PlayStore.setState({ mapId: map.id });
			transmit(new SelectMap(map));
		},
		[transmit]
	);
};

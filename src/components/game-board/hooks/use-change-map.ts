import { useCallback } from 'react';

import { MapEntity } from '@/entites/map-entity';
import { useTransmit } from '@/lib/engine/events/hooks/use-transmit';
import { RequestChangeMap } from '@/lib/engine/events/structs/request-change-map';
import { PlayStore } from '@/lib/engine/store/play-store';

export const useChangeMap = () => {
	const transmit = useTransmit();

	return useCallback(
		async (map: MapEntity) => {
			PlayStore.setState({ isChangeMapOpen: false });

			transmit(new RequestChangeMap(map));
		},
		[transmit]
	);
};

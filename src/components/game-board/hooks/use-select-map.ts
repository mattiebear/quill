import { useCallback } from 'react';

import { MapEntity } from '@/entites/map-entity';
import { relay } from '@/lib/messaging';
import { SelectMap } from '@/lib/quill/messages/story/select-map';

export const useSelectMap = (map: MapEntity) => {
	return useCallback(() => {
		relay.send(new SelectMap(map));
	}, [map]);
};

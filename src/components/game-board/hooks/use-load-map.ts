import { useCallback } from 'react';

import { MapEntity } from '@/entites/map-entity';
import { Channel, relay } from '@/lib/events';
import { StoryEvent } from '@/lib/quill/types/event';

export const useLoadMap = (map: MapEntity) => {
	return useCallback(() => {
		relay.send(StoryEvent.LoadMap, { map }).to(Channel.Story);
	}, [map]);
};

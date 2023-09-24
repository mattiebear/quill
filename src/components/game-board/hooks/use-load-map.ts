import { useCallback } from 'react';

import { MapEntity } from '@/entites/map-entity';

import { useStoryContext } from '../context';

export const useLoadMap = (map: MapEntity) => {
	const { engine } = useStoryContext();

	return useCallback(() => {
		engine.loader.load(map.id);
	}, [engine, map.id]);
};

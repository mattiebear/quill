import { useEffect } from 'react';

import { fetchMapDetail } from '@/api/maps';

import { TileState } from '../map/tile-state';
import { usePlayStore } from '../store/play-store';
import { TileStore } from '../store/tile-store';

export const useMapLoader = () => {
	const mapId = usePlayStore((state) => state.mapId);

	useEffect(() => {
		if (mapId) {
			(async () => {
				const data = await fetchMapDetail(mapId);
				TileStore.setState(TileState.load(data.data).state());
			})();
			console.log('load map', { mapId });
		}
	}, [mapId]);
};

import { useEffect } from 'react';

import { fetchMapDetail } from '@/api/maps';

import { usePlayStore } from '../../store/play-store';
import { TileStore } from '../../store/tile-store';
import { TileState } from '../tile-state';

export const useMapLoader = () => {
	const mapId = usePlayStore((state) => state.mapId);

	useEffect(() => {
		if (mapId) {
			(async () => {
				const data = await fetchMapDetail(mapId);
				TileStore.setState(TileState.load(data.data).state());
			})();
		}
	}, [mapId]);
};

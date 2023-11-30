import { useEffect } from 'react';

import { fetchMapDetail } from '@/api/maps';

import { Floor } from '../map/floor';
import { usePlayStore } from '../store/play-store';
import { TileStore } from '../store/tile-store';

export const useMapLoader = () => {
	const mapId = usePlayStore((state) => state.mapId);

	useEffect(() => {
		if (mapId) {
			(async () => {
				const data = await fetchMapDetail(mapId);
				const { floors } = data.data.atlas.data;

				// TODO: Combine with utility in loader
				TileStore.setState({
					floors: floors.map((floor: any) => Floor.from(floor)),
				});
			})();
			console.log('load map', { mapId });
		}
	}, [mapId]);
};

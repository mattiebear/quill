import { JsonConvert } from 'json2typescript';

import { fetchMapDetail } from '@/api/maps';
import { MapEntity } from '@/entites/map-entity';
import { container, Lifespan } from '@/lib/di';

import { LoadingState, quillStore } from '../store';

export class MapLoader {
	async fetch(id: string) {
		if (this.loadedMapId === id) {
			return quillStore.setState({ loadMapState: LoadingState.Complete });
		}

		quillStore.setState({ loadMapState: LoadingState.Loading });

		const response = await fetchMapDetail(id);
		const convert = new JsonConvert();

		const map = convert.deserializeObject(response.data, MapEntity);

		quillStore.setState({ loadMapState: LoadingState.Complete });

		console.log('fetch map', map);
	}

	get loadedMapId() {
		return quillStore.getState().selectedMapId;
	}
}

container.register(MapLoader, {
	class: MapLoader,
	lifespan: Lifespan.Resolution,
});

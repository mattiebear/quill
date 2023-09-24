import { JsonConvert } from 'json2typescript';

import { fetchMapDetail } from '@/api/maps';
import { MapEntity } from '@/entites/map-entity';
import { container, inject, Lifespan } from '@/lib/di';

import { LoadingState, PlayStage, quillStore } from '../store';
import { Atlas } from './atlas';

export class MapLoader {
	constructor(private atlas: Atlas) {}

	async load(id: string) {
		if (this.loadedMapId === id) {
			return quillStore.setState({ loadMapState: LoadingState.Complete });
		}

		quillStore.setState({ loadMapState: LoadingState.Loading });

		const response = await fetchMapDetail(id);
		const convert = new JsonConvert();

		const map = convert.deserializeObject(response.data, MapEntity);

		quillStore.setState({
			loadMapState: LoadingState.Complete,
			playStage: PlayStage.Play,
		});

		this.atlas.load(map.atlas);
	}

	get loadedMapId() {
		return quillStore.getState().selectedMapId;
	}
}

inject(MapLoader, [Atlas]);

container.register(MapLoader, {
	class: MapLoader,
	lifespan: Lifespan.Resolution,
});

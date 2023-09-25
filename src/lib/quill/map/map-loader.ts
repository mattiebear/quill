import { JsonConvert } from 'json2typescript';

import { fetchMapDetail } from '@/api/maps';
import { MapEntity } from '@/entites/map-entity';
import { container, inject, Lifespan } from '@/lib/di';

import { quillStore } from '../store';
import { Store } from '../store/store';
import { Atlas } from './atlas';

export class MapLoader {
	constructor(private atlas: Atlas, private store: Store) {
		this.initStoreSubscription();
	}

	async load(mapId: string) {
		this.store.loadMap();

		const response = await fetchMapDetail(mapId);
		const convert = new JsonConvert();
		const map = convert.deserializeObject(response.data, MapEntity);

		this.store.mapLoaded();

		this.atlas.load(map.atlas);
	}

	private initStoreSubscription() {
		quillStore.subscribe((state, prev) => {
			if (state.mapId && state.mapId !== prev.mapId) {
				this.load(state.mapId);
			}
		});
	}
}

inject(MapLoader, [Atlas, Store]);

container.register(MapLoader, {
	class: MapLoader,
	lifespan: Lifespan.Resolution,
});

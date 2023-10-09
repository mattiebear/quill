import { container, DiHttp, inject, Lifespan } from '@/lib/di';
import { Channel, relay } from '@/lib/events';
import { HttpClient } from '@/lib/http/types';
import { EngineConfig, MapEvent } from '@/lib/quill';
import { TileMap } from '@/lib/quill/map/tile-map';
import { DynamicPath } from '@/lib/url';

import { Subscriber } from './subscriber';

const PERSIST_DEBOUNCE = 3000;

export class Sync extends Subscriber {
	private persistTimeout: ReturnType<typeof setTimeout>;

	constructor(
		private config: EngineConfig,
		private http: HttpClient,
		private tileMap: TileMap
	) {
		super();
		this.initRelay();
	}

	initRelay() {
		this.onEvent(MapEvent.PlaceTile, () => {
			if (this.persistTimeout) {
				clearTimeout(this.persistTimeout);
			}

			this.persistTimeout = setTimeout(async () => {
				await this.persistMap();
			}, PERSIST_DEBOUNCE);
		});
	}

	async persistMap() {
		// TODO: Need to make sure map is updated correctly in state
		const url = new DynamicPath('/maps/:id').for(this.config.map).toString();
		const atlas = Object.assign({}, this.config.map.atlas);

		atlas.data = this.tileMap.toJSON();

		await this.http.patch(url, { atlas });

		this.send(MapEvent.MapSaved);
	}
}

inject(Sync, [EngineConfig, DiHttp, TileMap]);

container.register(Sync, { class: Sync, lifespan: Lifespan.Resolution });

import { container, DiHttp, inject, Lifespan } from '@/lib/di';
import { HttpClient } from '@/lib/http/types';
import { EngineConfig } from '@/lib/quill';
import { TileMap } from '@/lib/quill/map/tile-map';
import { DynamicPath } from '@/lib/url';

import { PlaceTile } from '../messages/map/place-tile';
import { SaveMap } from '../messages/map/save-map';
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
		this.onEvent(PlaceTile, () => {
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

		this.send(SaveMap);
	}
}

inject(Sync, [EngineConfig, DiHttp, TileMap]);

container.register(Sync, { class: Sync, lifespan: Lifespan.Resolution });

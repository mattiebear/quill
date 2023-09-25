import { container, DiHttp, inject, Lifespan } from '@/lib/di';
import { Channel, relay } from '@/lib/events';
import { HttpClient } from '@/lib/http/types';
import { EngineConfig, MapEvent } from '@/lib/quill';
import { Atlas } from '@/lib/quill/map/atlas';
import { DynamicPath } from '@/lib/url';

const PERSIST_DEBOUNCE = 3000;

export class Sync {
	private persistTimeout: ReturnType<typeof setTimeout>;

	constructor(
		private config: EngineConfig,
		private http: HttpClient,
		private atlas: Atlas
	) {
		relay.channel(Channel.Editor).on(MapEvent.PlaceTile, () => {
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

		atlas.data = this.atlas.toJSON();

		await this.http.patch(url, { atlas });

		relay.send(MapEvent.MapSaved).to(Channel.Data);
	}
}

inject(Sync, [EngineConfig, DiHttp, Atlas]);

container.register(Sync, { class: Sync, lifespan: Lifespan.Resolution });

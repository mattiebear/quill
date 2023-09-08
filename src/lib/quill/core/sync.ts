import { Channel, relay } from '@/lib/events';
import { Atlas, EngineConfig, MapEvent } from '@/lib/quill';
import { DynamicPath } from '@/lib/url';

const PERSIST_DEBOUNCE = 3000;

export class Sync {
	public config: EngineConfig;
	// TODO: Make atlas available in some other way
	public atlas: Atlas;

	private persistTimeout: ReturnType<typeof setTimeout>;

	constructor() {
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

		await this.config.http.patch(url, { atlas });

		relay.send(MapEvent.MapSaved).to(Channel.Data);
	}
}

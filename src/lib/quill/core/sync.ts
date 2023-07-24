import { Atlas } from '@/lib/quill';
import { EngineConfig } from '@/lib/quill/core/engine-config';
import { Relay, Subscriber } from '@/lib/quill/core/relay';
import { MapEvent } from '@/lib/quill/types/event';
import { DynamicPath } from '@/lib/url';

const PERSIST_DEBOUNCE = 3000;

export class Sync implements Subscriber {
	public config: EngineConfig;
	// TODO: Make atlas available in some other way
	public atlas: Atlas;

	private relay: Relay;
	private persistTimeout: ReturnType<typeof setTimeout>;

	link(relay: Relay) {
		this.relay = relay;

		relay.subscribe(MapEvent.PlaceTile, () => {
			if (this.persistTimeout) {
				clearTimeout(this.persistTimeout);
			}

			this.persistTimeout = setTimeout(async () => {
				await this.persistMap();
			}, PERSIST_DEBOUNCE);
		});
	}

	async persistMap() {
		const url = new DynamicPath('/maps/:id').for(this.config.map).toString();
		const data = this.atlas.toJSON();

		await this.config.http.patch(url, { atlas: { data } });

		this.relay.send(MapEvent.MapSaved);
	}
}

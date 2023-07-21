import { HttpClient } from '@/lib/http/types';
import { Atlas } from '@/lib/quill';
import { Relay, Subscriber } from '@/lib/quill/core/relay';
import { MapEvent } from '@/lib/quill/types/event';
import { DynamicPath } from '@/lib/url';

const PERSIST_DEBOUNCE = 3000;

export class HttpSync implements Subscriber {
	public atlas: Atlas;
	public http: HttpClient;
	public map: any;

	private relay: Relay;
	private persistTimeout: ReturnType<typeof setTimeout>;

	link(relay: Relay) {
		this.relay = relay;

		relay.subscribe(MapEvent.PlaceTile, () => {
			if (this.persistTimeout) {
				clearTimeout(this.persistTimeout);
			}

			this.persistTimeout = setTimeout(() => {
				this.persistMap().then();
			}, PERSIST_DEBOUNCE);
		});
	}

	async persistMap() {
		const url = new DynamicPath('/maps/:id').for(this.map).toString();
		const data = this.atlas.toJSON();

		await this.http.patch(url, { atlas: { data } });

		this.relay.send(MapEvent.MapSaved);
	}
}

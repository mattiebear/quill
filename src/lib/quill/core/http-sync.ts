import { HttpClient } from '@/lib/http/types';
import { Atlas } from '@/lib/quill';
import { Relay, Subscriber } from '@/lib/quill/core/relay';
import { MapEvent } from '@/lib/quill/types/event';

const PERSIST_DEBOUNCE = 3000;

export class HttpSync implements Subscriber {
	public atlas: Atlas;
	public http: HttpClient;

	private persistTimeout: ReturnType<typeof setTimeout>;

	link(relay: Relay) {
		relay.subscribe(MapEvent.PlaceTile, () => {
			if (this.persistTimeout) {
				clearTimeout(this.persistTimeout);
			}

			this.persistTimeout = setTimeout(() => {
				this.persistMap();
			}, PERSIST_DEBOUNCE);
		});
	}

	persistMap() {
		console.log('saved', this.atlas.toJSON());
	}
}

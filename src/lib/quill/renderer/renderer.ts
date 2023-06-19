import { Relay } from '@/lib/quill/core/relay';
import { Changeset } from '@/lib/quill/map/changeset';
import { MapEvent, Subscriber } from '@/lib/quill/types';

export class Renderer implements Subscriber {
	public el: HTMLElement;

	private relay: Relay;

	link(relay: Relay) {
		this.relay = relay;

		relay.subscribe(MapEvent.MapAltered, (data: Changeset) => {
			console.log('received', data);
		});
	}
}

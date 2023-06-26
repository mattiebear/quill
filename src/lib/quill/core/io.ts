import { Relay, Subscriber } from '@/lib/quill/core/relay';
import { RenderEvent } from '@/lib/quill/event';

export class IO implements Subscriber {
	private relay: Relay;

	link(relay: Relay) {
		this.relay = relay;
	}

	decreaseZoom = () => {
		this.send(RenderEvent.DecreaseZoom);
	};

	increaseZoom = () => {
		this.send(RenderEvent.IncreaseZoom);
	};

	private send(event: string, data?: any) {
		this.relay?.send(event, data);
	}
}

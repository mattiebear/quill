import { Relay, Subscriber } from '@/lib/quill/core/relay';
import { RenderEvent } from '@/lib/quill/event';

export class IO implements Subscriber {
	private relay: Relay;

	link(relay: Relay) {
		this.relay = relay;
	}

	initialize() {
		console.log('init');
	}

	destroy() {
		console.log('destroy');
	}

	private send(event: string, data?: any) {
		this.relay?.send(event, data);
	}

	/**
	 * Mouse handlers
	 */
	onClickZoomOut = () => {
		this.send(RenderEvent.DecreaseZoom);
	};

	onClickZoomIn = () => {
		this.send(RenderEvent.IncreaseZoom);
	};
}

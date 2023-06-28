import { KeyboardController } from '@/lib/quill/augments/keyboard-controller';
import { Relay, Subscriber } from '@/lib/quill/core/relay';
import { RenderEvent } from '@/lib/quill/types/event';

// enum Key {
// 	A = 'a',
// }

//

export class IO extends KeyboardController implements Subscriber {
	private relay: Relay;

	// constructor() {
	// super();
	//
	// this.channel(RenderEvent.ScrollLeft).to(relay).whileKeyDown(Key.A);
	// }

	link(relay: Relay) {
		this.relay = relay;
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

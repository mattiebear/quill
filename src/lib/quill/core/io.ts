import { Position } from '@/lib/quill';
import { Relay, Subscriber } from '@/lib/quill/core/relay';
import { RenderEvent } from '@/lib/quill/types/event';

enum Key {
	A = 'a',
	W = 'w',
	D = 'd',
	S = 's',
}

const EventMap = new Map<string, RenderEvent>([
	[Key.W, RenderEvent.ScrollUp],
	[Key.A, RenderEvent.ScrollLeft],
	[Key.S, RenderEvent.ScrollDown],
	[Key.D, RenderEvent.ScrollRight],
]);

/**
 * Input listener that converts actions into relay events
 */
export class IO implements Subscriber {
	private relay: Relay;
	private keydown: (e: KeyboardEvent) => void;

	initialize() {
		this.initScrollListeners();
	}

	link(relay: Relay) {
		this.relay = relay;
	}

	destroy() {
		document.removeEventListener('keydown', this.keydown);
	}

	private send(event: string, data?: any) {
		this.relay?.send(event, data);
	}

	private initScrollListeners() {
		this.keydown = (e: KeyboardEvent) => {
			const event = EventMap.get(e.key);

			if (event) {
				this.send(event);
			}
		};

		document.addEventListener('keydown', this.keydown);
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

	moveMouse = (x: number, y: number) => {
		const pos = Position.atPoint(x, y, 0);
		this.relay.send(RenderEvent.HighlightTile, pos);
	};

	clickTile = (x: number, y: number) => {
		const pos = Position.atPoint(x, y, 0);

		console.log('tile clicked at', pos.x, pos.y);
	};

	selectBlueprint = (id: string) => {
		console.log('id', id);
	};
}

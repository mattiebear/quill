import { Direction, Position } from '@/lib/quill';
import { Relay, Subscriber } from '@/lib/quill/core/relay';
import { Store } from '@/lib/quill/core/store';
import { RenderEvent } from '@/lib/quill/types/event';
import { StoreKey } from '@/lib/quill/types/store';
import { find, shift } from '@/utils/array';

enum Key {
	A = 'a',
	W = 'w',
	D = 'd',
	S = 's',
}

enum Rotate {
	Right = 1,
	Left = -1,
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
	public store: Store;

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
		this.store.set(StoreKey.SelectedBlueprint, id);
	};

	rotateRight = () => {
		this.rotateDirection(Rotate.Right);
	};

	rotateLeft = () => {
		this.rotateDirection(Rotate.Left);
	};

	private rotateDirection = (places: number) => {
		const directions = Object.values(Direction);

		const selected = this.store.get(StoreKey.SelectedDirection);
		const index = find(directions, selected);
		const value = shift(directions)(index, places);

		this.store.set(StoreKey.SelectedDirection, value);
	};
}

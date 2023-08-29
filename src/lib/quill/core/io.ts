import {
	Direction,
	MapEvent,
	Position,
	Relay,
	RenderEvent,
	Subscriber,
	Tileset,
} from '@/lib/quill';
import { find, shift } from '@/utils/array';

import { quillStore } from '../store';

const ScrollEventMap = new Map([
	['w', 'up'],
	['a', 'left'],
	['s', 'down'],
	['d', 'right'],
]);

enum Rotate {
	Right = 1,
	Left = -1,
}

enum Zoom {
	In = 10,
	Out = -10,
}

/**
 * Input listener that converts actions into relay events
 */
export class IO implements Subscriber {
	public tileset: Tileset;

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
			const event = ScrollEventMap.get(e.key);

			if (event) {
				this.send(RenderEvent.ScrollMap, event);
			}
		};

		document.addEventListener('keydown', this.keydown);
	}

	/**
	 * Mouse handlers
	 */
	onClickZoomOut() {
		this.send(RenderEvent.ChangeZoom, Zoom.Out);
	}

	onClickZoomIn() {
		this.send(RenderEvent.ChangeZoom, Zoom.In);
	}

	moveMouse(x: number, y: number) {
		const pos = Position.atPoint(x, y, 0);
		this.relay.send(RenderEvent.HighlightTile, pos);
	}

	clickTile(x: number, y: number) {
		const position = Position.atPoint(x, y, 0);

		const { selectedBlueprint: id, selectedDirection: direction } =
			quillStore.getState();

		if (id) {
			const blueprint = this.tileset.get(id);

			this.relay.send(MapEvent.PlaceTile, {
				blueprint,
				direction,
				position,
			});
		}
	}

	selectBlueprint(id: string) {
		quillStore.setState({ selectedBlueprint: id });
	}

	rotateRight() {
		this.rotateDirection(Rotate.Right);
	}

	rotateLeft() {
		this.rotateDirection(Rotate.Left);
	}

	private rotateDirection(places: number) {
		const directions = Object.values(Direction);
		const { selectedDirection: selected } = quillStore.getState();

		const index = find(directions, selected);
		const value = shift(directions)(index, places);

		quillStore.setState({ selectedDirection: value });
	}
}

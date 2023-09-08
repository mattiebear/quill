import { Channel, relay } from '@/lib/events';
import {
	Direction,
	MapEvent,
	Position,
	RenderEvent,
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
export class IO {
	public tileset: Tileset;

	private keydown: (e: KeyboardEvent) => void;

	initialize() {
		this.initScrollListeners();
	}

	destroy() {
		document.removeEventListener('keydown', this.keydown);
	}

	private initScrollListeners() {
		this.keydown = (e: KeyboardEvent) => {
			const event = ScrollEventMap.get(e.key);

			if (event) {
				relay.send(RenderEvent.ScrollMap, event).to(Channel.Editor);
			}
		};

		document.addEventListener('keydown', this.keydown);
	}

	/**
	 * Mouse handlers
	 */
	onClickZoomOut() {
		relay.send(RenderEvent.ChangeZoom, Zoom.Out).to(Channel.Editor);
	}

	onClickZoomIn() {
		relay.send(RenderEvent.ChangeZoom, Zoom.In).to(Channel.Editor);
	}

	moveMouse(x: number, y: number) {
		const pos = Position.atPoint(x, y, 0);
		relay.send(RenderEvent.HighlightTile, pos).to(Channel.Editor);
	}

	clickTile(x: number, y: number) {
		const position = Position.atPoint(x, y, 0);

		const { selectedBlueprint: id, selectedDirection: direction } =
			quillStore.getState();

		if (id) {
			const blueprint = this.tileset.get(id);

			relay
				.send(MapEvent.PlaceTile, {
					blueprint,
					direction,
					position,
				})
				.to(Channel.Editor);
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

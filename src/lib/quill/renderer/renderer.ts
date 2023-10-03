import * as PIXI from 'pixi.js';

import { container, inject, Lifespan } from '@/lib/di';
import { Channel, relay } from '@/lib/events';
import {
	Changeset,
	EngineConfig,
	MapEvent,
	NodeChange,
	Position,
	RenderEvent,
	RenderNode,
	RenderObject,
	Tileset,
} from '@/lib/quill';
import { findOrCreateByKey } from '@/utils/map';
import { degToRad } from '@/utils/math';
import { clamp } from '@/utils/number';

import { RelayControl } from '../comms/relay-control';
import { quillStore } from '../store';
import { RenderStack } from './render-stack';

const ScrollEventMap = new Map([
	['w', 'up'],
	['a', 'left'],
	['s', 'down'],
	['d', 'right'],
]);

export class Renderer extends RelayControl {
	private app: PIXI.Application<HTMLCanvasElement>;
	private nodes = new Map<string, RenderNode>();

	// Elements
	private highlight = new PIXI.Container();

	// State
	private zoom = 100;
	private keydown: any;

	constructor(
		public config: EngineConfig,
		private tileset: Tileset,
		private stack: RenderStack
	) {
		super();

		this.initRelay();
		this.createApp();
		this.connectStack();
		this.createHighlight();
		this.initializeListeners();
	}

	initRelay() {
		this.on(Channel.Editor, MapEvent.MapAltered, (changeset: Changeset) => {
			this.drawChangeset(changeset);
		});

		this.on(Channel.Editor, RenderEvent.ChangeZoom, (value: number) => {
			this.changeZoom(value);
		});
	}

	destroy() {
		this.unsubscribeAll();
		this.app.destroy(true);

		if (this.keydown) {
			document.removeEventListener('keydown', this.keydown);
		}
	}

	// Internal handlers
	private drawChangeset(changeset: Changeset) {
		changeset.additive.forEach((change) => {
			this.addTileFromChange(change);
		});

		changeset.subtractive.forEach((change) => {
			this.removeTile(change);
		});
	}

	private addTileFromChange(change: NodeChange) {
		const node = this.findOrCreateNodeByPosition(change.position);
		node.add(RenderObject.fromTile(change.tile));
	}

	private findOrCreateNodeByPosition(position: Position) {
		const key = position.toString();
		const node = findOrCreateByKey(this.nodes, key, new RenderNode(position));

		this.stack.tiles.addChild(node.view);

		return node;
	}

	private removeTile(change: NodeChange) {
		const key = change.position.toString();
		const node = this.nodes.get(key);
		node?.remove(change.tile.id);
	}

	private createApp() {
		PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

		this.app = new PIXI.Application<HTMLCanvasElement>({
			resizeTo: window,
			autoDensity: true,
			// TODO: Get color from theme somehow
			backgroundColor: 0x171923,
		});

		this.config.el.appendChild(this.app.view);
	}

	private connectStack() {
		this.stack.setHitArea(this.app.screen);

		// TODO: base position on screen side to center it.
		this.stack.map.x = 500;
		this.stack.map.y = 300;

		this.app.stage.addChild(this.stack.main);
	}

	private initializeListeners() {
		this.stack.main.on('mousemove', (e) => {
			const { x, y } = this.stack.map.toLocal(e.global);

			const pos = Position.atPoint(x, y, 0);
			this.setHighlightPosition(pos);
		});

		this.stack.main.on('mousedown', (e) => {
			const { x, y } = this.stack.map.toLocal(e.global);

			const position = Position.atPoint(x, y, 0);

			const { selectedBlueprint: id, selectedDirection: direction } =
				quillStore.getState();

			if (id) {
				const blueprint = this.tileset.get(id);
				const channel = relay.channel(Channel.Editor);

				channel.send(MapEvent.PlaceTile, {
					blueprint,
					direction,
					position,
				});
			}
		});

		this.keydown = (e: KeyboardEvent) => {
			const dir = ScrollEventMap.get(e.key);

			if (dir) {
				this.scrollMap(dir);
			}
		};

		document.addEventListener('keydown', this.keydown);
	}

	private createHighlight() {
		// TODO: Also used in Position. DRY up
		const size = Math.sin(degToRad(45)) * 256;

		const rect = new PIXI.Graphics();
		rect.beginFill(0x8059d4);
		rect.drawRect(0, 0, size, size);
		rect.rotation += degToRad(45);
		rect.alpha = 0.3;

		this.highlight.addChild(rect);
		this.highlight.scale.y = 0.5;

		this.stack.ui.addChild(this.highlight);
	}

	private setHighlightPosition(pos: Position) {
		this.highlight.x = pos.screenX;
		this.highlight.y = pos.screenY;
	}

	private changeZoom(value: number) {
		this.zoom = clamp(this.zoom + value, 50, 100);

		const scale = this.zoom / 100;

		this.stack.map.scale.x = scale;
		this.stack.map.scale.y = scale;
	}

	private scrollMap(dir: string) {
		switch (dir) {
			case 'up':
				this.stack.map.y += 10;
				break;

			case 'down':
				this.stack.map.y -= 10;
				break;

			case 'right':
				this.stack.map.x -= 10;
				break;

			case 'left':
				this.stack.map.x += 10;
				break;
		}
	}
}

inject(Renderer, [EngineConfig, Tileset, RenderStack]);

container.register(Renderer, {
	class: Renderer,
	lifespan: Lifespan.Resolution,
});

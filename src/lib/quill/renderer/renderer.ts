import * as PIXI from 'pixi.js';

import { container, inject, Lifespan } from '@/lib/di';
import { Channel } from '@/lib/events';
import {
	Changeset,
	EngineConfig,
	MapEvent,
	NodeChange,
	Position,
	RenderEvent,
	RenderNode,
	RenderObject,
} from '@/lib/quill';
import { findOrCreateByKey } from '@/utils/map';
import { clamp } from '@/utils/number';

import { Subscriber } from '../comms/subscriber';
import { Highlighter } from './highlighter';
import { Interactor } from './interactor';
import { RenderStack } from './render-stack';

const ScrollEventMap = new Map([
	['w', 'up'],
	['a', 'left'],
	['s', 'down'],
	['d', 'right'],
]);

export class Renderer extends Subscriber {
	private app: PIXI.Application<HTMLCanvasElement>;
	private nodes = new Map<string, RenderNode>();

	// State
	private zoom = 100;
	private keydown: any;

	constructor(
		public config: EngineConfig,
		private stack: RenderStack,
		private highlighter: Highlighter,
		private interactor: Interactor
	) {
		super();

		this.initRelay();
		this.createApp();
		this.connectStack();
		this.initializeListeners();
	}

	initRelay() {
		this.onEvent(MapEvent.MapAltered, (changeset: Changeset) => {
			this.drawChangeset(changeset);
		});

		this.onEvent(RenderEvent.ChangeZoom, (value: number) => {
			this.changeZoom(value);
		});
	}

	destroy() {
		this.unsubscribeAll();
		this.app.destroy(true);

		this.highlighter.destroy();
		this.interactor.destroy();

		if (this.keydown) {
			document.removeEventListener('keydown', this.keydown);
		}
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

	private connectStack() {
		this.stack.setHitArea(this.app.screen);

		// TODO: base position on screen side to center it.
		this.stack.map.x = 500;
		this.stack.map.y = 300;

		this.app.stage.addChild(this.stack.main);
	}

	private initializeListeners() {
		this.keydown = (e: KeyboardEvent) => {
			const dir = ScrollEventMap.get(e.key);

			if (dir) {
				this.scrollMap(dir);
			}
		};

		document.addEventListener('keydown', this.keydown);
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

inject(Renderer, [EngineConfig, RenderStack, Highlighter, Interactor]);

container.register(Renderer, {
	class: Renderer,
	lifespan: Lifespan.Resolution,
});

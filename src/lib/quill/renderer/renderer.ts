import * as PIXI from 'pixi.js';

import { container, inject, Lifespan } from '@/lib/di';
import {
	Changeset,
	EngineConfig,
	NodeChange,
	Position,
	RenderNode,
	RenderObject,
} from '@/lib/quill';
import { findOrCreateByKey } from '@/utils/map';
import { clamp } from '@/utils/number';

import { ActionManager, PlaceTileAction } from '../actions';
import { Subscriber } from '../comms/subscriber';
import { Token } from '../map/token';
import { MapAltered } from '../messages/map/map-altered';
import { ChangeZoom } from '../messages/rendering/change-zoom';
import { AddToken } from '../messages/story/add-token';
import { Highlighter } from './highlighter';
import { Interactor } from './interactor';
import { RenderStack } from './render-stack';

const ScrollEventMap = new Map([
	['ArrowUp', 'up'],
	['ArrowLeft', 'left'],
	['ArrowDown', 'down'],
	['ArrowRight', 'right'],
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
		private interactor: Interactor,
		private actions: ActionManager
	) {
		super();

		this.initRelay();
		this.createApp();
		this.connectStack();
		this.initializeListeners();
	}

	initRelay() {
		this.onEvent(MapAltered, ({ changeset }) => {
			this.drawChangeset(changeset);
		});

		this.onEvent(ChangeZoom, ({ amount }) => {
			this.changeZoom(amount);
		});

		this.onEvent(AddToken, ({ token }) => {
			this.addToken(token);
		});
	}

	// TODO: Move this to interactor or something
	private initializeListeners() {
		this.keydown = (e: KeyboardEvent) => {
			const dir = ScrollEventMap.get(e.key);

			if (dir) {
				this.scrollMap(dir);
			}

			if (e.key === '=') {
				this.send(new ChangeZoom('in'));
			}

			if (e.key === '-') {
				this.send(new ChangeZoom('out'));
			}

			if (e.key === 'r' && this.actions.isActive(PlaceTileAction)) {
				console.log('rotate');
			}
		};

		document.addEventListener('keydown', this.keydown);
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

	private addToken(token: Token) {
		const node = this.findOrCreateNodeByPosition(token.position);
		node.add(RenderObject.fromToken(token));
	}

	private connectStack() {
		this.stack.setHitArea(this.app.screen);

		// TODO: base position on screen side to center it.
		this.stack.map.x = 500;
		this.stack.map.y = 300;

		this.app.stage.addChild(this.stack.main);
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

inject(Renderer, [
	EngineConfig,
	RenderStack,
	Highlighter,
	Interactor,
	ActionManager,
]);

container.register(Renderer, {
	class: Renderer,
	lifespan: Lifespan.Resolution,
});

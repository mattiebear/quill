import * as PIXI from 'pixi.js';

import {
	Changeset,
	IO,
	MapEvent,
	NodeChange,
	Position,
	Relay,
	RenderEvent,
	RenderNode,
	RenderObject,
	Subscriber,
} from '@/lib/quill';
import { findOrCreateByKey } from '@/utils/map';
import { degToRad } from '@/utils/math';
import { clamp } from '@/utils/number';
import { assertPresence } from '@/utils/runtime';

export class Renderer implements Subscriber {
	public el: HTMLElement;
	public io: IO;

	private app: PIXI.Application<HTMLCanvasElement>;
	private nodes = new Map<string, RenderNode>();

	// Map layers
	private main = new PIXI.Container();
	private map = new PIXI.Container();
	private tiles = new PIXI.Container();
	private ui = new PIXI.Container();

	// Elements
	private highlight = new PIXI.Container();

	// State
	private zoom = 100;

	initialize() {
		assertPresence(
			this.el,
			'Renderer has not been assigned an element on which to draw'
		);

		this.createApp();
		this.setupRenderLayers();
		this.createHighlight();
		this.initializeListeners();
	}

	link(relay: Relay) {
		// TODO: Clean this up somehow
		relay.subscribe(MapEvent.MapAltered, (changeset: Changeset) => {
			this.drawChangeset(changeset);
		});

		// TODO: Pass data instead of different events ex Event.Zoom, { direction: -1 }
		relay.subscribe(RenderEvent.IncreaseZoom, () => {
			this.changeZoom(10);
		});

		relay.subscribe(RenderEvent.DecreaseZoom, () => {
			this.changeZoom(-10);
		});

		relay.subscribe(RenderEvent.ScrollLeft, () => {
			this.map.x += 10;
		});

		relay.subscribe(RenderEvent.ScrollRight, () => {
			this.map.x -= 10;
		});

		relay.subscribe(RenderEvent.ScrollUp, () => {
			this.map.y += 10;
		});

		relay.subscribe(RenderEvent.ScrollDown, () => {
			this.map.y -= 10;
		});

		relay.subscribe(RenderEvent.HighlightTile, (pos: Position) => {
			this.setHighlightPosition(pos);
		});
	}

	destroy() {
		this.app.destroy(true);
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

		this.tiles.addChild(node.view);

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

		this.el.appendChild(this.app.view);
	}

	private setupRenderLayers() {
		this.tiles.zIndex = 0;
		this.tiles.sortableChildren = true;

		this.ui.zIndex = 1;

		this.map.addChild(this.tiles, this.ui);

		this.main.eventMode = 'static';
		this.main.hitArea = this.app.screen;
		this.main.addChild(this.map);

		// TODO: base position on screen side to center it.
		this.map.x = 500;
		this.map.y = 300;

		this.app.stage.addChild(this.main);
	}

	private initializeListeners() {
		this.main.on('mousemove', (e) => {
			const { x, y } = this.map.toLocal(e.global);
			this.io.moveMouse(x, y);
		});

		this.main.on('mousedown', (e) => {
			const { x, y } = this.map.toLocal(e.global);
			this.io.clickTile(x, y);
		});
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

		this.ui.addChild(this.highlight);
	}

	private setHighlightPosition(pos: Position) {
		this.highlight.x = pos.screenX;
		this.highlight.y = pos.screenY;
	}

	// TODO: Save zoom as integer and update via custom setter
	private changeZoom(value: number) {
		this.zoom = clamp(this.zoom + value, 50, 100);

		const scale = this.zoom / 100;

		this.map.scale.x = scale;
		this.map.scale.y = scale;
	}
}

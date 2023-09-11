import * as PIXI from 'pixi.js';

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
} from '@/lib/quill';
import { findOrCreateByKey } from '@/utils/map';
import { degToRad } from '@/utils/math';
import { clamp } from '@/utils/number';
import { assertPresence } from '@/utils/runtime';

import { quillStore } from '../store';

export class Renderer {
	public config: EngineConfig;
	public el: HTMLElement;

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

	constructor() {
		relay
			.channel(Channel.Editor)
			.on(MapEvent.MapAltered, (changeset: Changeset) => {
				this.drawChangeset(changeset);
			});

		relay
			.channel(Channel.Editor)
			.on(RenderEvent.ChangeZoom, (value: number) => {
				this.changeZoom(value);
			});

		relay.channel(Channel.Editor).on(RenderEvent.ScrollMap, (dir: string) => {
			this.scrollMap(dir);
		});

		relay
			.channel(Channel.Editor)
			.on(RenderEvent.HighlightTile, (pos: Position) => {
				this.setHighlightPosition(pos);
			});
	}

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

			const pos = Position.atPoint(x, y, 0);
			relay.send(RenderEvent.HighlightTile, pos).to(Channel.Editor);
		});

		this.main.on('mousedown', (e) => {
			const { x, y } = this.map.toLocal(e.global);

			const position = Position.atPoint(x, y, 0);

			const { selectedBlueprint: id, selectedDirection: direction } =
				quillStore.getState();

			if (id) {
				const blueprint = this.config.tileset.get(id);

				relay
					.send(MapEvent.PlaceTile, {
						blueprint,
						direction,
						position,
					})
					.to(Channel.Editor);
			}
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

	private changeZoom(value: number) {
		this.zoom = clamp(this.zoom + value, 50, 100);

		const scale = this.zoom / 100;

		this.map.scale.x = scale;
		this.map.scale.y = scale;
	}

	private scrollMap(dir: string) {
		switch (dir) {
			case 'up':
				this.map.y += 10;
				break;

			case 'down':
				this.map.y -= 10;
				break;

			case 'right':
				this.map.x -= 10;
				break;

			case 'left':
				this.map.x += 10;
				break;
		}
	}
}

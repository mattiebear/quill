import * as PIXI from 'pixi.js';

import { Position } from '@/lib/quill';
import { Relay, Subscriber } from '@/lib/quill/core/relay';
import { Changeset, NodeChange } from '@/lib/quill/map/changeset';
import { RenderNode } from '@/lib/quill/renderer/render-node';
import { RenderObject } from '@/lib/quill/renderer/render-object';
import { MapEvent, RenderEvent } from '@/lib/quill/types/event';
import { findOrCreateByKey } from '@/utils/map';
import { degToRad } from '@/utils/math';
import { clamp } from '@/utils/number';

export class Renderer implements Subscriber {
	public el: HTMLElement;

	private app: PIXI.Application<HTMLCanvasElement>;
	private nodes = new Map<string, RenderNode>();

	// Map layers
	// private main: PIXI.Container; // Not accessed beyond initial setup for now
	private map: PIXI.Container;
	private tiles: PIXI.Container;
	private ui: PIXI.Container;

	// Elements
	private highlight: PIXI.Container;

	private zoom = 1;

	initialize() {
		if (!this.el) {
			throw new Error(
				'Renderer has not been assigned an element on which to draw'
			);
		}

		this.createApp();
		this.createMapContainers();
		this.createHighlight();
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
	}

	destroy() {
		this.app.destroy(true);
	}

	// Internal handlers
	private drawChangeset(changeset: Changeset) {
		changeset.additive.forEach((change) => {
			this.addStructureFromChange(change);
		});
	}

	private addStructureFromChange(change: NodeChange) {
		const node = this.findOrCreateNodeByPosition(change.position);
		node.add(RenderObject.fromStructure(change.tile));
	}

	private findOrCreateNodeByPosition(position: Position) {
		const key = position.toString();
		const node = findOrCreateByKey(this.nodes, key, new RenderNode(position));

		this.tiles.addChild(node.view);

		return node;
	}

	// private removeStructure() {}

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

	private createMapContainers() {
		const main = new PIXI.Container();
		const map = new PIXI.Container();
		const tiles = new PIXI.Container();
		const ui = new PIXI.Container();

		tiles.zIndex = 0;
		ui.zIndex = 1;

		main.addChild(map);
		map.addChild(tiles, ui);

		main.interactive = true;
		main.hitArea = this.app.screen;

		// TODO: Optimize calls if needed?
		main.on('mousemove', (e) => {
			const local = map.toLocal(e.global);
			const pos = Position.atPoint(local.x, local.y, 0);

			this.highlight.x = pos.screenX;
			this.highlight.y = pos.screenY;
		});

		// this.main = main;
		this.map = map;
		this.tiles = tiles;
		this.ui = ui;

		// TODO: base position on screen side to center it.
		this.map.x = 500;
		this.map.y = 300;

		this.app.stage.addChild(main);
	}

	private createHighlight() {
		// TODO: Also used in Position. DRY up
		const size = Math.sin(degToRad(45)) * 256;

		const rect = new PIXI.Graphics();
		rect.beginFill(0x8059d4);
		rect.drawRect(0, 0, size, size);
		rect.rotation += degToRad(45);
		rect.alpha = 0.3;

		const container = new PIXI.Container();
		container.addChild(rect);
		container.scale.y = 0.5;

		this.highlight = container;

		this.ui.addChild(container);
	}

	private changeZoom(value: number) {
		const delta = value / 100;
		this.zoom = clamp(this.zoom + delta, 0.5, 1);

		this.map.scale.x = this.zoom;
		this.map.scale.y = this.zoom;
	}
}

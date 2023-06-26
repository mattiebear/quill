import * as PIXI from 'pixi.js';

import { Position } from '@/lib/quill';
import { Relay, Subscriber } from '@/lib/quill/core/relay';
import { MapEvent, RenderEvent } from '@/lib/quill/event';
import { Changeset, NodeChange } from '@/lib/quill/map/changeset';
import { RenderNode } from '@/lib/quill/renderer/render-node';
import { RenderObject } from '@/lib/quill/renderer/render-object';

export class Renderer implements Subscriber {
	public el: HTMLElement;

	private app: PIXI.Application<HTMLCanvasElement>;
	private container: PIXI.Container;
	private nodes: Map<string, RenderNode>;

	constructor() {
		this.nodes = new Map();
	}

	initialize() {
		if (!this.el) {
			throw new Error(
				'Renderer has not been assigned an element on which to draw'
			);
		}

		this.createApp();
		this.createNodeContainer();
	}

	link(relay: Relay) {
		relay.subscribe(MapEvent.MapAltered, (changeset: Changeset) => {
			this.drawChangeset(changeset);
		});

		relay.subscribe(RenderEvent.IncreaseZoom, () => {
			this.changeZoom(10);
		});

		relay.subscribe(RenderEvent.DecreaseZoom, () => {
			this.changeZoom(-10);
		});
	}

	private drawChangeset(changeset: Changeset) {
		changeset.additive.forEach((change) => {
			this.addStructureFromChange(change);
		});
	}

	private addStructureFromChange(change: NodeChange) {
		const node = this.findOrCreateNodeByPosition(change.position);
		node.add(RenderObject.fromStructure(change.structure));
	}

	private findOrCreateNodeByPosition(position: Position) {
		const key = position.toString();

		if (!this.nodes.has(key)) {
			this.nodes.set(key, new RenderNode(position));
		}

		const node = this.nodes.get(key);

		if (!node) {
			throw new Error(`Render node does not exist for ke ${key}`);
		}

		this.container.addChild(node.view);

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

	private createNodeContainer() {
		this.container = new PIXI.Container();
		this.app.stage.addChild(this.container);
	}

	private changeZoom(value: number) {
		const delta = value / 100;
		this.container.scale.x += delta;
		this.container.scale.y += delta;
	}
}

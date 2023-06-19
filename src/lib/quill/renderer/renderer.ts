import * as PIXI from 'pixi.js';

import { Position } from '@/lib/quill';
import { Relay } from '@/lib/quill/core/relay';
import { Changeset, NodeChange } from '@/lib/quill/map/changeset';
import { RenderNode } from '@/lib/quill/renderer/render-node';
import { RenderObject } from '@/lib/quill/renderer/render-object';
import { MapEvent, Subscriber } from '@/lib/quill/types';

export class Renderer implements Subscriber {
	public el: HTMLElement;

	private app: PIXI.Application<HTMLCanvasElement>;
	private container: PIXI.Container;
	private nodes: Map<string, RenderNode>;
	// private relay: Relay;

	constructor() {
		this.nodes = new Map();
	}

	initialize() {
		if (!this.el) {
			throw new Error(
				'Renderer has not been assigned an element on which to draw'
			);
		}

		this.app = this.createApp();
		this.container = this.createMainContainer(this.app);
		this.el.appendChild(this.app.view);
	}

	link(relay: Relay) {
		// this.relay = relay;

		relay.subscribe(MapEvent.MapAltered, (changeset: Changeset) => {
			this.drawChangeset(changeset);
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

		return new PIXI.Application<HTMLCanvasElement>({
			resizeTo: window,
			autoDensity: true,
			// TODO: Get color from theme somehow
			backgroundColor: 0x171923,
		});
	}

	private createMainContainer(app: PIXI.Application) {
		const container = new PIXI.Container();

		app.stage.addChild(container);

		return container;
	}
}

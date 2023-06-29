import * as PIXI from 'pixi.js';

import { Position } from '@/lib/quill';
import { Relay, Subscriber } from '@/lib/quill/core/relay';
import { Changeset, NodeChange } from '@/lib/quill/map/changeset';
import { RenderNode } from '@/lib/quill/renderer/render-node';
import { RenderObject } from '@/lib/quill/renderer/render-object';
import { MapEvent, RenderEvent } from '@/lib/quill/types/event';
import { findOrCreateByKey } from '@/utils/map';
import { clamp } from '@/utils/number';

export class Renderer implements Subscriber {
	public el: HTMLElement;

	private app: PIXI.Application<HTMLCanvasElement>;
	private container: PIXI.Container;
	private nodes = new Map<string, RenderNode>();

	private zoom = 1;

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
		// TODO: Clean this up somehow
		relay.subscribe(MapEvent.MapAltered, (changeset: Changeset) => {
			this.drawChangeset(changeset);
		});

		relay.subscribe(RenderEvent.IncreaseZoom, () => {
			this.changeZoom(10);
		});

		relay.subscribe(RenderEvent.DecreaseZoom, () => {
			this.changeZoom(-10);
		});

		relay.subscribe(RenderEvent.ScrollLeft, () => {
			this.container.x += 10;
		});

		relay.subscribe(RenderEvent.ScrollRight, () => {
			this.container.x -= 10;
		});

		relay.subscribe(RenderEvent.ScrollUp, () => {
			this.container.y += 10;
		});

		relay.subscribe(RenderEvent.ScrollDown, () => {
			this.container.y -= 10;
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
		node.add(RenderObject.fromStructure(change.structure));
	}

	private findOrCreateNodeByPosition(position: Position) {
		const key = position.toString();
		const node = findOrCreateByKey(this.nodes, key, new RenderNode(position));

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
		this.zoom = clamp(this.zoom + delta, 0.5, 1);

		this.container.scale.x = this.zoom;
		this.container.scale.y = this.zoom;
	}
}

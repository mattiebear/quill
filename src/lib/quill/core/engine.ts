import { Atlas } from '@/lib/quill';
import { Renderer } from '@/lib/quill/renderer/renderer';

import { IO } from './io';
import { Relay } from './relay';
import { Store } from './store';

enum EngineState {
	Pending,
	Running,
}

export class Engine {
	private atlas: Atlas;
	private state: EngineState;

	private readonly renderer: Renderer;
	private readonly relay: Relay;

	public readonly io: IO;
	public readonly store: Store;

	constructor() {
		this.io = new IO();
		this.relay = new Relay();
		this.renderer = new Renderer();
		this.store = new Store();
		this.state = EngineState.Pending;
	}

	load(atlas: Atlas) {
		this.atlas = atlas;
		return this;
	}

	drawTo(el: HTMLElement) {
		this.renderer.el = el;
		return this;
	}

	initialize() {
		if (!this.atlas) {
			throw new Error('Quill.Engine not initialized with an Atlas');
		}

		this.relay.link(this.atlas, this.renderer, this.io);
		this.renderer.initialize();
		this.state = EngineState.Running;

		return this;
	}

	get isRunning() {
		return this.state === EngineState.Running;
	}
}

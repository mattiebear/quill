import { Atlas } from '@/lib/quill';
import { Renderer } from '@/lib/quill/renderer/renderer';

import { Relay } from './relay';
import { Store } from './store';

export class Engine {
	private atlas: Atlas;
	private renderer: Renderer;
	private relay: Relay;

	public store: Store;

	constructor() {
		this.relay = new Relay();
		this.renderer = new Renderer();
		this.store = new Store();
	}

	load(atlas: Atlas) {
		this.atlas = atlas;
	}

	drawTo(el: HTMLElement) {
		this.renderer.el = el;
	}

	initialize() {
		if (!this.atlas) {
			throw new Error('Quill.Engine not initialized with an Atlas');
		}

		this.relay.link(this.atlas, this.renderer);

		this.renderer.initialize();
	}
}

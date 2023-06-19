import { Atlas } from '@/lib/quill';

import { Relay } from './relay';
import { Store } from './store';

export class Engine {
	private atlas: Atlas;
	private relay: Relay;

	public store: Store;

	constructor() {
		this.relay = new Relay();
		this.store = new Store();
	}

	load(atlas: Atlas) {
		this.atlas = atlas;
	}

	initialize() {
		if (!this.atlas) {
			throw new Error('Quill.Engine not initialized with an Atlas');
		}

		this.relay.link(this.atlas);
	}
}

import { Relay } from './relay';
import { Store } from './store';

export class Engine {
	private relay: Relay;

	public store: Store;

	constructor() {
		this.relay = new Relay();
		this.store = new Store();
	}

	initialize() {
		this.relay.link();
	}
}

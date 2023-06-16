import { Relay } from '@/lib/quill/relay';
import { Listener } from '@/lib/quill/types';

/**
 * @class Store
 * @description Stores data in a key:value pair map with functionality to subscribe to changes
 */
export class Store {
	private data: Map<string, any>;
	private relay: Relay;

	constructor() {
		this.data = new Map<string, any>();
		this.relay = new Relay();
	}

	/**
	 * Fetch a value from the store
	 * @param {string} key
	 * @returns any
	 */
	get<T = any>(key: string): T {
		return this.data.get(key);
	}

	/**
	 * Set a value in the store and emit change to subscriptions
	 * @param {string} key
	 * @param value
	 */
	set(key: string, value: any) {
		const current = this.get(key);

		if (current !== value) {
			this.relay.send(key, value);
		}

		this.data.set(key, value);
	}

	/**
	 * Subscribes a listener to value changes
	 * @param key
	 * @param listener
	 */
	subscribe(key: string, listener: Listener): VoidFunction {
		return this.relay.subscribe(key, listener);
	}
}

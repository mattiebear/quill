import { Listener } from '@/lib/quill/types';

/**
 * @class Store
 * @description Stores data in a key:value pair map with functionality to subscribe to changes
 */
export class Store {
	private data: Map<string, any>;
	private subscriptions: Map<string, Listener[]>;

	constructor() {
		this.data = new Map<string, any>();
		this.subscriptions = new Map<string, Listener[]>();
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
			this.send(key, value);
		}

		this.data.set(key, value);
	}

	/**
	 * Subscribes a listener to value changes
	 * @param key
	 * @param listener
	 * @returns unsubscribe
	 */
	subscribe(key: string, listener: Listener): VoidFunction {
		const subscriptions = this.getSubscriptions(key);

		subscriptions.push(listener);

		if (this.data.has(key)) {
			listener(this.data.get(key));
		}

		return () => this.unsubscribe(key, listener);
	}

	/**
	 * Removes a listener for a specific data key
	 * @param key
	 * @param listener
	 */
	unsubscribe(key: string, listener: Listener) {
		const subscriptions = this.getSubscriptions(key);

		const filteredSubscriptions = subscriptions.filter(
			(sub) => sub !== listener
		);

		this.subscriptions.set(key, filteredSubscriptions);
	}

	private getSubscriptions(key: string): Listener[] {
		if (!this.subscriptions.has(key)) {
			this.subscriptions.set(key, []);
		}

		const subscriptions = this.subscriptions.get(key);

		if (subscriptions === undefined) {
			throw new Error('No subscriptions found for key');
		}

		return subscriptions;
	}

	private send(key: string, value: any) {
		const subscriptions = this.getSubscriptions(key);

		subscriptions.forEach((listener) => listener(value));
	}
}

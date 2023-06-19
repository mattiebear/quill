import type { Listener } from '../types';
import { Subscriber } from '../types';

/**
 * @class Relay
 * @description Receives events and dispatches them to subscribed listeners
 */
export class Relay {
	private subscriptions: Map<string, Listener[]>;

	constructor() {
		this.subscriptions = new Map<string, Listener[]>();
	}

	/**
	 * Subscribe to an event. Event data will be passed in the callback's first argument
	 * @param event
	 * @param listener
	 * @return { VoidFunction } unsubscribe function
	 */
	public subscribe(event: string, listener: Listener): VoidFunction {
		const subscriptions = this.getEventSubscriptions(event);

		subscriptions.push(listener);

		return () => {
			this.unsubscribe(event, listener);
		};
	}

	/**
	 * Unsubscribe a listener from an event
	 * @param event
	 * @param listener
	 */
	public unsubscribe(event: string, listener: Listener): void {
		const subscriptions = this.getEventSubscriptions(event);

		const filteredSubscriptions = subscriptions.filter(
			(sub) => sub !== listener
		);

		this.subscriptions.set(event, filteredSubscriptions);
	}

	/**
	 * Dispatch an event with optional data
	 * @param event
	 * @param data
	 */
	public send(event: string, data?: any): void {
		const subscriptions = this.getEventSubscriptions(event);

		subscriptions.forEach((sub) => sub(data));
	}

	/**
	 * Run the `link()` handler in the provided modules with the relay instance
	 * @param modules
	 */
	public link<T extends Subscriber>(...modules: T[]) {
		modules.forEach((module) => module.link(this));
	}

	private getEventSubscriptions(event: string): Listener[] {
		if (!this.subscriptions.has(event)) {
			this.subscriptions.set(event, []);
		}

		const subscriptions = this.subscriptions.get(event);

		if (subscriptions === undefined) {
			throw new Error('No subscriptions found for event');
		}

		return subscriptions;
	}
}

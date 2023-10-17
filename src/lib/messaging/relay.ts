import { Message } from './message';

export type Observer<T extends Message = Message> = (message: T) => void;

export class Relay {
	private subscriptions = new Map<any, Observer[]>();

	on<T extends Message>(type: new (...args: any[]) => T, handler: Observer<T>) {
		const subs = this.ensure<T>(type);

		subs.push(handler as any);

		return () => {
			const filtered = this.ensure<T>(type).filter((sub) => sub !== handler);
			this.subscriptions.set(type, filtered);
		};
	}

	send<T extends Message>(message: T) {
		const subs = this.ensure<T>(message.constructor as any);

		subs.forEach((sub) => sub(message));
	}

	private ensure<T>(type: new () => T): Observer[] {
		if (!this.subscriptions.has(type)) {
			this.subscriptions.set(type, []);
		}

		const subs = this.subscriptions.get(type);

		if (!subs) {
			throw new Error('No subscription key found');
		}

		return subs;
	}
}

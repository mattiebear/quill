import { Observer, relay } from '@/lib/messaging';
import { Message } from '@/lib/messaging/message';

import { quillStore, QuillStoreValue } from '../store';

export class Subscriber {
	public _subs: VoidFunction[] = [];

	destroy() {
		this.unsubscribeAll();
	}

	unsubscribeAll() {
		this._subs.forEach((unsub) => unsub());
	}

	onEvent<T extends Message>(
		type: new (...args: any[]) => T,
		handler: Observer<T>
	) {
		this._subs.push(this.relay.on(type, handler));
	}

	onState<T extends keyof QuillStoreValue>(
		slice: T,
		handler: (data: QuillStoreValue[T]) => void
	) {
		this._subs.push(
			quillStore.subscribe((state, prev) => {
				if (state[slice] !== prev[slice]) {
					handler(state[slice]);
				}
			})
		);
	}

	send(message: Message) {
		this.relay.send(message);
	}

	private get relay() {
		return relay;
	}
}

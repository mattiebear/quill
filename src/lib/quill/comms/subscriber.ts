import { Channel, relay } from '@/lib/events';

import { quillStore, QuillStoreValue } from '../store';

export class Subscriber {
	public _subs: VoidFunction[] = [];

	destroy() {
		this.unsubscribeAll();
	}

	unsubscribeAll() {
		this._subs.forEach((unsub) => unsub());
	}

	onEvent(event: string, handler: (data: any) => void) {
		this._subs.push(this.channel.on(event, handler));
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

	getChannel(channel: string) {
		return relay.channel(channel);
	}

	send(event: string, data?: any) {
		this.channel.send(event, data);
	}

	private get channel() {
		return this.relay.channel(Channel.Quill);
	}

	private get relay() {
		return relay;
	}
}

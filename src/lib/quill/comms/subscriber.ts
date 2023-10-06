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

	onEvent(channel: Channel, event: string, handler: (data: any) => void) {
		this._subs.push(relay.channel(channel).on(event, handler));
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

	get dataChannel() {
		return this.getChannel(Channel.Data);
	}

	get editorChannel() {
		return this.getChannel(Channel.Editor);
	}

	get storyChannel() {
		return this.getChannel(Channel.Story);
	}
}

import { Channel, relay } from '@/lib/events';

export class RelayControl {
	public _subs: VoidFunction[] = [];

	destroy() {
		this.unsubscribeAll();
	}

	unsubscribeAll() {
		this._subs.forEach((unsub) => unsub());
	}

	on(channel: Channel, event: string, handler: (data: any) => void) {
		this._subs.push(relay.channel(channel).on(event, handler));
	}
}

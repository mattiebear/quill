import { unsubscribe } from 'diagnostics_channel';

export class Relayable {
	private _relaySubscriptions: VoidFunction[] = [];

	destroy() {
		this._relaySubscriptions.forEach((unsubscribe) => unsubscribe());
	}
}

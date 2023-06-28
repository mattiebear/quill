import { expect, it, vi } from 'vitest';

import { SubscriptionRelay } from '../../types/types';
import { Relay } from '../relay';

it('dispatches events to listeners', () => {
	const relay = new Relay();

	const listener = vi.fn();

	relay.subscribe('event', listener);
	relay.send('event', 'value');

	expect(listener).toHaveBeenCalledWith('value');
});
it('unsubscribes listener', () => {
	const relay = new Relay();

	const listener = vi.fn();

	relay.subscribe('event', listener);
	relay.unsubscribe('event', listener);
	relay.send('event', 'value');

	expect(listener).not.toHaveBeenCalled();
});
it('initializes linked modules', () => {
	const relay = new Relay();
	const listener = vi.fn();

	class Stub {
		link(relay: SubscriptionRelay) {
			relay.subscribe('event', listener);
		}
	}

	const stub = new Stub();

	relay.link(stub);
	relay.send('event');

	expect(listener).toHaveBeenCalled();
});

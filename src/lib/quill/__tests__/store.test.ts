import { expect, it, vi } from 'vitest';

import { Store } from '../store';

it('returns `undefined` if the value does not exist', () => {
	const store = new Store();

	expect(store.get('key')).toBeUndefined();
});

it('returns the saved value', () => {
	const store = new Store();

	store.set('key', 1);

	expect(store.get('key')).toBe(1);
});

it('emits change events to subscribers', () => {
	const listener = vi.fn();

	const store = new Store();

	store.subscribe('key', listener);

	store.set('key', 1);

	expect(listener).toHaveBeenCalledWith(1);

	store.set('key', 1);

	expect(listener).toHaveBeenCalledTimes(1);

	store.set('key', 2);

	expect(listener).toHaveBeenCalledWith(2);
	expect(listener).toHaveBeenCalledTimes(2);
});

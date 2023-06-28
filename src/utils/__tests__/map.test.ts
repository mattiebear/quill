import { expect, it } from 'vitest';

import { findOrCreateByKey } from '@/utils/map';

it('returns the existing value', () => {
	const map = new Map();

	map.set('key', 'value');

	const result = findOrCreateByKey(map, 'key', 'default');

	expect(result).toEqual('value');
});

it('creates the default value', () => {
	const map = new Map();

	const result = findOrCreateByKey(map, 'key', 'default');

	expect(result).toEqual('default');
});

it('creates returns an exact object instance', () => {
	const map = new Map();

	const defaultValue: string[] = [];

	const result = findOrCreateByKey(map, 'key', defaultValue);

	expect(result).toBe(defaultValue);
});

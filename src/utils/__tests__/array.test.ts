import { describe, expect, it } from 'vitest';

import { equals, shift } from '@/utils/array';

describe('shift()', () => {
	it.each([
		{ array: ['a', 'b', 'c'], start: 0, places: 0, expected: 'a' },
		{ array: ['a', 'b', 'c'], start: 0, places: 1, expected: 'b' },
		{ array: ['a', 'b', 'c'], start: 0, places: -1, expected: 'c' },
		{ array: ['a', 'b', 'c'], start: 0, places: 3, expected: 'a' },
		{ array: ['a'], start: 0, places: 3, expected: 'a' },
		{ array: [], start: 0, places: 1, expected: undefined },
		{ array: ['N', 'E', 'S', 'W'], start: 0, places: -1, expected: 'W' },
	])(
		'moves array $places places to $expected',
		({ array, start, places, expected }) => {
			const move = shift(array);

			expect(move(start, places)).toBe(expected);
		}
	);
});

describe('equals()', () => {
	it.each([
		{ a: ['a', 'b', 'c'], b: ['a', 'b', 'c'], expected: true },
		{ a: ['a', 'b', 'c'], b: ['a', 'b'], expected: false },
		{ a: ['a', 'b'], b: ['a', 'b', 'c'], expected: false },
		{ a: [1, 2], b: ['1', '2'], expected: false },
		{ a: [{}], b: [{}], expected: false },
		{ a: [], b: [], expected: true },
	])(
		'determines arrays $a and $b equal to be $expected',
		({ a, b, expected }) => {
			expect(equals(a, b)).toBe(expected);
		}
	);
});

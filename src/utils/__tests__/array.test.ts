import { describe, expect, it } from 'vitest';

import { shift } from '@/utils/array';

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

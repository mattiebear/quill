import { expect, it } from 'vitest';

import { Point } from '@/lib/quill/utility/point';

it.each([
	[0, 0, 0, 1, 1],
	[0, 0, 1, 1, 1.4142],
	[-5, -10, 2, 3, 14.7648],
])('calculates the distance between points', (ox, oy, px, py, expected) => {
	const origin = new Point(ox, oy);
	const point = new Point(px, py);

	expect(point.distanceTo(origin)).toBeCloseTo(expected);
});

it('calculates the x,y difference', () => {
	const origin = new Point(5, -2);
	const point = new Point(8, 1);

	expect(point.difference(origin)).toEqual([3, 3]);
});

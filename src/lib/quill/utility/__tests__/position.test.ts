import { expect, it } from 'vitest';

import { Position } from '@/lib/quill';

it.each([
	[0, 0, 0, 0],
	[128, 0, 0, -1],
	[128, 128, 1, 0],
])('calculates the position coords from a point', (px, py, ex, ey) => {
	const position = Position.atPoint(px, py, 0);

	expect(position.x).toBe(ex);
	expect(position.y).toBe(ey);
});

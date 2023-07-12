import { expect, it } from 'vitest';

import { Point } from '@/lib/quill/utility/point';
import { Vector2 } from '@/lib/quill/utility/vector2';

it('calculates the vector between two points', () => {
	const origin = new Point(0, 0);
	const point = new Point(1, 1);
	const vector2 = Vector2.connect(point, origin);

	expect(vector2.angle).toBeCloseTo(45);
});

it('applies rotation', () => {
	const origin = new Point(0, 0);
	const point = new Point(1, 0);

	const result = Vector2.connect(point, origin).rotate(90).endpoint;

	expect(result.x).toBeCloseTo(0);
	expect(result.y).toBeCloseTo(1);
});

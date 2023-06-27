import { clamp } from '../number';

it.each([
	[10, 0, 10, 10],
	[10, 0, 5, 5],
	[10, 15, 20, 15],
])('val: %i, min: %i, max: %i returns %i', (val, min, max, expected) => {
	expect(clamp(val, min, max)).toBe(expected);
});

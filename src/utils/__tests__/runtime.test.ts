import { describe, expect, it } from 'vitest';

import { assertPresence } from '@/utils/runtime';

describe('assertPresence()', () => {
	it.each([null, undefined])(
		'throws an error if the value is absent',
		(value) => {
			expect(() => assertPresence(value)).toThrowError();
		}
	);

	it.each([{}, 1, 'test', [], 0, false])(
		'does not throw an error if the value is present',
		(value) => {
			expect(() => assertPresence(value)).not.toThrowError();
		}
	);
});

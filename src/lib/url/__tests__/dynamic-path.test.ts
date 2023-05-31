import { expect, it } from 'vitest';

import { DynamicPath } from '../dynamic-path';

it('returns the id path of the record', () => {
	const urlPath = new DynamicPath('/users/:id');
	const record = { id: '123' };

	expect(urlPath.for(record).toString()).toBe('/users/123');
});

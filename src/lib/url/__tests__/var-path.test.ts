import { expect, it } from 'vitest';

import { VarPath } from '../var-path';

it('returns the id path of the record', () => {
	const urlPath = new VarPath('/users/:id');
	const record = { id: '123' };

	expect(urlPath.for(record).toString()).toBe('/users/123');
});

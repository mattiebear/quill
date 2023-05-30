import { expect, it } from 'vitest';

import { URLPath } from '../url-path';

it('returns the id path of the record', () => {
	const urlPath = new URLPath('/users/:id');
	const record = { id: '123' };

	expect(urlPath.for(record).toString()).toBe('/users/123');
});

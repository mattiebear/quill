import { expect, it } from 'vitest';

import { Action } from '../action';

it('clones the action', () => {
	class Thing extends Action {
		constructor(public prop1: string, public prop2 = 50) {
			super();
		}
	}

	const object = new Thing('value1', 100);

	const result = object.clone({ prop1: 'value2' });

	expect(result).toMatchObject({ prop1: 'value2', prop2: 100 });
});

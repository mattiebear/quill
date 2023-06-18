import { expect, it } from 'vitest';

import { DirectionalSprite } from '@/lib/quill/map/directional-sprite';

import { Direction } from '../../types';

it('creates an instance from source path', () => {
	const directionalSprite = DirectionalSprite.from('/path/image');

	expect(directionalSprite.face(Direction.N)).toBe('/path/image_N.png');
	expect(directionalSprite.face(Direction.E)).toBe('/path/image_E.png');
});

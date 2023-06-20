import { Texture } from 'pixi.js';
import { expect, it } from 'vitest';

import { DirectionalSprite } from '@/lib/quill/map/directional-sprite';

import { Direction } from '../../types';

it('creates an instance from source path', () => {
	const directionalSprite = DirectionalSprite.from('/path/image');

	expect(directionalSprite.face(Direction.N)).toBeInstanceOf(Texture);
});

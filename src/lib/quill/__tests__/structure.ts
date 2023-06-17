import { expect, it } from 'vitest';

import {
	Direction,
	DirectionalSprite,
	Structure,
	StructureBlueprint,
	StructureType,
} from '@/lib/quill';

it('returns the sprite image for the provided direction', () => {
	const sprite = DirectionalSprite.from('/image/tile');
	const blueprint = new StructureBlueprint(
		'tile',
		StructureType.Object,
		sprite
	);
	const structure = new Structure(blueprint, Direction.S);

	expect(structure.sprite).toBe('/image/tile_S.png');
});

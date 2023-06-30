import { expect, it } from 'vitest';

import {
	Direction,
	DirectionalSprite,
	StructureBlueprint,
	StructureType,
} from '@/lib/quill';
import { Structure } from '@/lib/quill/map/structure';

const sprite = DirectionalSprite.from('/image/tile');

const blueprint = new StructureBlueprint('tile', StructureType.Object, sprite);

it('returns the sprite image for the provided direction', () => {
	const structure = new Structure(blueprint, Direction.S);

	expect(structure.sprite).toBe('/image/tile_S.png');
});

it('generates a unique id', () => {
	const structure1 = new Structure(blueprint, Direction.S);
	const structure2 = new Structure(blueprint, Direction.N);

	expect(structure1.id).not.toBe(structure2.id);
});

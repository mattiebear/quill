import { it } from 'vitest';

import { Changeset } from '@/lib/quill/map/changeset';
import { DirectionalSprite } from '@/lib/quill/map/directional-sprite';
import { MapNode } from '@/lib/quill/map/map-node';
import {
	StructureBlueprint,
	StructureType,
} from '@/lib/quill/map/structure-blueprint';
import { Direction } from '@/lib/quill/types';

const sprite = DirectionalSprite.from('test');
const blueprint = new StructureBlueprint('test', StructureType.Floor, sprite);

it('returns a changeset for adding a new structure', () => {
	const node = new MapNode(0, 0, 0);

	const result = node.add(blueprint, Direction.N);

	expect(result).toBeInstanceOf(Changeset);
	expect(result.additive).toHaveLength(1);
	expect(result.subtractive).toHaveLength(0);
});

it('returns a changeset for replacing a structure', () => {
	const node = new MapNode(0, 0, 0);

	node.add(blueprint, Direction.N);

	const result = node.add(blueprint, Direction.N);

	expect(result.additive).toHaveLength(1);
	expect(result.subtractive).toHaveLength(1);
});

it('does not remove a wall unless it faces the same direction', () => {
	const node = new MapNode(0, 0, 0);
	const blueprint = new StructureBlueprint('test', StructureType.Wall, sprite);

	node.add(blueprint, Direction.N);

	const result = node.add(blueprint, Direction.S);

	expect(result.additive).toHaveLength(1);
	expect(result.subtractive).toHaveLength(0);
});

it('returns a changeset for removing a structure', () => {
	const node = new MapNode(0, 0, 0);

	const changeset = node.add(blueprint, Direction.N);

	const structure = changeset.all[0].structure;

	const result = node.remove(structure.id);

	expect(result.additive).toHaveLength(0);
	expect(result.subtractive).toHaveLength(1);
});

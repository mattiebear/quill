import { it } from 'vitest';

import { Changeset } from '@/lib/quill/map/changeset';
import { DirectionalSprite } from '@/lib/quill/map/directional-sprite';
import { MapNode } from '@/lib/quill/map/map-node';
import { TileBlueprint, TileType } from '@/lib/quill/map/tile-blueprint';
import { Direction } from '@/lib/quill/types/map';
import { Position } from '@/lib/quill/utility/position';

const position = new Position(0, 0, 0);
const sprite = DirectionalSprite.from('test');
const blueprint = new TileBlueprint('test', TileType.Floor, sprite);

it('returns a changeset for adding a new tile', () => {
	const node = new MapNode(position);

	const result = node.add(blueprint, Direction.N);

	expect(result).toBeInstanceOf(Changeset);
	expect(result.additive).toHaveLength(1);
	expect(result.subtractive).toHaveLength(0);
});

it('returns a changeset for replacing a tile', () => {
	const node = new MapNode(position);

	node.add(blueprint, Direction.N);

	const result = node.add(blueprint, Direction.N);

	expect(result.additive).toHaveLength(1);
	expect(result.subtractive).toHaveLength(1);
});

it('does not remove a wall unless it faces the same direction', () => {
	const node = new MapNode(position);
	const blueprint = new TileBlueprint('test', TileType.Wall, sprite);

	node.add(blueprint, Direction.N);

	const result = node.add(blueprint, Direction.S);

	expect(result.additive).toHaveLength(1);
	expect(result.subtractive).toHaveLength(0);
});

it('returns a changeset for removing a tile', () => {
	const node = new MapNode(position);

	const changeset = node.add(blueprint, Direction.N);

	const result = node.remove(changeset.all[0].tile.id);

	expect(result.additive).toHaveLength(0);
	expect(result.subtractive).toHaveLength(1);
});

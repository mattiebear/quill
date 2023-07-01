import { expect, it } from 'vitest';

import {
	Direction,
	DirectionalSprite,
	TileBlueprint,
	TileType,
} from '@/lib/quill';
import { Tile } from '@/lib/quill/map/tile';

const sprite = DirectionalSprite.from('/image/tile');

const blueprint = new TileBlueprint('tile', TileType.Object, sprite);

it('returns the sprite image for the provided direction', () => {
	const tile = new Tile(blueprint, Direction.S);

	expect(tile.sprite).toBe('/image/tile_S.png');
});

it('generates a unique id', () => {
	const tile1 = new Tile(blueprint, Direction.S);
	const tile2 = new Tile(blueprint, Direction.N);

	expect(tile1.id).not.toBe(tile2.id);
});

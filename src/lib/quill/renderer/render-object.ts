import { Sprite, Texture } from 'pixi.js';

import { Direction, Tile, TileType } from '@/lib/quill';

// NOTE: Offset is to account for sprite height of 512 while only 128 are the actual tile at bottom of image
// The 20 is because the tiles sit "up" a few to give the perception of depth
// TODO: Get from config or something
const TILE_BASE = 128;
const TILE_IMAGE_HEIGHT = TILE_BASE * 4;

export class RenderObject {
	public readonly sprite: Sprite;

	constructor(
		public readonly id: string,
		public readonly texture: Texture,
		public readonly order: number,
		public readonly baseThickness = 0
	) {
		this.sprite = new Sprite(texture);

		// Anchor is set at a decimal percentage based on the full height of the tile.
		const buffer = TILE_BASE * 3 - this.baseThickness;
		this.sprite.anchor.set(0.5, buffer / TILE_IMAGE_HEIGHT);
	}

	public static fromTile(tile: Tile) {
		// TODO: Put this somewhere else
		let baseThickness, order;

		if (tile.type === TileType.Floor) {
			// TODO: Get from config?
			baseThickness = 20;
			order = 0;
		} else if (tile.type === TileType.Object) {
			order = 2;
		} else {
			if (tile.direction === Direction.E || tile.direction === Direction.S) {
				order = 1;
			} else {
				order = 3;
			}
		}

		return new RenderObject(tile.id, tile.texture, order, baseThickness);
	}
}

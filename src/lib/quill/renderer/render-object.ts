import { Sprite, Texture } from 'pixi.js';

import { Direction, TileType } from '@/lib/quill';
import { Tile } from '@/lib/quill/map/tile';

// NOTE: Offset is to account for sprite height of 512 while only 128 are the actual tile at bottom of image
// The 20 is because the tiles sit "up" a few to give the perception of depth
// TODO: Get from config or something
const TILE_BUFFER = 128 * 3 - 20;
const TILE_IMAGE_HEIGHT = 128 * 4;

export class RenderObject {
	public readonly sprite: Sprite;

	constructor(
		public readonly id: string,
		public readonly texture: Texture,
		public readonly order: number
	) {
		this.sprite = new Sprite(texture);
		this.sprite.anchor.set(0.5, TILE_BUFFER / TILE_IMAGE_HEIGHT);
	}

	public static fromStructure(tile: Tile) {
		// TODO: Put this somewhere else
		let order;

		if (tile.type === TileType.Floor) {
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

		return new RenderObject(tile.id, tile.texture, order);
	}
}

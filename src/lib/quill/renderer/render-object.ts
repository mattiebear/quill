import { Sprite, Texture } from 'pixi.js';

import { Direction, TileType } from '@/lib/quill';
import { Tile } from '@/lib/quill/map/tile';

export class RenderObject {
	public readonly sprite: Sprite;

	constructor(
		public readonly id: string,
		public readonly texture: Texture,
		public readonly order: number
	) {
		this.sprite = new Sprite(texture);
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

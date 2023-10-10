import { Container, Sprite, Texture } from 'pixi.js';

import { Direction, Tile, TileType } from '@/lib/quill';

import { Token } from '../map/token';

// TODO: Move height data to tile/token
// NOTE: Offset is to account for sprite height of 512 while only 128 are the actual tile at bottom of image
// The 20 is because the tiles sit "up" a few to give the perception of depth
// TODO: Get from config or something
const TILE_BASE = 128;
const TILE_IMAGE_HEIGHT = TILE_BASE * 4;

enum Order {
	Bottom = 0,
	Low = 1,
	Mid = 2,
	Top = 3,
}

// TODO: Where to put this?
const baseTexture = Texture.from('/images/bases/base_stone.png');

export class RenderObject {
	constructor(
		public readonly id: string,
		public readonly sprite: Container | Sprite,
		public readonly order: number
	) {}

	public static fromTile(tile: Tile) {
		// TODO: Put this somewhere else
		let baseThickness = 0,
			order;

		if (tile.type === TileType.Floor) {
			// TODO: Get from config?
			baseThickness = 20;
			order = Order.Bottom;
		} else if (tile.type === TileType.Object) {
			order = Order.Mid;
		} else {
			if (tile.direction === Direction.E || tile.direction === Direction.S) {
				order = Order.Low;
			} else {
				order = Order.Top;
			}
		}

		const buffer = TILE_BASE * 3 - baseThickness;
		const sprite = new Sprite(tile.texture);

		// Anchor is set at a decimal percentage based on the full height of the tile.
		sprite.anchor.set(0.5, buffer / TILE_IMAGE_HEIGHT);

		return new RenderObject(tile.id, sprite, order);
	}

	public static fromToken(token: Token) {
		const container = new Container();
		// TODO: Load static textures in single file
		const texture = Texture.from(token.frameImage);
		const frame = new Sprite(texture);
		const base = new Sprite(baseTexture);

		// TODO: Clean this up
		const buffer = TILE_BASE * 3 - 10;
		frame.scale.set(0.6, 0.6);
		frame.anchor.set(0.5, buffer / TILE_IMAGE_HEIGHT);
		base.anchor.set(0.5, buffer / TILE_IMAGE_HEIGHT);

		container.addChild(base, frame);

		return new RenderObject(token.id, container, Order.Mid);
	}
}

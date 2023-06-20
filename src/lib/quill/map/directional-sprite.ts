import { Texture } from 'pixi.js';

import { Direction } from '../types';

/**
 * A collection of 2D images representing a 3D object's isometric cardinal views
 */
export class DirectionalSprite {
	private sprites: Map<Direction, Texture>;

	constructor(n: string, e: string, s: string, w: string) {
		this.sprites = new Map([
			[Direction.N, Texture.from(n)],
			[Direction.E, Texture.from(e)],
			[Direction.S, Texture.from(s)],
			[Direction.W, Texture.from(w)],
		]);
	}

	/**
	 * Returns the sprite image path for the specified direction
	 * @param direction
	 * @returns string
	 */
	face(direction: Direction) {
		const view = this.sprites.get(direction);

		if (!view) {
			throw new Error('Sprite not initialized with face for direction');
		}

		return view;
	}

	/**
	 * Creates a new DirectionalSprite from source path
	 * @param source
	 */
	public static from(source: string) {
		const directions = Object.keys(Direction).map((dir) => {
			return `${source}_${dir}.png`;
		}) as [string, string, string, string];

		return new DirectionalSprite(...directions);
	}
}

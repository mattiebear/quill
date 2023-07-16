import { Texture } from 'pixi.js';

import { Direction } from '@/lib/quill';

interface DirectionalTexture {
	source: string;
	sprite: Texture;
}

/**
 * A collection of 2D images representing a 3D object's isometric cardinal views
 */
export class DirectionalSprite {
	// private sources: Map<Direction, string>;
	// private sprites: Map<Direction, Texture>;
	private faces = new Map<Direction, DirectionalTexture>();

	constructor(n: string, e: string, s: string, w: string) {
		const create = (source: string): DirectionalTexture => {
			return {
				source,
				sprite: Texture.from(source),
			};
		};

		this.faces.set(Direction.N, create(n));
		this.faces.set(Direction.E, create(e));
		this.faces.set(Direction.S, create(s));
		this.faces.set(Direction.W, create(w));
	}

	face(direction: Direction) {
		const face = this.faces.get(direction);

		if (!face) {
			throw new Error('No face found for specified direction');
		}

		return face;
	}

	/**
	 * Returns the sprite texture for a given direction
	 * @param direction
	 * @returns Texture
	 */
	image(direction: Direction) {
		return this.face(direction).sprite;
	}

	/**
	 * Returns the sprite source path for a given direction
	 * @param direction
	 * @returns string
	 */
	source(direction: Direction) {
		return this.face(direction).source;
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

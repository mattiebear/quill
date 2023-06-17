import { Direction } from './types';

/**
 * A collection of 2D images representing a 3D object's isometric cardinal views
 */
export class DirectionalSprite {
	private sprites: Map<Direction, string>;

	constructor(n: string, e: string, s: string, w: string) {
		this.sprites = new Map<Direction, string>([
			[Direction.N, n],
			[Direction.E, e],
			[Direction.S, s],
			[Direction.W, w],
		]);
	}

	/**
	 * Returns the sprite image path for the specified direction
	 * @param direction
	 * @returns string
	 */
	face(direction: Direction) {
		return this.sprites.get(direction);
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

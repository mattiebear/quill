export enum Direction {
	North,
	East,
	South,
	West,
}

/**
 * CardinalSprite
 * @description A container for a single tile entity with multiple sprites representing the different cardinal directions.
 */
export class CardinalSprite {
	private _sprites: Map<Direction, string>;

	/**
	 * Constructor
	 * @description Creates a new instance of CardinalSprite.
	 */
	constructor(north: string, east: string, south: string, west: string) {
		this._sprites = new Map<Direction, string>();

		this.setSprite(Direction.North, north);
		this.setSprite(Direction.East, east);
		this.setSprite(Direction.South, south);
		this.setSprite(Direction.West, west);
	}

	sprite(direction: Direction) {
		return this.sprites.get(direction);
	}

	setSprite(direction: Direction, path: string) {
		this.sprites.set(direction, path);
	}

	get sprites() {
		return this._sprites;
	}

	get north() {
		return this.sprite(Direction.North);
	}

	get east() {
		return this.sprite(Direction.East);
	}

	get south() {
		return this.sprite(Direction.South);
	}

	get west() {
		return this.sprite(Direction.West);
	}

	public static from(imagePath: string) {
		const paths = ['N', 'E', 'S', 'W'].map((direction) => {
			return `${imagePath}_${direction}`;
		}) as [string, string, string, string];

		return new CardinalSprite(...paths);
	}
}

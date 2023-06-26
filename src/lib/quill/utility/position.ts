/**
 * A 3D position
 */

export class Position {
	// TODO: Set from config
	private TILE_WIDTH = 256;
	private TILE_HEIGHT = 128;

	constructor(
		public readonly x: number,
		public readonly y: number,
		public readonly z: number
	) {}

	// TODO: Look at options for using actual point object rather than converting to string
	toString() {
		return [this.x, this.y, this.z].join(':');
	}

	get zIndex() {
		return Math.max(this.x, this.y);
	}

	get screenX() {
		const widthOffset = this.TILE_WIDTH / 2;

		return (this.x - this.y) * widthOffset;
	}

	get screenY() {
		const heightOffset = this.TILE_HEIGHT / 2;

		return (this.x + this.y) * heightOffset;
	}
}

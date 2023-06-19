/**
 * A 3D position
 */

export class Position {
	constructor(
		public readonly x: number,
		public readonly y: number,
		public readonly z: number
	) {}

	// TODO: Look at options for using actual point object rather than converting to string
	toString() {
		return [this.x, this.y, this.z].join(',');
	}
}

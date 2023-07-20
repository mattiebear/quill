/**
 * A 3D position
 */
import { Point } from '@/lib/quill/utility/point';
import { Vector2 } from '@/lib/quill/utility/vector2';
import { degToRad } from '@/utils/math';

const TILE_WIDTH = 256;
const TILE_HEIGHT = 128;

const WIDTH_HALF = TILE_WIDTH / 2;
const HEIGHT_HALF = TILE_HEIGHT / 2;

const SQUARE_SIZE = Math.sin(degToRad(45)) * TILE_WIDTH;

// TODO: Rename to something else
export class Position {
	// TODO: Set from config

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
		return this.x + this.y;
	}

	get screenX() {
		return (this.x - this.y) * WIDTH_HALF;
	}

	get screenY() {
		return (this.x + this.y) * HEIGHT_HALF;
	}

	static atPoint(x: number, y: number, z: number) {
		const point = Vector2.connect(Point.origin(), new Point(x, y * 2)).rotate(
			-45
		).endpoint;

		// Width is the rotated full tile width
		return new Position(
			Math.floor(point.x / SQUARE_SIZE),
			Math.floor(point.y / SQUARE_SIZE),
			z
		);
	}
}

import { Point } from './point';
import { Position } from './position';

const FLOOR_OFFSET = 0.2;
const WALL_HEIGHT = 1.5;

const normalize = (value: number) => Math.round(value) + 0;
const magnitude = (value: number) => Math.abs(value % 1);

const position = ({ x, y, z }: Point): [number, number, number, Axis] => {
	const axis = magnitude(x) > magnitude(z) ? 'x' : 'z';

	let localX = x;
	let localZ = z;

	if (axis === 'x') {
		localX = Math.round(x);
		localZ = normalize(z);
	} else {
		localX = normalize(x);
		localZ = Math.round(z);
	}

	return [localX, normalize(y), localZ, axis];
};

export type Axis = 'x' | 'z';

export class AxisPosition implements Position {
	constructor(
		public x: number,
		public y: number,
		public z: number,
		public axis: Axis
	) {}

	toString() {
		return this.toArray().join(':');
	}

	toArray(): [number, number, number, Axis] {
		return [this.x, this.y, this.z, this.axis];
	}

	toCoords(): [number, number, number] {
		const x = this.x;
		const z = this.z;
		const y = this.y + FLOOR_OFFSET + WALL_HEIGHT / 2;

		if (this.axis === 'x') {
			return [x > 0 ? x - 0.5 : x + 0.5, y, this.z];
		} else {
			return [this.x, y, z > 0 ? z - 0.5 : z + 0.5];
		}
	}

	equals(position: Position): boolean {
		return this.toString() === position.toString();
	}

	public static fromPoint(point: Point) {
		return new AxisPosition(...position(point));
	}
}

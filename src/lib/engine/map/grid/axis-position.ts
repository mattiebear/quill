import { Point } from './point';
import { Position } from './position';

const WALL_HEIGHT = 1.5;

// TODO: Clean all of this up. Optimize somehow. Maybe use bitshifiting
const normalize = (value: number) => Math.round(value) + 0;
const magnitude = (value: number) => Math.abs(value % 1);
const level = (value: number) => {
	if (!value) {
		return 1;
	}

	return Math.ceil(Math.abs(value)) * (value < 0 ? -1 : 1);
};

const position = ({ x, y, z }: Point): [number, number, number, Axis] => {
	const axis = magnitude(x) > magnitude(z) ? 'z' : 'x';

	if (axis === 'x') {
		return [normalize(x), normalize(y), level(z), axis];
	} else {
		return [level(x), normalize(y), normalize(z), axis];
	}
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
		return this.toJSON().join(':');
	}

	toJSON(): [number, number, number, Axis] {
		return [this.x, this.y, this.z, this.axis];
	}

	toCoords(): [number, number, number] {
		const x = this.x;
		const z = this.z;
		const y = this.y + WALL_HEIGHT / 2;

		if (this.axis === 'x') {
			return [this.x, y, z > 0 ? z - 0.5 : z + 0.5];
		} else {
			return [x > 0 ? x - 0.5 : x + 0.5, y, this.z];
		}
	}

	equals(position: Position): boolean {
		return this.toString() === position.toString();
	}

	public static fromPoint(point: Point) {
		return new AxisPosition(...position(point));
	}
}

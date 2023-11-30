import { Position } from './position';

const FLOOR_OFFSET = 0.2;
const WALL_HEIGHT = 1.5;

// 1.1 x 0.2 x 1.5

const normalize = (value: number) => Math.round(value) + 0;

export class AxisPosition implements Position {
	constructor(
		public x: number,
		public y: number,
		public z: number,
		axis: 'x' | 'y'
	) {}

	toString() {
		return this.toArray().join(':');
	}

	toArray(): [number, number, number] {
		return [this.x, this.y, this.z];
	}

	toCoords(): [number, number, number] {
		return [this.y, this.z + FLOOR_OFFSET, this.x];
	}

	equals(position: Position): boolean {
		return this.toString() === position.toString();
	}

	public static fromPoint(point: { x: number; y: number; z: number }) {
		const { x, y, z } = point;

		return new AxisPosition(
			...([z, x, y].map(normalize) as [number, number, number]),
			'x'
		);
	}
}

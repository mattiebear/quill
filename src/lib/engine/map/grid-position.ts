import { Point } from './point';
import { Position } from './position';

const TILE_HEIGHT = 0.2;

const normalize = (value: number) => Math.round(value) + 0;

export class GridPosition implements Position {
	constructor(public x: number, public y: number, public z: number) {}

	toString() {
		return this.toArray().join(':');
	}

	toArray(): [number, number, number] {
		return [this.x, this.y, this.z];
	}

	toCoords(): [number, number, number] {
		const heightOffset = TILE_HEIGHT / 2;

		return [this.y, this.z + heightOffset, this.x];
	}

	equals(position: Position): boolean {
		return this.toString() === position.toString();
	}

	public static fromPoint(point: Point) {
		const { x, y, z } = point;

		return new GridPosition(
			...([z, x, y].map(normalize) as [number, number, number])
		);
	}
}

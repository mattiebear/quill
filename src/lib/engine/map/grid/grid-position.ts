import { Point } from './point';
import { Position } from './position';

const TILE_HEIGHT = 0.2;

export class GridPosition implements Position {
	constructor(public x: number, public y: number, public z: number) {}

	toString() {
		return this.toJSON().join(':');
	}

	toJSON(): [number, number, number] {
		return [this.x, this.y, this.z];
	}

	// TODO: This needs to work with tiles and tokens
	toCoords(): [number, number, number] {
		const heightOffset = TILE_HEIGHT / 2;

		return [this.x, this.y - heightOffset, this.z];
	}

	equals(position: Position): boolean {
		return this.toString() === position.toString();
	}

	public static fromPoint(point: Point) {
		return new GridPosition(...point.normalize());
	}
}

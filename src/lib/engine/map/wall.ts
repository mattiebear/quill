import { Axis, AxisPosition } from './axis-position';
import { Point } from './point';

interface WallData {
	id: string;
	pos: [number, number, number, Axis];
	tile: string;
}

export class Wall {
	constructor(
		public id: string,
		public position: AxisPosition,
		public tileId: string
	) {}

	toJSON(): WallData {
		return {
			id: this.id,
			pos: this.position.toArray(),
			tile: this.tileId,
		};
	}

	static from(data: WallData): Wall {
		return new Wall(data.id, new AxisPosition(...data.pos), data.tile);
	}

	static position(point: Point): AxisPosition {
		return AxisPosition.fromPoint(point);
	}
}

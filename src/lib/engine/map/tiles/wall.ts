import { MathUtils } from 'three';

import { Axis, AxisPosition } from '../grid/axis-position';
import { Point } from '../grid/point';

// TODO: Combine with map response data
export interface WallData {
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

	get rotation() {
		return this.position.axis === 'x' ? 0 : MathUtils.DEG2RAD * 90;
	}

	toJSON(): WallData {
		return {
			id: this.id,
			pos: this.position.toJSON(),
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

import { GridPosition } from '../grid/grid-position';
import { Point } from '../grid/point';

// TODO: Combine with map response data
export interface TokenData {
	id: string;
	pos: [number, number, number];
	tile: string;
	rot: number;
}

export class Token {
	constructor(
		public id: string,
		public position: GridPosition,
		public tileId: string,
		public rotation: number
	) {}

	toJSON(): TokenData {
		return {
			id: this.id,
			pos: this.position.toArray(),
			tile: this.tileId,
			rot: this.rotation,
		};
	}

	static from(data: TokenData): Token {
		return new Token(
			data.id,
			new GridPosition(...data.pos),
			data.tile,
			data.rot
		);
	}

	static position(point: Point): GridPosition {
		return GridPosition.fromPoint(point);
	}
}

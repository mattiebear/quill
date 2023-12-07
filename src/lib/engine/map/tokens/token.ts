import { GridPosition } from '../grid/grid-position';
import { Point } from '../grid/point';

export interface TokenData {
	id: string;
	rot: number;
	userId: string;
	tokenId: string;
	x: number;
	y: number;
	z: number;
}

export class Token {
	constructor(
		public id: string,
		public userId: string,
		public position: GridPosition,
		public tokenId: string,
		public rot: number
	) {}

	toJSON(): TokenData {
		return {
			id: this.id,
			rot: this.rot,
			tokenId: this.tokenId,
			userId: this.userId,
			...this.position,
		};
	}

	static from(data: TokenData): Token {
		return new Token(
			data.id,
			data.userId,
			new GridPosition(data.x, data.y, data.z),
			data.tokenId,
			data.rot
		);
	}

	static position(point: Point): GridPosition {
		return GridPosition.fromPoint(point);
	}
}

import { GridPosition } from '../grid/grid-position';
import { Point } from '../grid/point';

export interface TokenJSON {
	id: string;
	pos: [number, number, number];
	rot: number;
	tokenId: string;
}

export interface TokenData extends TokenJSON {
	userId: string;
}

export class Token {
	constructor(
		public id: string,
		public userId: string,
		public position: GridPosition,
		public tokenId: string,
		public rotation: number
	) {}

	clone() {
		return Token.from({
			id: this.id,
			pos: this.position.toJSON(),
			rot: this.rotation,
			tokenId: this.tokenId,
			userId: this.userId,
		});
	}

	toJSON(): TokenJSON {
		return {
			id: this.id,
			pos: this.position.toJSON(),
			rot: this.rotation,
			tokenId: this.tokenId,
		};
	}

	static from(data: TokenData): Token {
		return new Token(
			data.id,
			data.userId,
			new GridPosition(...data.pos),
			data.tokenId,
			data.rot
		);
	}

	static position(point: Point): GridPosition {
		return GridPosition.fromPoint(point);
	}
}

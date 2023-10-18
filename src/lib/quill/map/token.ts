import { TokenData } from '../messages/types/tokens';
import { Position } from '../utility/position';

export class Token {
	constructor(
		public readonly id: string,
		public readonly userId: string,
		public readonly tokenId: string,
		public position: Position
	) {}

	public get frameImage() {
		return `/images/tokens/${this.tokenId}-frame.jpg`;
	}

	public get iconImage() {
		return `/images/tokens/${this.tokenId}-icon.jpg`;
	}

	toJSON() {
		return {
			id: this.id,
			userId: this.userId,
			tokenId: this.tokenId,
			x: this.position.x,
			y: this.position.y,
			z: this.position.z,
		};
	}

	static fromJSON(data: TokenData) {
		const pos = new Position(data.x, data.y, data.z);
		return new Token(data.id, data.userId, data.tokenId, pos);
	}
}

import { Crypto } from '@/lib/crypto';

import { Position } from '../utility/position';

export class Token {
	public readonly id: string;

	constructor(
		public readonly userId: string,
		public readonly tokenId: string,
		public position: Position
	) {
		this.id = this.generateUniqueId();
	}

	public get frameImage() {
		return `/images/tokens/${this.tokenId}-frame.jpg`;
	}

	public get iconImage() {
		return `/images/tokens/${this.tokenId}-icon.jpg`;
	}

	private generateUniqueId() {
		return Crypto.uniqueId();
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
}

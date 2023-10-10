import { User } from '@/entites/user';
import { Crypto } from '@/lib/crypto';

import { Position } from '../utility/position';

export class Token {
	public readonly id: string;

	constructor(
		public readonly user: User,
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
}

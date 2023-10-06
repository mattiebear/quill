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

	private generateUniqueId() {
		return Crypto.uniqueId();
	}
}

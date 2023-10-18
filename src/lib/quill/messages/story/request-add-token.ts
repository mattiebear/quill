import { Message } from '@/lib/messaging/message';

import { Position } from '../..';

// Broadcast event to request adding a token to a tile
export class RequestAddToken extends Message {
	public static name = 'request-add-token';

	constructor(
		public tokenId: string,
		public userId: string,
		public position: Position
	) {
		super();
	}

	toJSON() {
		return {
			event: RequestAddToken.name,
			data: {
				tokenId: this.tokenId,
				userId: this.userId,
				...this.position.toJSON(),
			},
		};
	}
}

import { Message } from '@/lib/messaging/message';

import { Token } from '../../map/token';

// Broadcast event to request adding a token to a tile
export class RequestAddToken extends Message {
	public static name = 'request-add-token';

	constructor(public token: Token) {
		super();
	}

	toJSON() {
		return {
			event: RequestAddToken.name,
			data: this.token.toJSON(),
		};
	}
}

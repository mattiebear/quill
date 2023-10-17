import { Message } from '@/lib/messaging/message';

import { Token } from '../../map/token';

// Adds a token to the token map and renderer
export class AddToken extends Message {
	public static name = 'add-token';

	constructor(public token: Token) {
		super();
	}

	toJSON() {
		return {
			event: AddToken.name,
			data: this.token.toJSON(),
		};
	}
}

import { Message } from '@/lib/messaging/message';

import { Token } from '../map/token';

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

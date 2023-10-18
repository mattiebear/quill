import { Message } from '@/lib/messaging/message';

import { Token } from '../../map/token';
import { TokenData } from '../types/tokens';

// Adds a token to the token map and renderer
export class AddToken extends Message {
	public static name = 'add-token';

	constructor(public token: Token) {
		super();
	}

	public static fromJSON(data: TokenData) {
		return new AddToken(Token.fromJSON(data));
	}
}

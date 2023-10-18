import { Message } from '@/lib/messaging/message';

import { Token } from '../../map/token';
import { Position } from '../../utility/position';
import { TokenData } from '../types/tokens';

// Adds a token to the token map and renderer
export class AddToken extends Message {
	public static name = 'add-token';

	constructor(public token: Token) {
		super();
	}

	public static fromJSON(data: TokenData) {
		const position = new Position(data.x, data.y, data.z);
		const token = new Token(data.id, data.userId, data.tokenId, position);

		return new AddToken(token);
	}
}

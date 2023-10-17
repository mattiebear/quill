import { container, Lifespan } from '@/lib/di';

import { Subscriber } from '../comms/subscriber';
import { AddToken } from '../messages/story/add-token';
import { Position } from '../utility/position';
import { Token } from './token';

export class TokenMap extends Subscriber {
	private tokens = new Map<string, Token>();

	constructor() {
		super();
		this.init();
	}

	init() {
		this.onEvent(AddToken, ({ token }) => this.addToken(token));
	}

	private addToken(token: Token) {
		this.tokens.set(token.id, token);
	}

	public hasTokenAtPosition(position: Position) {
		for (const token of this.tokens.values()) {
			if (token.position.equals(position)) {
				return true;
			}
		}

		return false;
	}
}

container.register(TokenMap, {
	class: TokenMap,
	lifespan: Lifespan.Resolution,
});

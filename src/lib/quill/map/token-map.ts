import { container, Lifespan } from '@/lib/di';

import { Subscriber } from '../comms/subscriber';
import { AddToken } from '../messages/add-token';
import { PlaceToken } from '../messages/place-token';
import { Position } from '../utility/position';
import { Token } from './token';

export class TokenMap extends Subscriber {
	private tokens = new Map<string, Token>();

	constructor() {
		super();
		this.init();
	}

	init() {
		this.onEvent(PlaceToken, (data) => this.placeToken(data));
	}

	private placeToken({ id, position, user }: PlaceToken) {
		if (this.hasTokenAtPosition(position)) {
			return false;
		}

		const token = new Token(user, id, position);
		this.tokens.set(token.id, token);
		this.send(new AddToken(token));
	}

	private hasTokenAtPosition(position: Position) {
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

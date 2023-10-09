import { User } from '@/entites/user';
import { container, Lifespan } from '@/lib/di';

import { Subscriber } from '../comms/subscriber';
import { StoryEvent } from '../types/event';
import { Position } from '../utility/position';
import { Token } from './token';

interface PlaceTokenEvent {
	id: string;
	position: Position;
	user: User;
}

export class TokenMap extends Subscriber {
	private tokens = new Map<string, Token>();

	constructor() {
		super();
		this.init();
	}

	init() {
		this.onEvent(StoryEvent.PlaceToken, (data: PlaceTokenEvent) =>
			this.placeToken(data)
		);
	}

	private placeToken({ id, position, user }: PlaceTokenEvent) {
		const token = new Token(user, id, position);

		this.tokens.set(token.id, token);
	}
}

container.register(TokenMap, {
	class: TokenMap,
	lifespan: Lifespan.Resolution,
});

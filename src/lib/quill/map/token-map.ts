import { User } from '@/entites/user';
import { container, Lifespan } from '@/lib/di';

import { Subscriber } from '../comms/subscriber';
import { RenderEvent, StoryEvent } from '../types/event';
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
		if (this.hasTokenAtPosition(position)) {
			console.log('already exists');
			return false;
		}

		const token = new Token(user, id, position);

		this.tokens.set(token.id, token);

		this.send(RenderEvent.AddToken, token);
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

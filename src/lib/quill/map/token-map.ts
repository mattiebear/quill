import { User } from '@/entites/user';
import { container, Lifespan } from '@/lib/di';
import { Channel } from '@/lib/events';

import { Subscriber } from '../comms/subscriber';
import { StoryEvent } from '../types/event';
import { Position } from '../utility/position';

interface PlaceTokenEvent {
	id: string;
	position: Position;
	user: User;
}

export class TokenMap extends Subscriber {
	constructor() {
		super();
		this.init();
	}

	init() {
		this.onEvent(
			Channel.Story,
			StoryEvent.PlaceToken,
			(data: PlaceTokenEvent) => this.placeToken(data)
		);
	}

	private placeToken({ id, position, user }: PlaceTokenEvent) {
		console.log({ id, position, user });
	}
}

container.register(TokenMap, {
	class: TokenMap,
	lifespan: Lifespan.Resolution,
});

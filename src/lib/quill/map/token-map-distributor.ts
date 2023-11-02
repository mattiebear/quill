import { User } from '@/entites/user';
import { container, DiUser, inject, Lifespan } from '@/lib/di';
import { Position } from '@/lib/quill';

import { Subscriber } from '../comms/subscriber';
import { MouseUp } from '../messages/interaction/mouse-up';
import { AddToken } from '../messages/story/add-token';
import { CurrentStoryState } from '../messages/story/current-story-state';
import { RequestAddToken } from '../messages/story/request-add-token';
import { EngineStore } from '../store';
import { Token } from './token';

export class TokenMapDistributor extends Subscriber {
	constructor(private user: User) {
		super();
		this.init();
	}

	init() {
		this.onEvent(MouseUp, ({ position }) => {
			const { selectedToken } = EngineStore.getState();

			if (selectedToken) {
				this.requestToken(selectedToken, position);
			}
		});

		this.onEvent(CurrentStoryState, ({ tokens }) => {
			tokens.forEach((data) => {
				this.send(new AddToken(Token.fromJSON(data)));
			});
		});
	}

	private requestToken(selectedToken: string, position: Position) {
		this.send(new RequestAddToken(selectedToken, this.user.id, position));
	}
}

inject(TokenMapDistributor, [DiUser]);

container.register(TokenMapDistributor, {
	class: TokenMapDistributor,
	lifespan: Lifespan.Resolution,
});

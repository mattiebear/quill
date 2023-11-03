import { User } from '@/entites/user';
import { container, DiUser, inject, Lifespan } from '@/lib/di';
import { Position } from '@/lib/quill';

import { ActionManager } from '../actions';
import { PlaceTokenAction } from '../actions/actions/place-token-action';
import { Subscriber } from '../comms/subscriber';
import { MouseUp } from '../messages/interaction/mouse-up';
import { AddToken } from '../messages/story/add-token';
import { CurrentStoryState } from '../messages/story/current-story-state';
import { RequestAddToken } from '../messages/story/request-add-token';
import { Token } from './token';

export class TokenMapDistributor extends Subscriber {
	constructor(private user: User, private actions: ActionManager) {
		super();
		this.init();
	}

	init() {
		this.onEvent(MouseUp, ({ position }) => {
			const action = this.actions.active();

			if (action.is(PlaceTokenAction) && action.id) {
				this.requestToken(action.id, position);
			}
		});

		this.onEvent(CurrentStoryState, ({ tokens }) => {
			tokens.forEach((data) => {
				this.send(new AddToken(Token.fromJSON(data)));
			});
		});
	}

	private requestToken(id: string, position: Position) {
		this.send(new RequestAddToken(id, this.user.id, position));
	}
}

inject(TokenMapDistributor, [DiUser, ActionManager]);

container.register(TokenMapDistributor, {
	class: TokenMapDistributor,
	lifespan: Lifespan.Resolution,
});

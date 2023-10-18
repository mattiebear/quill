import { User } from '@/entites/user';
import { container, DiUser, inject, Lifespan } from '@/lib/di';
import { Position } from '@/lib/quill';

import { Subscriber } from '../comms/subscriber';
import { MouseUp } from '../messages/interaction/mouse-up';
import { RequestAddToken } from '../messages/story/request-add-token';
import { quillStore } from '../store';

export class TokenMapDistributor extends Subscriber {
	constructor(private user: User) {
		super();
		this.init();
	}

	init() {
		this.onEvent(MouseUp, ({ position }) => {
			const { selectedToken } = quillStore.getState();

			if (selectedToken) {
				this.requestToken(selectedToken, position);
			}
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

import { User } from '@/entites/user';
import { container, DiUser, inject, Lifespan } from '@/lib/di';
import { Position } from '@/lib/quill';

import { Subscriber } from '../comms/subscriber';
import { AddToken } from '../messages/add-token';
import { MouseUp } from '../messages/interaction/mouse-up';
import { quillStore } from '../store';
import { Token } from './token';
import { TokenMap } from './token-map';

export class TokenMapDistributor extends Subscriber {
	constructor(private tokenMap: TokenMap, private user: User) {
		super();
		this.init();
	}

	init() {
		this.onEvent(MouseUp, ({ position }) => {
			const { selectedToken } = quillStore.getState();

			if (selectedToken) {
				this.placeToken(selectedToken, position);
			}
		});
	}

	private placeToken(id: string, position: Position) {
		if (this.tokenMap.hasTokenAtPosition(position)) {
			return;
		}

		const token = new Token(this.user, id, position);
		this.send(new AddToken(token));
	}
}

inject(TokenMapDistributor, [TokenMap, DiUser]);

container.register(TokenMapDistributor, {
	class: TokenMapDistributor,
	lifespan: Lifespan.Resolution,
});

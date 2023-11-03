import { container, inject, Lifespan } from '@/lib/di';
import { Direction, Position } from '@/lib/quill';
import { Tileset } from '@/lib/quill/map/tileset';

import { ActionManager, PlaceTileAction } from '../actions';
import { Subscriber } from '../comms/subscriber';
import { MouseUp } from '../messages/interaction/mouse-up';
import { PlaceTile } from '../messages/map/place-tile';

export class TileMapDistributor extends Subscriber {
	constructor(private tileset: Tileset, private actions: ActionManager) {
		super();
		this.init();
	}

	init() {
		this.onEvent(MouseUp, ({ position }) => {
			const action = this.actions.active();

			if (action.is(PlaceTileAction) && action.id) {
				this.placeTile(action.id, action.direction, position);
			}
		});
	}

	private placeTile(id: string, direction: Direction, position: Position) {
		const blueprint = this.tileset.get(id);

		if (blueprint) {
			this.send(new PlaceTile(blueprint, direction, position));
		}
	}
}

inject(TileMapDistributor, [Tileset, ActionManager]);

container.register(TileMapDistributor, {
	class: TileMapDistributor,
	lifespan: Lifespan.Resolution,
});

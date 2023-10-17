import { container, inject, Lifespan } from '@/lib/di';
import { Direction, Position } from '@/lib/quill';
import { Tileset } from '@/lib/quill/map/tileset';

import { Subscriber } from '../comms/subscriber';
import { MouseUp } from '../messages/interaction/mouse-up';
import { PlaceTile } from '../messages/place-tile';
import { quillStore } from '../store';

export class TileMapDistributor extends Subscriber {
	constructor(private tileset: Tileset) {
		super();
		this.init();
	}

	init() {
		this.onEvent(MouseUp, ({ position }) => {
			const { selectedBlueprint, selectedDirection } = quillStore.getState();

			if (selectedBlueprint) {
				this.placeTile(selectedBlueprint, selectedDirection, position);
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

inject(TileMapDistributor, [Tileset]);

container.register(TileMapDistributor, {
	class: TileMapDistributor,
	lifespan: Lifespan.Resolution,
});

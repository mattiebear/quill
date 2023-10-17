import { User } from '@/entites/user';
import { container, DiUser, inject, Lifespan } from '@/lib/di';
import { Direction } from '@/lib/quill/types/map';

import { Subscriber } from '../comms/subscriber';
import { EngineConfig } from '../core/engine-config';
import { Tileset } from '../map/tileset';
import { PlaceTile } from '../messages/place-tile';
import { PlaceToken } from '../messages/place-token';
import { quillStore } from '../store';
import { Position } from '../utility/position';
import { RenderStack } from './render-stack';

export class Interactor extends Subscriber {
	constructor(
		public config: EngineConfig,
		private stack: RenderStack,
		private tileset: Tileset,
		private user: User
	) {
		super();
		this.init();
	}

	init() {
		// TODO: Change this to track and emit general events with position information
		// Then send MouseClick, MouseStartDrag, MouseMoveDrag, MouseMove, MouseStopDrag events
		this.stack.main.on('mousedown', (e) => {
			const { x, y } = this.stack.map.toLocal(e.global);

			const position = Position.atPoint(x, y, 0);

			const { selectedBlueprint, selectedDirection, selectedToken } =
				quillStore.getState();

			if (selectedBlueprint) {
				this.placeTile(selectedBlueprint, selectedDirection, position);
			}

			if (selectedToken) {
				this.placeToken(selectedToken, position);
			}
		});
	}

	private placeTile(id: string, direction: Direction, position: Position) {
		const blueprint = this.tileset.get(id);

		if (blueprint) {
			this.send(new PlaceTile(blueprint, direction, position));
		}
	}

	private placeToken(id: string, position: Position) {
		this.send(new PlaceToken(id, position, this.user));
	}
}

inject(Interactor, [EngineConfig, RenderStack, Tileset, DiUser]);

container.register(Interactor, {
	class: Interactor,
	lifespan: Lifespan.Resolution,
});

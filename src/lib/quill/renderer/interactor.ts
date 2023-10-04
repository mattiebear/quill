import { container, inject, Lifespan } from '@/lib/di';
import { Direction } from '@/lib/quill/types/map';

import { Subscriber } from '../comms/subscriber';
import { EngineConfig } from '../core/engine-config';
import { Tileset } from '../map/tileset';
import { quillStore } from '../store';
import { MapEvent } from '../types/event';
import { Position } from '../utility/position';
import { RenderStack } from './render-stack';

export class Interactor extends Subscriber {
	constructor(
		public config: EngineConfig,
		private stack: RenderStack,
		private tileset: Tileset
	) {
		super();

		this.initListeners();
	}

	private initListeners() {
		this.stack.main.on('mousedown', (e) => {
			const { x, y } = this.stack.map.toLocal(e.global);

			const position = Position.atPoint(x, y, 0);

			const { selectedBlueprint, selectedDirection } = quillStore.getState();

			if (selectedBlueprint) {
				this.placeTile(selectedBlueprint, selectedDirection, position);
			}
		});
	}

	private placeTile(id: string, direction: Direction, position: Position) {
		const blueprint = this.tileset.get(id);

		this.editorChannel.send(MapEvent.PlaceTile, {
			blueprint,
			direction,
			position,
		});
	}
}

inject(Interactor, [EngineConfig, RenderStack, Tileset]);

container.register(Interactor, {
	class: Interactor,
	lifespan: Lifespan.Resolution,
});

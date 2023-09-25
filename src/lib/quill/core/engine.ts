import { container, inject } from '@/lib/di';

import { Broadcast } from '../comms/broadcast';
import { Sync } from '../comms/sync';
import { Atlas } from '../map/atlas';
import { MapLoader } from '../map/map-loader';
import { Renderer } from '../renderer';
import { Store } from '../store/store';
import { EngineConfig } from './engine-config';

export class Engine {
	constructor(
		public config: EngineConfig,
		public atlas: Atlas,
		public renderer: Renderer,
		public sync: Sync,
		public broadcast: Broadcast,
		public loader: MapLoader,
		public store: Store
	) {}

	initialize() {
		this.store.reset();
		this.renderer.initialize();
		this.atlas.initialize();

		return this;
	}

	// Should these be handled in an event?
	destroy() {
		this.renderer.destroy();
		this.broadcast.destroy();
	}
}

inject(Engine, [
	EngineConfig,
	Atlas,
	Renderer,
	Sync,
	Broadcast,
	MapLoader,
	Store,
]);

container.register(Engine);

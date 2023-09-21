import { container, inject } from '@/lib/di';

import { Atlas } from '../map/atlas';
import { Renderer } from '../renderer';
import { Broadcast } from './broadcast';
import { EngineConfig } from './engine-config';
import { Sync } from './sync';

export class Engine {
	constructor(
		public config: EngineConfig,
		public atlas: Atlas,
		public renderer: Renderer,
		public sync: Sync,
		public broadcast: Broadcast
	) {}

	initialize() {
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

inject(Engine, [EngineConfig, Atlas, Renderer, Sync, Broadcast]);

container.register(Engine);

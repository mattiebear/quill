import { container, inject } from '@/lib/di';

import { Atlas } from '../map/atlas';
import { Renderer } from '../renderer';
import { EngineConfig } from './engine-config';
import { Sync } from './sync';

export class Engine {
	constructor(
		public config: EngineConfig,
		public atlas: Atlas,
		public renderer: Renderer,
		public sync: Sync
	) {}

	initialize() {
		this.renderer.initialize();
		this.atlas.initialize();

		return this;
	}

	destroy() {
		this.renderer.destroy();
	}
}

inject(Engine, [EngineConfig, Atlas, Renderer, Sync]);

container.register(Engine);

import { Atlas, EngineConfig, Renderer, Sync } from '@/lib/quill';

import { resetQuillStore } from '../store';

/**
 * The primary container for the Quill rendering engine, containing and organizing all inner modules
 */
export class Engine {
	public atlas: Atlas;

	private readonly renderer = new Renderer();
	private readonly sync = new Sync();

	constructor(public readonly config: EngineConfig) {
		this.buildAtlas();
	}

	// TODO: Move to atlas through constructor
	buildAtlas() {
		this.atlas = new Atlas(this.config.tileset).load(
			this.config.map.atlas.data
		);
	}

	// TODO: Move to renderer through config DI
	drawTo(el: HTMLElement) {
		this.renderer.el = el;
		return this;
	}

	initialize() {
		// TODO: Handle in callback
		resetQuillStore();

		// TODO: Clean up all of this
		this.renderer.config = this.config;

		this.sync.config = this.config;
		this.sync.atlas = this.atlas;

		this.renderer.initialize();
		this.atlas.sync();

		return this;
	}

	destroy() {
		this.renderer.destroy();
	}
}

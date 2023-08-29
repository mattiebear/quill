import { Atlas, EngineConfig, IO, Relay, Renderer, Sync } from '@/lib/quill';

import { resetQuillStore } from '../store';

/**
 * The primary container for the Quill rendering engine, containing and organizing all inner modules
 */
export class Engine {
	public atlas: Atlas;

	private readonly renderer = new Renderer();
	private readonly relay = new Relay();
	private readonly sync = new Sync();

	public readonly io = new IO();

	constructor(public readonly config: EngineConfig) {
		this.buildAtlas();
	}

	buildAtlas() {
		this.atlas = new Atlas(this.config.tileset).load(
			this.config.map.atlas.data
		);
	}

	drawTo(el: HTMLElement) {
		this.renderer.el = el;
		return this;
	}

	on(event: string, listener: VoidFunction) {
		this.relay.subscribe(event, listener);
		return this;
	}

	initialize() {
		resetQuillStore();

		// TODO: Clean up all of this
		this.renderer.io = this.io;

		this.io.tileset = this.config.tileset;

		this.sync.config = this.config;
		this.sync.atlas = this.atlas;

		this.relay.link(this.atlas, this.renderer, this.io, this.sync);

		this.renderer.initialize();
		this.io.initialize();
		this.atlas.sync();

		return this;
	}

	destroy() {
		this.renderer.destroy();
		this.io.destroy();
	}
}

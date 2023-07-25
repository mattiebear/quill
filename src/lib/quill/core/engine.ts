import {
	Atlas,
	Direction,
	EngineConfig,
	IO,
	Relay,
	Renderer,
	Store,
	StoreKey,
	Sync,
} from '@/lib/quill';

/**
 * The primary container for the Quill rendering engine, containing and organizing all inner modules
 */
export class Engine {
	public atlas: Atlas;

	private readonly renderer = new Renderer();
	private readonly relay = new Relay();
	private readonly sync = new Sync();

	public readonly io = new IO();
	public readonly store = new Store();

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
		this.store.initialize({
			[StoreKey.SelectedBlueprint]: null,
			[StoreKey.SelectedDirection]: Direction.N,
		});

		// TODO: Clean up all of this
		this.renderer.io = this.io;

		this.io.store = this.store;
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

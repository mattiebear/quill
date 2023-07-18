import { Atlas, Direction } from '@/lib/quill';
import { IO } from '@/lib/quill/core/io';
import { Relay } from '@/lib/quill/core/relay';
import { Store } from '@/lib/quill/core/store';
import { Tileset } from '@/lib/quill/map/tileset';
import { Renderer } from '@/lib/quill/renderer/renderer';
import { StoreKey } from '@/lib/quill/types/store';

type Loadable = Atlas | Tileset;

/**
 * The primary container for the Quill rendering engine, containing and organizing all inner modules
 */
export class Engine {
	private atlas: Atlas;
	private _tileset: Tileset;

	private readonly renderer = new Renderer();
	private readonly relay = new Relay();

	public readonly io = new IO();
	public readonly store = new Store();

	get tileset() {
		return this._tileset;
	}

	// TODO: Just assign this stuff directly
	load(...modules: Loadable[]) {
		modules.forEach((module) => {
			if (module instanceof Atlas) {
				this.atlas = module;
			}

			if (module instanceof Tileset) {
				this._tileset = module;
			}
		});

		return this;
	}

	drawTo(el: HTMLElement) {
		this.renderer.el = el;
		return this;
	}

	initialize() {
		if (!this.atlas) {
			throw new Error('Quill.Engine not initialized with an Atlas');
		}

		this.store.initialize({
			[StoreKey.SelectedBlueprint]: null,
			[StoreKey.SelectedDirection]: Direction.N,
		});

		this.renderer.io = this.io;
		this.io.store = this.store;

		// TODO: This is unnecessary. The engine can do this.
		this.relay.link(this.atlas, this.renderer, this.io);

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

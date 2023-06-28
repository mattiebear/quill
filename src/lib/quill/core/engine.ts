import { Atlas } from '@/lib/quill';
import { IO } from '@/lib/quill/core/io';
import { Relay } from '@/lib/quill/core/relay';
import { Store } from '@/lib/quill/core/store';
import { Renderer } from '@/lib/quill/renderer/renderer';

/**
 * The primary container for the Quill rendering engine, containing and organizing all inner modules
 */
export class Engine {
	private atlas: Atlas;

	private readonly renderer = new Renderer();
	private readonly relay = new Relay();

	public readonly io = new IO();
	public readonly store = new Store();

	load(atlas: Atlas) {
		this.atlas = atlas;
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

		this.relay.link(this.atlas, this.renderer, this.io);

		this.renderer.initialize();

		return this;
	}

	destroy() {
		this.renderer.destroy();
		this.io.destroy();
	}
}

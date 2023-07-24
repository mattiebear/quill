import { Crypto } from '@/lib/crypto';
import { Direction, TileBlueprint } from '@/lib/quill';

/**
 * A single instance of a tile from blueprint on the map and the direction it faces
 */
export class Tile {
	public readonly id: string;

	constructor(
		public readonly blueprint: TileBlueprint,
		public readonly direction: Direction
	) {
		this.id = this.generateUniqueId();
	}

	/**
	 * The sprite image for the tile dependent on the current direction
	 */
	get sprite() {
		return this.blueprint.sprite.image(this.direction);
	}

	/**
	 * The type of tile
	 */
	get type() {
		return this.blueprint.type;
	}

	/**
	 * The image of the tile based on the blueprint and facing direction
	 */
	get texture() {
		return this.blueprint.sprite.image(this.direction);
	}

	private generateUniqueId() {
		return Crypto.uniqueId();
	}
}

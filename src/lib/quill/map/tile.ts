import { Crypto } from '@/lib/crypto';
import { TileBlueprint } from '@/lib/quill/map/tile-blueprint';
import { Direction } from '@/lib/quill/types/map';

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
		return this.blueprint.sprite.face(this.direction);
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
		return this.blueprint.sprite.face(this.direction);
	}

	private generateUniqueId() {
		return Crypto.uniqueId();
	}
}

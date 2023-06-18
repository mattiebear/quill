import { Crypto } from '@/lib/crypto';
import { StructureBlueprint } from '@/lib/quill/map/structure-blueprint';
import { Direction } from '@/lib/quill/types';

/**
 * A single instance of a structure on the map and the direction it faces
 */
export class Structure {
	public readonly id: string;

	constructor(
		public readonly blueprint: StructureBlueprint,
		public readonly direction: Direction
	) {
		this.id = this.generateUniqueId();
	}

	/**
	 * The sprite image for the structure dependent on the current direction
	 */
	get sprite() {
		return this.blueprint.sprite.face(this.direction);
	}

	/**
	 * The type of structure
	 */
	get type() {
		return this.blueprint.type;
	}

	private generateUniqueId() {
		return Crypto.uniqueId();
	}
}

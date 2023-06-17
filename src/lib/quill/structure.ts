import { StructureBlueprint } from '@/lib/quill/structure-blueprint';
import { Direction } from '@/lib/quill/types';

/**
 * A single instance of a structure on the map and the direction it faces
 */
export class Structure {
	constructor(
		public readonly blueprint: StructureBlueprint,
		public readonly direction: Direction
	) {}

	/**
	 * The sprite image for the structure dependent on the current direction
	 */
	get sprite() {
		return this.blueprint.sprite.face(this.direction);
	}
}

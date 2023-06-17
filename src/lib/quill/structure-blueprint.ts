import { DirectionalSprite } from '@/lib/quill/directional-sprite';
import { StructureType } from '@/lib/quill/types';

/**
 * Blueprint for a single structure to be displayed on the map (ex. floor, wall, door, table, etc.)
 */
export class StructureBlueprint {
	constructor(
		public readonly name: string,
		public readonly type: StructureType,
		public readonly sprite: DirectionalSprite
	) {}
}

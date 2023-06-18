import { DirectionalSprite } from '@/lib/quill/map/directional-sprite';

export enum StructureType {
	Floor,
	Wall,
	Object,
}

/**
 * Blueprint for a single structure to be displayed on the map (ex. floor, wall, door, table, etc.)
 */
export class StructureBlueprint {
	constructor(
		public readonly id: string,
		public readonly type: StructureType,
		public readonly sprite: DirectionalSprite
	) {}
}

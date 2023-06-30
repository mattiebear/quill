import { DirectionalSprite } from '@/lib/quill/map/directional-sprite';

export enum TileType {
	Floor,
	Wall,
	Object,
}

/**
 * Blueprint for a single tile to be displayed on the map (ex. floor, wall, door, table, etc.)
 */
export class TileBlueprint {
	constructor(
		public readonly id: string,
		public readonly type: TileType,
		public readonly sprite: DirectionalSprite
	) {}
}

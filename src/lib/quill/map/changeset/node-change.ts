import { Tile } from '@/lib/quill/map/tile';
import { Position } from '@/lib/quill/utility/position';

/**
 * A single map change, denoting a tile to be added or removed on a single node
 */
export enum ChangeType {
	Add,
	Remove,
}

export class NodeChange {
	constructor(
		public readonly type: ChangeType,
		public readonly position: Position,
		public readonly tile: Tile
	) {}

	public static add(position: Position, tile: Tile) {
		return new NodeChange(ChangeType.Add, position, tile);
	}

	public static remove(position: Position, tile: Tile) {
		return new NodeChange(ChangeType.Remove, position, tile);
	}
}

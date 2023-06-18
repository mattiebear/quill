import { Structure } from '@/lib/quill/map/structure';
import { Position } from '@/lib/quill/utility/position';

/**
 * A single map change, denoting a structure to be added or removed on a single node
 */
export enum ChangeType {
	Add,
	Remove,
}

export class NodeChange {
	constructor(
		public readonly type: ChangeType,
		public readonly position: Position,
		public readonly structure: Structure
	) {}

	public static add(position: Position, structure: Structure) {
		return new NodeChange(ChangeType.Add, position, structure);
	}

	public static remove(position: Position, structure: Structure) {
		return new NodeChange(ChangeType.Remove, position, structure);
	}
}

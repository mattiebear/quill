import { ChangeType, NodeChange } from '@/lib/quill/map/changeset/node-change';
import { Tile } from '@/lib/quill/map/tile';
import { Position } from '@/lib/quill/utility/position';

/**
 * A collection of map alterations
 */
export class Changeset {
	private readonly changes: NodeChange[];

	constructor(...changes: NodeChange[]) {
		this.changes = changes;
	}

	add(position: Position, tile: Tile) {
		this.changes.push(NodeChange.add(position, tile));
	}

	remove(position: Position, tile: Tile) {
		this.changes.push(NodeChange.remove(position, tile));
	}

	get all() {
		return this.changes;
	}

	get additive() {
		return this.changes.filter((change) => change.type === ChangeType.Add);
	}

	get subtractive() {
		return this.changes.filter((change) => change.type === ChangeType.Remove);
	}
}

import { ChangeType, NodeChange } from '@/lib/quill/map/changeset/node-change';
import { Structure } from '@/lib/quill/map/structure';
import { Position } from '@/lib/quill/utility/position';

/**
 * A collection of map alterations
 */
export class Changeset {
	private readonly changes: NodeChange[];

	constructor(...changes: NodeChange[]) {
		this.changes = changes;
	}

	add(position: Position, structure: Structure) {
		this.changes.push(NodeChange.add(position, structure));
	}

	remove(position: Position, structure: Structure) {
		this.changes.push(NodeChange.remove(position, structure));
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

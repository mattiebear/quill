import { Changeset } from '@/lib/quill/map/changeset';
import { Structure } from '@/lib/quill/map/structure';
import {
	StructureBlueprint,
	StructureType,
} from '@/lib/quill/map/structure-blueprint';
import { Direction } from '@/lib/quill/types';
import { Position } from '@/lib/quill/utility/position';

/**
 * Representation of a single tile at an x, y, z coordinate within a map, storing multiple structures
 */
export class MapNode {
	public readonly position: Position;

	private structures: Map<string, Structure>;

	constructor(x: number, y: number, z: number) {
		this.position = new Position(x, y, z);
		this.structures = new Map();
	}

	add(blueprint: StructureBlueprint, direction: Direction) {
		const changeset = new Changeset();
		const structure = new Structure(blueprint, direction);

		const existing = this.findExistingStructures(structure);

		existing.forEach((structure) => {
			changeset.remove(this.position, structure);
			this.structures.delete(structure.id);
		});

		changeset.add(this.position, structure);

		this.structures.set(structure.id, structure);

		return changeset;
	}

	remove(id: string) {
		const structure = this.structures.get(id);

		const changeset = new Changeset();

		if (!structure) {
			return changeset;
		}

		changeset.remove(this.position, structure);
		this.structures.delete(id);

		return changeset;
	}

	// TODO: I think this can be cleaned up to be much more flexible
	private findExistingStructures(source: Structure) {
		if (source.type === StructureType.Wall) {
			return [...this.structures.values()].filter(
				(structure) =>
					structure.type === source.type &&
					structure.direction === source.direction
			);
		}

		return [...this.structures.values()].filter(
			(structure) => structure.type === source.type
		);
	}
}

import { Position } from '@/lib/quill/position';
import { Structure } from '@/lib/quill/structure';
import { Direction } from '@/lib/quill/types';

/**
 * Representation of a single tile at an x, y, z coordinate within a map, storing multiple structures
 */
export class Tile {
	public readonly position: Position;
	private structures: Map<string, Structure>;

	constructor(x: number, y: number, z: number) {
		this.position = new Position(x, y, z);
		this.structures = new Map();
	}

	place() {
		// check if tile type already exists
		// if it does, make a remove change
		// add the tile to the map
		// add the create change
		// merge changesets
		// return changesets
	}

	remove(id: string) {}
}

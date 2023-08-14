import { PersistedTile } from '@/entites/atlas';
import {
	Changeset,
	Direction,
	Position,
	Tile,
	TileBlueprint,
	TileType,
} from '@/lib/quill';

/**
 * Representation of a single tile at an x, y, z coordinate within a map, storing multiple tiles
 */
export class MapNode {
	private tiles: Map<string, Tile>;

	constructor(public readonly position: Position) {
		this.tiles = new Map();
	}

	add(blueprint: TileBlueprint, direction: Direction) {
		const changeset = new Changeset();
		const tile = new Tile(blueprint, direction);

		const existing = this.findExistingStructures(tile);

		existing.forEach((tile) => {
			changeset.remove(this.position, tile);
			this.tiles.delete(tile.id);
		});

		changeset.add(this.position, tile);

		this.tiles.set(tile.id, tile);

		return changeset;
	}

	remove(id: string) {
		const tile = this.tiles.get(id);

		const changeset = new Changeset();

		if (!tile) {
			return changeset;
		}

		changeset.remove(this.position, tile);
		this.tiles.delete(id);

		return changeset;
	}

	toJSON() {
		const data: PersistedTile[] = [];

		for (const tile of this.tiles.values()) {
			data.push({
				i: tile.blueprint.id,
				d: tile.direction,
			});
		}

		return data;
	}

	// TODO: I think this can be cleaned up to be much more flexible
	private findExistingStructures(source: Tile) {
		if (source.type === TileType.Wall) {
			return [...this.tiles.values()].filter(
				(tile) =>
					tile.type === source.type && tile.direction === source.direction
			);
		}

		return [...this.tiles.values()].filter((tile) => tile.type === source.type);
	}
}

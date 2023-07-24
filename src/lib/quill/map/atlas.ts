import {
	Changeset,
	Direction,
	MapEvent,
	MapNode,
	Position,
	Relay,
	Subscriber,
	TileBlueprint,
	Tileset,
} from '@/lib/quill';
import { AtlasData, PersistedNode } from '@/types/map';
import { findOrCreateByKey } from '@/utils/map';

// TODO: Need to come up with a better system to link events
interface PlaceTileEvent {
	blueprint: TileBlueprint;
	direction: Direction;
	position: Position;
}

export class Atlas implements Subscriber {
	private nodes = new Map<string, MapNode>();
	private relay: Relay;
	private queue: Changeset[] = [];

	constructor(private readonly tileset: Tileset) {}

	add(position: Position, blueprint: TileBlueprint, direction: Direction) {
		const node = this.findOrCreateNodeByPosition(position);

		const changeset = node.add(blueprint, direction);

		if (this.relay) {
			this.sendChangeset(changeset);
		} else {
			this.queueChangeset(changeset);
		}
	}

	link(relay: Relay) {
		this.relay = relay;

		this.relay.subscribe(
			MapEvent.PlaceTile,
			({ blueprint, direction, position }: PlaceTileEvent) => {
				this.add(position, blueprint, direction);
			}
		);
	}

	load(mapData: AtlasData) {
		mapData.forEach((node) => {
			const position = new Position(...node.p);

			node.t.forEach((tile) => {
				const blueprint = this.tileset.get(tile.i);

				if (!blueprint) {
					return;
				}

				this.add(position, blueprint, tile.d);
			});
		});

		return this;
	}

	sync() {
		if (!this.relay) {
			return;
		}

		while (this.queue.length) {
			const changeset = this.queue.shift();

			if (changeset) {
				this.sendChangeset(changeset);
			}
		}
	}

	toJSON() {
		const data: PersistedNode[] = [];

		for (const node of this.nodes.values()) {
			const pos = node.position;

			data.push({
				p: [pos.x, pos.y, pos.z],
				t: node.toJSON(),
			});
		}

		return data;
	}

	private sendChangeset(changeset: Changeset) {
		this.relay.send(MapEvent.MapAltered, changeset);
	}

	private queueChangeset(changeset: Changeset) {
		this.queue.push(changeset);
	}

	private findOrCreateNodeByPosition(position: Position) {
		const key = position.toString();
		return findOrCreateByKey(this.nodes, key, new MapNode(position));
	}
}

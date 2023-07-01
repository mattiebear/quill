import { Direction, TileBlueprint } from '@/lib/quill';
import { Relay, Subscriber } from '@/lib/quill/core/relay';
import { Changeset } from '@/lib/quill/map/changeset';
import { MapNode } from '@/lib/quill/map/map-node';
import { Tileset } from '@/lib/quill/map/tileset';
import { MapEvent } from '@/lib/quill/types/event';
import { Position } from '@/lib/quill/utility/position';
import { MapData } from '@/types/map';
import { findOrCreateByKey } from '@/utils/map';

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

	// TODO: Remove tile

	link(relay: Relay) {
		this.relay = relay;

		// 	TODO: Add subscriptions
	}

	load(mapData: MapData) {
		mapData.forEach((tile) => {
			const blueprint = this.tileset.get(tile.t);

			if (!blueprint) {
				return;
			}

			this.add(new Position(...tile.p), blueprint, tile.d);
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

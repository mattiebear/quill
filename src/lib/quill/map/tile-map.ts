import { Atlas as AtlasEntity, PersistedNode } from '@/entites/atlas';
import { container, inject, Lifespan } from '@/lib/di';
import { Channel, relay } from '@/lib/events';
import {
	Changeset,
	Direction,
	MapEvent,
	MapNode,
	Position,
	TileBlueprint,
} from '@/lib/quill';
import { Tileset } from '@/lib/quill/map/tileset';
import { findOrCreateByKey } from '@/utils/map';

import { Subscriber } from '../comms/subscriber';

// TODO: Need to come up with a better system to link events
interface PlaceTileEvent {
	blueprint: TileBlueprint;
	direction: Direction;
	position: Position;
}

export class TileMap extends Subscriber {
	private nodes = new Map<string, MapNode>();

	constructor(private tileset: Tileset) {
		super();
		this.initRelay();
	}

	initRelay() {
		this.onEvent(
			Channel.Editor,
			MapEvent.PlaceTile,
			({ blueprint, direction, position }: PlaceTileEvent) => {
				this.add(position, blueprint, direction);
			}
		);
	}

	add(position: Position, blueprint: TileBlueprint, direction: Direction) {
		const node = this.findOrCreateNodeByPosition(position);

		const changeset = node.add(blueprint, direction);

		this.sendChangeset(changeset);
	}

	load(atlas: AtlasEntity) {
		atlas.data.forEach((node) => {
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
		relay.send(MapEvent.MapAltered, changeset).to(Channel.Editor);
	}

	private findOrCreateNodeByPosition(position: Position) {
		const key = position.toString();
		return findOrCreateByKey(this.nodes, key, new MapNode(position));
	}
}

inject(TileMap, [Tileset]);

container.register(TileMap, { class: TileMap, lifespan: Lifespan.Resolution });

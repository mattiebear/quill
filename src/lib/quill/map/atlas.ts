import {
	AtlasData,
	Atlas as AtlasEntity,
	PersistedNode,
} from '@/entites/atlas';
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
import { findOrCreateByKey } from '@/utils/map';

import { EngineConfig } from '../core/engine-config';

// TODO: Need to come up with a better system to link events
interface PlaceTileEvent {
	blueprint: TileBlueprint;
	direction: Direction;
	position: Position;
}

export class Atlas {
	private nodes = new Map<string, MapNode>();
	private queue: Changeset[] = [];
	private sync = false;

	constructor(private config: EngineConfig) {
		relay
			.channel(Channel.Editor)
			.on(
				MapEvent.PlaceTile,
				({ blueprint, direction, position }: PlaceTileEvent) => {
					this.add(position, blueprint, direction);
				}
			);
	}

	add(position: Position, blueprint: TileBlueprint, direction: Direction) {
		const node = this.findOrCreateNodeByPosition(position);

		const changeset = node.add(blueprint, direction);

		if (this.sync) {
			this.sendChangeset(changeset);
		} else {
			this.queueChangeset(changeset);
		}
	}

	load(atlas: AtlasEntity) {
		atlas.data.forEach((node) => {
			const position = new Position(...node.p);

			node.t.forEach((tile) => {
				const blueprint = this.config.tileset.get(tile.i);

				if (!blueprint) {
					return;
				}

				this.add(position, blueprint, tile.d);
			});
		});

		return this;
	}

	initialize() {
		this.sync = true;

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
		relay.send(MapEvent.MapAltered, changeset).to(Channel.Editor);
	}

	private queueChangeset(changeset: Changeset) {
		this.queue.push(changeset);
	}

	private findOrCreateNodeByPosition(position: Position) {
		const key = position.toString();
		return findOrCreateByKey(this.nodes, key, new MapNode(position));
	}
}

inject(Atlas, [EngineConfig]);

container.register(Atlas, { class: Atlas, lifespan: Lifespan.Resolution });

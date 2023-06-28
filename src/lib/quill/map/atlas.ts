import { Direction, StructureBlueprint } from '@/lib/quill';
import { Relay, Subscriber } from '@/lib/quill/core/relay';
import { MapNode } from '@/lib/quill/map/map-node';
import { MapEvent } from '@/lib/quill/types/event';
import { Position } from '@/lib/quill/utility/position';
import { findOrCreateByKey } from '@/utils/map';

export class Atlas implements Subscriber {
	private nodes = new Map<string, MapNode>();
	private relay: Relay;

	add(position: Position, blueprint: StructureBlueprint, direction: Direction) {
		const node = this.findOrCreateNodeByPosition(position);

		const changeset = node.add(blueprint, direction);

		this.relay.send(MapEvent.MapAltered, changeset);
	}

	// TODO: Remove tile

	link(relay: Relay) {
		this.relay = relay;

		// 	TODO: Add subscriptions
	}

	private findOrCreateNodeByPosition(position: Position) {
		const key = position.toString();
		return findOrCreateByKey(this.nodes, key, new MapNode(position));
	}
}

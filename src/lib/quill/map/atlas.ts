import { StructureBlueprint } from '@/lib/quill';
import { Relay } from '@/lib/quill/core/relay';
import { MapNode } from '@/lib/quill/map/map-node';
import { Direction, MapEvent, Subscriber } from '@/lib/quill/types';
import { Position } from '@/lib/quill/utility/position';

export class Atlas implements Subscriber {
	private nodes: Map<string, MapNode>;
	private relay: Relay;

	constructor() {
		this.nodes = new Map();
	}

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

		if (!this.nodes.has(key)) {
			this.nodes.set(key, new MapNode(position));
		}

		const node = this.nodes.get(key);

		if (!node) {
			throw new Error('No node found for position');
		}

		return node;
	}
}

import { Message } from '@/lib/messaging/message';

import { Direction, Position, TileBlueprint } from '..';

export class PlaceTile extends Message {
	constructor(
		public blueprint: TileBlueprint,
		public direction: Direction,
		public position: Position
	) {
		super();
	}
}

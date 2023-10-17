import { Message } from '@/lib/messaging/message';

import { TileBlueprint } from '../map';
import { Direction } from '../types/map';
import { Position } from '../utility';

export class PlaceTile extends Message {
	constructor(
		public blueprint: TileBlueprint,
		public direction: Direction,
		public position: Position
	) {
		super();
	}
}

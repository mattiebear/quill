import { Direction } from '../types/map';
import { Action } from './action';

export class PlaceTileAction extends Action {
	constructor(
		public id: string | null = null,
		public direction: Direction = Direction.N
	) {
		super();
	}
}

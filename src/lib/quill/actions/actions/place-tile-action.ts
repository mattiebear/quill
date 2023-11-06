import { find, shift } from '@/utils/array';

import { Direction } from '../../types/map';
import { Action } from './action';

export class PlaceTileAction extends Action {
	constructor(
		public id: string | null = null,
		public direction: Direction = Direction.N
	) {
		super();
	}

	get isTileSelected() {
		return !!this.id;
	}

	rotateClockwise() {
		return this.rotate(1);
	}

	rotate(places: number) {
		const directions = Object.values(Direction);

		const index = find(directions, this.direction);
		const direction = shift(directions)(index, places) as Direction;

		return (this as PlaceTileAction).clone({ direction });
	}
}

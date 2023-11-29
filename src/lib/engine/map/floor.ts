import { Position } from './position';

export class Floor {
	constructor(
		public id: string,
		public position: Position,
		public tileId: string,
		public rotation: number
	) {}

	toJSON() {
		return {
			id: this.id,
			pos: this.position.toArray(),
			tile: this.tileId,
			rot: this.rotation,
		};
	}
}

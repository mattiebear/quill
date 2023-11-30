import { GridPosition } from './grid-position';

interface FloorData {
	id: string;
	pos: [number, number, number];
	tile: string;
	rot: number;
}

export class Floor {
	constructor(
		public id: string,
		public position: GridPosition,
		public tileId: string,
		public rotation: number
	) {}

	toJSON(): FloorData {
		return {
			id: this.id,
			pos: this.position.toArray(),
			tile: this.tileId,
			rot: this.rotation,
		};
	}

	static from(data: FloorData): Floor {
		return new Floor(
			data.id,
			new GridPosition(...data.pos),
			data.tile,
			data.rot
		);
	}
}

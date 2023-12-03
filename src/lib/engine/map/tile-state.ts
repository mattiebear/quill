import { TileStoreValues } from '../store/tile-store';
import { Floor, FloorData } from './tiles/floor';
import { Wall, WallData } from './tiles/wall';

type TileStateValue = Pick<TileStoreValues, 'floors' | 'walls'>;

// TODO: Load type from Map entity
interface LoadTileStateData {
	atlas: {
		data: {
			floors: FloorData[];
			walls: WallData[];
		};
	};
}

export class TileState {
	constructor(private data: TileStateValue) {}

	state() {
		return this.data;
	}

	toJSON() {
		return {
			floors: this.data.floors.map((floor) => floor.toJSON()),
			walls: this.data.walls.map((wall) => wall.toJSON()),
		};
	}

	static load(data: LoadTileStateData) {
		return new TileState({
			floors: data.atlas.data.floors.map((floor) => Floor.from(floor)),
			walls: data.atlas.data.walls.map((wall) => Wall.from(wall)),
		});
	}
}

import { produce } from 'immer';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Position, Wall } from '../map';
import { Floor } from '../map/tiles/floor';

export interface TileStoreValues {
	floors: Floor[];
	placeFloor: (floor: Floor) => void;
	placeWall: (wall: Wall) => void;
	walls: Wall[];
}

const replaceOrAdd = (array: any[], record: { position: Position }) => {
	const index = array.findIndex((tile) =>
		tile.position.equals(record.position)
	);

	if (index === -1) {
		array.push(record);
	} else {
		array[index] = record;
	}
};

const TileStore = createWithEqualityFn<TileStoreValues>(
	(set) => ({
		floors: [],
		// TODO: Maybe have this in a separate hook
		placeFloor: (floor: Floor) => {
			set(
				produce<TileStoreValues>((state) => {
					replaceOrAdd(state.floors, floor);
				})
			);
		},
		placeWall: (wall: Wall) => {
			set(
				produce<TileStoreValues>((state) => {
					replaceOrAdd(state.walls, wall);
				})
			);
		},
		walls: [],
	}),
	shallow
);

const defaultState = TileStore.getState();

const resetTileStore = () => {
	TileStore.setState(defaultState, true);
};

const useTileStore = TileStore;

export { resetTileStore, TileStore, useTileStore };

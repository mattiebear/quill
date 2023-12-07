import { produce } from 'immer';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Floor, Wall } from '../map';
import { replaceOrAdd } from './utils/replace-or-add';

export interface TileStoreValues {
	floors: Floor[];
	placeFloor: (floor: Floor) => void;
	placeWall: (wall: Wall) => void;
	walls: Wall[];
}

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

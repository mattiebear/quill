import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Floor } from '../map/floor';
import { Position } from '../map/position';

export interface TileStoreValues {
	floors: Floor[];
}

// TODO: Remove. Mock data.
const floor1 = new Floor('a1', new Position(0, 0, 0), '1', 0);
const floor2 = new Floor('a2', new Position(1, 0, 0), '1', 0);

const TileStore = createWithEqualityFn<TileStoreValues>(
	() => ({
		floors: [floor1, floor2],
	}),
	shallow
);

const defaultState = TileStore.getState();

const resetTileStore = () => {
	TileStore.setState(defaultState, true);
};

const useTileStore = TileStore;

export { resetTileStore, TileStore, useTileStore };

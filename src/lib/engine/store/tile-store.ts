import { produce } from 'immer';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Floor } from '../map/floor';
import { Position } from '../map/position';

export interface TileStoreValues {
	floors: Floor[];
	placeFloor: (floor: Floor) => void;
}

// TODO: Remove. Mock data.
const floor1 = new Floor('a1', new Position(0, 0, 0), '1', 0);
const floor2 = new Floor('a2', new Position(1, 0, 0), '1', 0);

const TileStore = createWithEqualityFn<TileStoreValues>(
	(set) => ({
		// floors: [floor1, floor2],
		floors: [floor1],
		placeFloor: (floor: Floor) => {
			set(
				produce<TileStoreValues>((state) => {
					const index = state.floors.findIndex((tile) =>
						tile.position.equals(floor.position)
					);

					if (index === -1) {
						state.floors.push(floor);
					} else {
						state.floors[index] = floor;
					}
				})
			);
		},
	}),
	shallow
);

const defaultState = TileStore.getState();

const resetTileStore = () => {
	TileStore.setState(defaultState, true);
};

const useTileStore = TileStore;

export { resetTileStore, TileStore, useTileStore };

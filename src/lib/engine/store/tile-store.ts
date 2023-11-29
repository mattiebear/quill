import { produce } from 'immer';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Floor } from '../map/floor';

export interface TileStoreValues {
	floors: Floor[];
	placeFloor: (floor: Floor) => void;
}

const TileStore = createWithEqualityFn<TileStoreValues>(
	(set) => ({
		floors: [],
		// TODO: Maybe have this in a separate hook
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

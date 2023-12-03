import { produce } from 'immer';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Wall } from '../map';
import { Floor } from '../map/tiles/floor';

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
		placeWall: (wall: Wall) => {
			set(
				produce<TileStoreValues>((state) => {
					const index = state.walls.findIndex((tile) =>
						tile.position.equals(wall.position)
					);

					if (index === -1) {
						state.walls.push(wall);
					} else {
						state.walls[index] = wall;
					}
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

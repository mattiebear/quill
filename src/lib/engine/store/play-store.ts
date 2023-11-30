import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

export enum PlayAction {
	Thing,
}

export interface PlayStoreValues {
	action: PlayAction | null;
	connection: any;
	isLoaded: boolean;
	mapId: string | null;
}

const PlayStore = createWithEqualityFn<PlayStoreValues>(
	() => ({
		action: null,
		connection: null,
		isLoaded: false,
		mapId: null,
	}),
	shallow
);

const defaultState = PlayStore.getState();

const resetPlayStore = () => {
	PlayStore.setState(defaultState, true);
};

const usePlayStore = PlayStore;

export { resetPlayStore, PlayStore, usePlayStore };

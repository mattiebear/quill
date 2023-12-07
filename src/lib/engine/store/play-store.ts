import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

export enum PlayAction {
	PlaceToken,
	SelectToken,
}

export interface PlayStoreValues {
	action: PlayAction | null;
	beginPlaceToken: (placeTokenId: string) => void;
	connection: any;
	isLoaded: boolean;
	mapId: string | null;
	placeTokenId: string | null;
	setAction: (action: PlayAction | null) => void;
}

const PlayStore = createWithEqualityFn<PlayStoreValues>(
	(set) => ({
		action: null,
		beginPlaceToken: (placeTokenId) =>
			set({ action: PlayAction.PlaceToken, placeTokenId }),
		connection: null,
		isLoaded: false,
		mapId: null,
		placeTokenId: null,
		setAction: (action) => set({ action }),
	}),
	shallow
);

const defaultState = PlayStore.getState();

const resetPlayStore = () => {
	PlayStore.setState(defaultState, true);
};

const usePlayStore = PlayStore;

export { resetPlayStore, PlayStore, usePlayStore };

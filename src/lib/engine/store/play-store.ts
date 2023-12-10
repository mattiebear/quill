import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Token } from '../map';
import { PagePosition } from '../map/grid/page-position';

export enum PlayAction {
	MoveToken,
	PlaceToken,
	SelectToken,
}

export interface PlayStoreValues {
	action: PlayAction | null;
	beginPlaceToken: (placeTokenId: string) => void;
	connection: any;
	interactionPosition: PagePosition | null;
	isLoaded: boolean;
	mapId: string | null;
	placeTokenId: string | null;
	selectedToken: Token | null;
	setAction: (action: PlayAction | null) => void;
}

const PlayStore = createWithEqualityFn<PlayStoreValues>(
	(set) => ({
		action: null,
		beginPlaceToken: (placeTokenId) =>
			set({ action: PlayAction.PlaceToken, placeTokenId }),
		connection: null,
		interactionPosition: null,
		isLoaded: false,
		mapId: null,
		placeTokenId: null,
		selectedToken: null,
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

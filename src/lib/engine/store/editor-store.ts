import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

export enum EditorAction {
	PlaceFloor,
	PlaceToken,
	PlaceWall,
}

export interface EditorStoreValues {
	action: EditorAction | null;
	beginPlaceFloor: (placeTileId: string) => void;
	beginPlaceToken: (placeTokenId: string) => void;
	beginPlaceWall: (placeTileId: string) => void;
	placeTileId: string | null;
	placeTokenId: string | null;
	setAction: (action: EditorAction) => void;
}

const EditorStore = createWithEqualityFn<EditorStoreValues>(
	(set) => ({
		action: null,
		beginPlaceFloor: (placeTileId: string) =>
			set({ action: EditorAction.PlaceFloor, placeTileId }),
		beginPlaceToken: (placeTokenId: string) =>
			set({ action: EditorAction.PlaceToken, placeTokenId }),
		beginPlaceWall: (placeTileId: string) =>
			set({ action: EditorAction.PlaceWall, placeTileId }),
		placeTileId: null,
		placeTokenId: null,
		setAction: (action: EditorAction) => set({ action }),
	}),
	shallow
);

const defaultState = EditorStore.getState();

const resetEditorStore = () => {
	EditorStore.setState(defaultState, true);
};

const useEditorStore = EditorStore;

export { resetEditorStore, EditorStore, useEditorStore };

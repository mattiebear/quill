import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Position } from '../map/position';

export enum EditorAction {
	PlaceFloor,
}

export interface EditorStoreValues {
	action: EditorAction | null;
	beginPlaceFloor: (placeTileId: string) => void;
	placeTileId: string | null;
	pointerPosition: null | Position;
	setAction: (action: EditorAction) => void;
}

const EditorStore = createWithEqualityFn<EditorStoreValues>(
	(set) => ({
		action: null,
		beginPlaceFloor: (placeTileId: string) =>
			set({ action: EditorAction.PlaceFloor, placeTileId }),
		placeTileId: null,
		pointerPosition: null,
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

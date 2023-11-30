import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Point } from '../map/point';

export enum EditorAction {
	PlaceFloor,
	PlaceWall,
}

export interface EditorStoreValues {
	action: EditorAction | null;
	beginPlaceFloor: (placeTileId: string) => void;
	beginPlaceWall: (placeTileId: string) => void;
	placeTileId: string | null;
	pointerPosition: null | Point;
	setAction: (action: EditorAction) => void;
}

const EditorStore = createWithEqualityFn<EditorStoreValues>(
	(set) => ({
		action: null,
		beginPlaceFloor: (placeTileId: string) =>
			set({ action: EditorAction.PlaceFloor, placeTileId }),
		beginPlaceWall: (placeTileId: string) =>
			set({ action: EditorAction.PlaceWall, placeTileId }),
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

import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

export enum EditorAction {
	PlaceFloor,
}

export interface EditorStoreValues {
	action: EditorAction | null;
	beginPlaceFloor: (placeTileId: string) => void;
	placeTileId: string | null;
	setAction: (action: EditorAction) => void;
}

const EditorStore = createWithEqualityFn<EditorStoreValues>(
	(set) => ({
		action: null,
		beginPlaceFloor: (placeTileId: string) =>
			set({ action: EditorAction.PlaceFloor, placeTileId }),
		placeTileId: null,
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

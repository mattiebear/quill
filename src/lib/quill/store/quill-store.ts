import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Direction } from '@/lib/quill/types/map';

export enum LoadingState {
	Pending,
	Loading,
	Complete,
}

export enum PlayStage {
	Pending,
	MapSelect,
	Play,
}

interface QuillStoreValue {
	loadMapState: LoadingState;
	playStage: PlayStage;
	selectedBlueprint: string | null;
	selectedDirection: Direction;
	selectedMapId: string | null;
}

const quillStore = createWithEqualityFn<QuillStoreValue>(
	() => ({
		loadMapState: LoadingState.Pending,
		playStage: PlayStage.Pending,
		selectedBlueprint: null,
		selectedDirection: Direction.N,
		selectedMapId: null,
	}),
	shallow
);

const defaultState = quillStore.getState();

const resetQuillStore = () => {
	quillStore.setState(defaultState, true);
};

const useQuillStore = quillStore;

export { resetQuillStore, quillStore, useQuillStore };

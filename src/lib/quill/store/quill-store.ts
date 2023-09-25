import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Direction } from '@/lib/quill/types/map';

import { LoadingState } from './types';

interface QuillStoreValue {
	initialDataState: LoadingState;
	mapDataState: LoadingState;
	mapId: string | null;
	selectedBlueprint: string | null;
	selectedDirection: Direction;
}

const quillStore = createWithEqualityFn<QuillStoreValue>(
	() => ({
		initialDataState: LoadingState.Pending,
		mapDataState: LoadingState.Pending,
		mapId: null,
		selectedBlueprint: null,
		selectedDirection: Direction.N,
	}),
	shallow
);

const defaultState = quillStore.getState();

const resetQuillStore = () => {
	quillStore.setState(defaultState, true);
};

const useQuillStore = quillStore;

export { resetQuillStore, quillStore, useQuillStore };

import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Direction } from '..';

interface QuillStoreValue {
	selectedBlueprint: string | null;
	selectedDirection: Direction;
}

const quillStore = createWithEqualityFn<QuillStoreValue>(
	() => ({
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

import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { Point } from '../map/grid/point';

export interface UIStoreValues {
	pointerPosition: null | Point;
}

const UIStore = createWithEqualityFn<UIStoreValues>(
	() => ({
		pointerPosition: null,
	}),
	shallow
);

const defaultState = UIStore.getState();

const resetUIStore = () => {
	UIStore.setState(defaultState, true);
};

const useUIStore = UIStore;

export { resetUIStore, UIStore, useUIStore };

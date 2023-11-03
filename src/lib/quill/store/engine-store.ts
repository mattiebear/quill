import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { LoadingState } from './types';

export interface EngineStoreValue {
	initialDataState: LoadingState;
	mapDataState: LoadingState;
	mapId: string | null;
}

const EngineStore = createWithEqualityFn<EngineStoreValue>(
	() => ({
		initialDataState: LoadingState.Pending,
		mapDataState: LoadingState.Pending,
		mapId: null,
	}),
	shallow
);

const defaultState = EngineStore.getState();

const resetEngineStore = () => {
	EngineStore.setState(defaultState, true);
};

const useEngineStore = EngineStore;

export { resetEngineStore, EngineStore, useEngineStore };

import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { PlaceTileAction } from './place-tile-action';

const actions = [PlaceTileAction];

const initialActionState = actions.reduce<{}>((acc, ctor) => {
	return {
		...acc,
		[ctor.name]: new ctor(),
	};
}, {});

export interface ActionStoreValue {
	current: null | string;
}

const ActionStore = createWithEqualityFn<ActionStoreValue>(
	() => ({
		current: null,
		...initialActionState,
	}),
	shallow
);

const defaultState = ActionStore.getState();

const resetActionStore = () => {
	ActionStore.setState(defaultState, true);
};

const useActionStore = ActionStore;

export { resetActionStore, ActionStore, useActionStore };

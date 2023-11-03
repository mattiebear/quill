import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { NoAction } from './actions/no-action';
import { PlaceTileAction } from './actions/place-tile-action';
import { PlaceTokenAction } from './actions/place-token-action';

const actions = [NoAction, PlaceTileAction, PlaceTokenAction];

const initialActionState = actions.reduce((acc, ctor) => {
	return {
		...acc,
		[ctor.name]: new ctor(),
	};
}, {});

export interface ActionStoreValue {
	current: string;
}

const ActionStore = createWithEqualityFn<ActionStoreValue>(
	() => ({
		current: NoAction.name,
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

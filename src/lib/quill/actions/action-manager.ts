import { Action } from './action';
import { ActionStore, resetActionStore } from './store';
import { Constructor } from './types';

export class ActionManager {
	constructor(private store: typeof ActionStore) {}

	get<T>(action: Constructor<T>): T {
		const instance = (this.store.getState() as any)[action.name];

		if (instance instanceof action) {
			return instance as T;
		}

		throw new Error(`Provided action \`${action.name}\` not found in store`);
	}

	update(action: Action) {
		const name = action.constructor.name;

		this.store.setState({ [name]: action });

		return action;
	}

	activate(action: Action) {
		const name = action.constructor.name;

		this.store.setState({ [name]: action, current: name });

		return action;
	}

	isActive<T>(action: Constructor<T>): boolean {
		return this.store.getState().current === action.name;
	}

	active() {
		const state = this.store.getState();

		if (state.current === null) {
			return null;
		}

		return (state as any)[state.current] as Action;
	}

	reset() {
		resetActionStore();
	}
}

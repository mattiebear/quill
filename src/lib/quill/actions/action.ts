import { Constructor } from './types';

export class Action {
	is<T extends Action>(this: T, action: Constructor<T>): this is T {
		return this instanceof action;
	}
}

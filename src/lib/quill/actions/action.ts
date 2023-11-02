import { Constructor } from './types';

export class Action {
	is<T extends Action>(this: T, action: Constructor<T>): this is T {
		return this instanceof action;
	}

	clone<T extends Action>(
		this: T,
		data: Partial<{ [K in keyof T]: T[K] }> = {}
	) {
		const instance = new (this.constructor as any)();

		Object.assign(instance, data);

		return instance;
	}
}

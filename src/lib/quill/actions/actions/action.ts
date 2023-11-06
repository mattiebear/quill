import { Constructor } from '../types';

export class Action {
	is<T extends Action>(this: Action, action: Constructor<T>): this is T {
		return this instanceof action;
	}

	clone<T extends Action>(
		this: T,
		data: Partial<{ [K in keyof T]: T[K] }> = {}
	) {
		const instance = new (this.constructor as any)();

		const initial = Object.getOwnPropertyNames(this).reduce((props, name) => {
			return {
				...props,
				[name]: (this as any)[name],
			};
		}, {});

		Object.assign(instance, initial, data);

		return instance;
	}
}

import { useActionStore } from '../store';
import { Constructor } from '../types';

export const useAction = <T>(ctor: Constructor<T>): T => {
	return useActionStore((state) => (state as any)[ctor.name]);
};

import { useActionStore } from '../store';
import { Constructor } from '../types';

export const useAction = <T>(ctor: Constructor<T>) => {
	return useActionStore((state) => (state as any)[ctor.name]);
};

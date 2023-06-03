import { useRef } from 'react';

export const useStatic = <T>(initializer: () => T) => {
	const ref = useRef<T>();

	if (!ref.current) {
		ref.current = initializer();
	}

	return ref.current;
};

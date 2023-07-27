import { useEffect, useState } from 'react';

import { useStore } from '@/components/map-editor/hooks/use-store';

export const useStoreValue = <T = unknown>(key: string) => {
	const store = useStore();

	const [currentValue, setCurrentValue] = useState(() => store.get<T>(key));

	useEffect(() => {
		const listener = (value: T) => {
			setCurrentValue(value);
		};

		store.subscribe(key, listener);

		return () => store.unsubscribe(key, listener);
	}, [key, store]);

	return currentValue;
};

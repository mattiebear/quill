import { useEffect } from 'react';

import { useRailMenuContext } from './context';

export const useKeyBinding = (
	key: string | undefined,
	location: number[],
	action?: string
) => {
	const { selectItem } = useRailMenuContext();

	useEffect(() => {
		if (!key) {
			return;
		}

		const listener = (e: KeyboardEvent) => {
			if (e.key === key.toLowerCase()) {
				selectItem(location, action);
			}
		};

		document.addEventListener('keyup', listener);

		return () => {
			document.removeEventListener('keyup', listener);
		};
	}, [action, key, location, selectItem]);
};

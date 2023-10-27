import { useEffect } from 'react';

import { useRailMenuContext } from './context';

export const useKeyBinding = (key: string | undefined, location: number[]) => {
	const { selectItem } = useRailMenuContext();

	useEffect(() => {
		if (!key) {
			return;
		}

		const listener = (e: KeyboardEvent) => {
			if (e.key === key.toLowerCase()) {
				selectItem(location);
			}
		};

		document.addEventListener('keyup', listener);

		return () => {
			document.removeEventListener('keyup', listener);
		};
	}, [key, location, selectItem]);
};

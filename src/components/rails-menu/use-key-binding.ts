import { useEffect } from 'react';

import { useRailMenuContext } from './context';

export const useKeyBinding = (key: string | undefined, location: number[]) => {
	const { setStack } = useRailMenuContext();

	useEffect(() => {
		if (!key) {
			return;
		}

		const listener = (e: KeyboardEvent) => {
			if (e.key === key.toLowerCase()) {
				setStack(location);
			}
		};

		document.addEventListener('keyup', listener);

		return () => {
			document.removeEventListener('keyup', listener);
		};
	}, [key, location, setStack]);
};

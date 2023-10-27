import { ReactNode, useEffect, useMemo } from 'react';

import { useRailMenuContext } from '../context';
import { mapMenuItemKeyBindings } from './map-menu-item-hey-bindings';

export const useKeyBindings = (children: ReactNode) => {
	const { selectItem } = useRailMenuContext();

	const bindings = useMemo(() => {
		return mapMenuItemKeyBindings(children);
	}, [children]);

	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			const binding = bindings[e.key];

			if (binding) {
				selectItem(binding.location, binding.action);
			}
		};

		document.addEventListener('keyup', listener);

		return () => {
			document.removeEventListener('keyup', listener);
		};
	}, [bindings, selectItem]);
};

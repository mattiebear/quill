import { createBoundContext } from '@/lib/context';

import { useRailMenu } from './use-rail-menu';

type RailMenuContextValue = ReturnType<typeof useRailMenu>;

export const [RailMenuContext, useRailMenuContext] =
	createBoundContext<RailMenuContextValue>({
		defaultValue: {
			getIsActive: (..._) => false,
			selectItem: (..._) => void 0,
		},
	});

interface RailMenuItemContextValue {
	level: number;
	index: number;
}

export const [RailMenuItemContext, useRailMenuItemContext] =
	createBoundContext<RailMenuItemContextValue>({
		defaultValue: {
			level: 0,
			index: 0,
		},
	});

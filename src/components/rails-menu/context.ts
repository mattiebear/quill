import { createRef } from 'react';

import { createBoundContext } from '@/lib/context';

import { useRailMenu } from './use-rail-menu';

type RailMenuContextValue = ReturnType<typeof useRailMenu>;

export const [RailMenuContext, useRailMenuContext] =
	createBoundContext<RailMenuContextValue>({
		defaultValue: {
			containerRef: createRef(),
			getIsActive: (..._) => false,
			getFrameProps: (..._) => ({}),
			selectItem: (..._) => void 0,
			setStack: (..._) => void 0,
		},
	});

interface RailMenuItemContextValue {
	location: number[];
}

export const [RailMenuItemContext, useRailMenuItemContext] =
	createBoundContext<RailMenuItemContextValue>({
		defaultValue: {
			location: [],
		},
	});

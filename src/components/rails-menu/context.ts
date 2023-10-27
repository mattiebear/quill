import { createRef } from 'react';

import { createBoundContext } from '@/lib/context';

import { useRailMenu } from './use-rail-menu';

type RailMenuContextValue = ReturnType<typeof useRailMenu>;

export const [RailMenuContext, useRailMenuContext] =
	createBoundContext<RailMenuContextValue>({
		defaultValue: {
			containerRef: createRef(),
			getIsActive: () => false,
			getFrameProps: () => ({}),
			selectItem: () => void 0,
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

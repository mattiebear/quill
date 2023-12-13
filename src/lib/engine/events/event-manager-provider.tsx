import { FC, PropsWithChildren, useMemo } from 'react';

import { StaticStore } from '@/lib/store';

import { EventManager } from './event-manager';
import { AddToken } from './inbound/add-token';
import { CurrentStoryState } from './inbound/current-story-state';
import { MoveToken } from './inbound/move-token';
import { RemoveToken } from './inbound/remove-token';

export const EventManagerProvider: FC<PropsWithChildren> = ({ children }) => {
	const eventManager = useMemo(() => {
		const manager = new EventManager();

		manager.register(AddToken, CurrentStoryState, MoveToken, RemoveToken);

		return manager;
	}, []);

	StaticStore.setState({ eventManager });

	return <>{children}</>;
};

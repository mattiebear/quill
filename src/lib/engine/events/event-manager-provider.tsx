import { FC, PropsWithChildren, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { StaticStore } from '@/lib/store';

import { EventManager } from './event-manager';
import { AddToken } from './inbound/add-token';
import { ChangeMap } from './inbound/change-map';
import { CompleteStory } from './inbound/complete-story';
import { CurrentStoryState } from './inbound/current-story-state';
import { MoveToken } from './inbound/move-token';
import { RemoveToken } from './inbound/remove-token';

export const EventManagerProvider: FC<PropsWithChildren> = ({ children }) => {
	const navigate = useNavigate();

	const eventManager = useMemo(() => {
		const manager = new EventManager({ navigate });

		manager.register(
			AddToken,
			ChangeMap,
			CompleteStory,
			CurrentStoryState,
			MoveToken,
			RemoveToken
		);

		return manager;
	}, []);

	StaticStore.setState({ eventManager });

	return <>{children}</>;
};

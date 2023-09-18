import { useMemo } from 'react';

import { Path } from '@/config/routes';
import { GameSession } from '@/entites/game-session';
import { useCurrentUser } from '@/lib/auth/use-current-user';
import { DynamicPath } from '@/lib/url';

import { useGameSessionName } from './use-game-session-name';

export const useGameSessionRow = (session: GameSession) => {
	const user = useCurrentUser();
	const name = useGameSessionName(session);

	return useMemo(() => {
		const path = new DynamicPath(Path.GameSession).for(session).toString();

		const isEditable = session.isOwnedBy(user);

		const isStartable = isEditable && session.isPending;
		const isCompletable = isEditable && !session.isComplete;
		const isJoinable = !isStartable;

		return {
			name,
			path,
			isCompletable,
			isEditable,
			isJoinable,
			isStartable,
		};
	}, [name, session, user]);
};

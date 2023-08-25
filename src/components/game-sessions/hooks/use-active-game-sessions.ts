import { useMemo } from 'react';

import { useGameSessionsList } from '@/api/game-sessions';
import { GameSessionStatus } from '@/entites/game-session';

export const useActiveGameSessions = () => {
	const { data: sessions } = useGameSessionsList();

	return useMemo(() => {
		if (!sessions) {
			return [];
		}

		return sessions.filter(
			(session) => session.status !== GameSessionStatus.Complete
		);
	}, [sessions]);
};

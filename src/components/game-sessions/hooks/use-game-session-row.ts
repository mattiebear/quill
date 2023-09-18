import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Path } from '@/config/routes';
import { GameSession } from '@/entites/game-session';
import { useCurrentUser } from '@/lib/auth/use-current-user';
import { DynamicPath } from '@/lib/url';

export const useGameSessionRow = (session: GameSession) => {
	const user = useCurrentUser();
	const { t } = useTranslation();

	return useMemo(() => {
		const name =
			session.name ||
			t('gameSessions.sessionDefaultName', { name: session.owner.username });

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
	}, [session, t, user]);
};

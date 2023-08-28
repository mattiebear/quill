import { t } from 'i18next';
import { useMemo } from 'react';

import { Path } from '@/config/routes';
import { GameSession } from '@/entites/game-session';
import { useCurrentUser } from '@/lib/auth/use-current-user';
import { DynamicPath } from '@/lib/url';

export const useGameSessionRow = (session: GameSession) => {
	const user = useCurrentUser();

	return useMemo(() => {
		const name =
			session.name ||
			t('gameSessions.sessionDefaultName', { name: session.owner.username });

		const path = new DynamicPath(Path.GameSession).for(session).toString();

		const isEditable = session.isOwnedBy(user);

		// TODO: This is temporary
		const isCompletable = isEditable && !session.isActive;

		return { name, path, isCompletable, isEditable };
	}, [session, user]);
};

import { useTranslation } from 'react-i18next';

import { GameSession } from '@/entites/game-session';

export const useGameSessionName = (session: GameSession) => {
	const { t } = useTranslation();

	return (
		session.name ||
		t('gameSessions.sessionDefaultName', { name: session.owner.username })
	);
};

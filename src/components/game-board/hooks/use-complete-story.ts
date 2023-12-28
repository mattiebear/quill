import { useCompleteGameSession } from '@/components/game-sessions/hooks/use-complete-game-session';

import { useGameSession } from './use-game-session';

export const useCompleteStory = () => {
	const gameSession = useGameSession();
	return useCompleteGameSession(gameSession);
};

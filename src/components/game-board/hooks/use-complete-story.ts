import { useNavigate } from 'react-router-dom';

import { useCompleteGameSession } from '@/components/game-sessions/hooks/use-complete-game-session';
import { Path } from '@/config/routes';

import { useGameSession } from './use-game-session';

export const useCompleteStory = () => {
	const navigate = useNavigate();
	const gameSession = useGameSession();
	return useCompleteGameSession(gameSession, {
		onSuccess: () => {
			navigate(Path.GameSessions);
		},
	});
};

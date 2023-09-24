import { useGameSessionDetail } from '@/api/game-sessions/detail';
import { useIdParam } from '@/lib/router';
import { assertPresence } from '@/utils/runtime';

import { StoryContext } from './context';
import { useGameBoard } from './hooks/use-game-board';
import { PlayUI } from './play-ui';

export const GameBoard = () => {
	const id = useIdParam();
	const { data: gameSession } = useGameSessionDetail(id);

	assertPresence(gameSession);

	const engine = useGameBoard(gameSession);

	return (
		<StoryContext value={{ engine }}>
			<PlayUI />
		</StoryContext>
	);
};

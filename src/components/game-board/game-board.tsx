import { FC } from 'react';

import { useGameSessionDetail } from '@/api/game-sessions/detail';
import { useIdParam } from '@/lib/router';
import { assertPresence } from '@/utils/runtime';

import { StoryContext } from './context';
// import { useGameBoard } from './hooks/use-game-board';
import { PlayUI } from './play-ui';

export const GameBoard: FC = () => {
	const id = useIdParam();
	const { data: gameSession } = useGameSessionDetail(id);

	assertPresence(gameSession);

	// useGameBoard(gameSession);

	return (
		<StoryContext value={{ gameSession }}>
			<PlayUI />
		</StoryContext>
	);
};

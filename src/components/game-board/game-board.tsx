import { FC } from 'react';

import { useGameSessionDetail } from '@/api/game-sessions/detail';
import { useIdParam } from '@/lib/router';
import { assertPresence } from '@/utils/runtime';

import { StoryContext } from './context';
import { GameState } from './game-state';
import { MapRenderer } from './map-renderer';
import { PlayUI } from './play-ui';
import { SelectMapModal } from './select-map-modal';

export const GameBoard: FC = () => {
	const id = useIdParam();
	const { data: gameSession } = useGameSessionDetail(id);

	assertPresence(gameSession);

	return (
		<StoryContext value={{ gameSession }}>
			<GameState />
			<SelectMapModal />
			<MapRenderer />
			<PlayUI />
		</StoryContext>
	);
};

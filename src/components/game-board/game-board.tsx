import { FC } from 'react';

import { useGameSessionDetail } from '@/api/game-sessions/detail';
import { useIdParam } from '@/lib/router';
import { assertPresence } from '@/utils/runtime';

import { StoryContext } from './context';
import { GameState } from './game-state';
import { MapRenderer } from './map-renderer';
import { PlayUI } from './menu/play-ui';
import { ChangeMapModal } from './select-map/change-map-modal';
import { SelectMapModal } from './select-map/select-map-modal';
import { SelectTokenModal } from './select-token-modal';
import TokenMenu from './token-menu';

export const GameBoard: FC = () => {
	const id = useIdParam();
	const { data: gameSession } = useGameSessionDetail(id);

	assertPresence(gameSession);

	return (
		<StoryContext value={{ gameSession }}>
			<GameState />
			<SelectMapModal />
			<ChangeMapModal />
			<SelectTokenModal />
			<MapRenderer />
			<TokenMenu />
			<PlayUI />
		</StoryContext>
	);
};

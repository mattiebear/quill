import { FC } from 'react';

import { useMapLoader } from '@/lib/engine/map/hooks/use-map-loader';

import { useEventInit } from '../../lib/engine/events/hooks/use-event-init';
import { useStoryContext } from './context';

export const GameState: FC = () => {
	const { gameSession } = useStoryContext();

	useEventInit(gameSession.id);
	useMapLoader();

	return null;
};

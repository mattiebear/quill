import { FC } from 'react';

import { useMapLoader } from '@/lib/engine/hooks/use-map-loader';

import { useBroadcast } from './hooks/use-broadcast';

export const GameState: FC = () => {
	useBroadcast();
	useMapLoader();

	return null;
};

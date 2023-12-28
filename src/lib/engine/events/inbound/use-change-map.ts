import { useCallback } from 'react';

import { PlayStore } from '../../store/play-store';
import { TokenStore } from '../../store/token-store';
import { ReceivedEvent } from '../types';

export type ChangeMapEvent = ReceivedEvent<'change-map', { mapId: string }>;

export const useChangeMap = () => {
	return useCallback((data: ChangeMapEvent) => {
		TokenStore.getState().clearTokens();
		PlayStore.setState({ mapId: data.data.mapId });
	}, []);
};

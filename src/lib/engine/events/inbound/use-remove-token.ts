import { useCallback } from 'react';

import { PlayStore } from '../../store/play-store';
import { TokenStore } from '../../store/token-store';
import { ReceivedEvent } from '../types';

export type RemoveTokenEvent = ReceivedEvent<
	'remove-token',
	{ tokenId: string }
>;

export const useRemoveToken = () => {
	return useCallback((data: RemoveTokenEvent) => {
		TokenStore.getState().removeToken(data.data.tokenId);
		PlayStore.setState({ isTokenMenuOpen: false });
	}, []);
};

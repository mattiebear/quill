import { useCallback } from 'react';

import { Token, TokenData } from '../../map';
import { PlayStore } from '../../store/play-store';
import { TokenStore } from '../../store/token-store';
import { ReceivedEvent } from '../types';

export type CurrentStateEvent = ReceivedEvent<
	'current-story-state',
	{ mapId: string; tokens: TokenData[] }
>;

export const useCurrentStoryState = () => {
	return useCallback((data: CurrentStateEvent) => {
		const placeToken = TokenStore.getState().placeToken;

		PlayStore.setState({
			isLoaded: true,
			mapId: data.data.mapId || null,
		});

		data.data.tokens.forEach((data) => {
			placeToken(Token.from(data));
		});
	}, []);
};

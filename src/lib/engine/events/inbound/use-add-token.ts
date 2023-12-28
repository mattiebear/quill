import { useCallback } from 'react';

import { Token, TokenData } from '../../map';
import { TokenStore } from '../../store/token-store';
import { ReceivedEvent } from '../types';

export type AddTokenEvent = ReceivedEvent<'add-token', TokenData>;

export const useAddToken = () => {
	return useCallback((data: AddTokenEvent) => {
		const token = Token.from(data.data);
		TokenStore.getState().placeToken(token);
	}, []);
};

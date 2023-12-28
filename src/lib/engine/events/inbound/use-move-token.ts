import { useCallback } from 'react';

import { GridPosition } from '../../map';
import { TokenStore } from '../../store/token-store';
import { ReceivedEvent } from '../types';

export type MoveTokenEvent = ReceivedEvent<
	'move-token',
	{ tokenId: string; pos: [number, number, number] }
>;

export const useMoveToken = () => {
	return useCallback((data: MoveTokenEvent) => {
		const pos = new GridPosition(...data.data.pos);
		TokenStore.getState().moveToken(data.data.tokenId, pos);
	}, []);
};

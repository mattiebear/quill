import { useCallback } from 'react';

import { EditorAction, EditorStore } from '@/lib/engine/store/editor-store';
import { TokenStore } from '@/lib/engine/store/token-store';

export const useGameBoardClick = () => {
	return useCallback((e: any) => {
		const { placeToken } = TokenStore.getState();
		const { action, placeTokenId } = EditorStore.getState();

		if (action === EditorAction.PlaceToken && placeTokenId) {
			console.log('place toklen');
		}
	}, []);
};

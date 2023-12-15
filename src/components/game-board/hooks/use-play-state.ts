import { pick } from 'ramda';
import { useMemo } from 'react';

import { useCurrentUser } from '@/lib/auth/use-current-user';
import { PlayAction, usePlayStore } from '@/lib/engine/store/play-store';
import { useTokenStore } from '@/lib/engine/store/token-store';

import { useGameSession } from './use-game-session';

export const usePlayState = () => {
	const state = usePlayStore(pick(['action', 'isLoaded', 'mapId']));
	const tokens = useTokenStore((state) => state.tokens);

	const currentUser = useCurrentUser();
	const gameSession = useGameSession();

	return useMemo(() => {
		const isUserTokenPlaced = tokens.some(
			(token) => token.userId === currentUser.id
		);

		const isUserOwner = gameSession.owner.id === currentUser.id;
		const isUserPlayer = !isUserOwner;
		const isMapSelected = !!state.mapId;
		const isPlacingToken = state.action === PlayAction.PlaceToken;

		const isMapSelectorOpen = isUserOwner && state.isLoaded && !isMapSelected;
		const isTokenSelectorOpen =
			isUserPlayer && state.isLoaded && !isUserTokenPlaced && !isPlacingToken;

		return {
			action: state.action,
			isLoaded: state.isLoaded,
			isMapSelectorOpen,
			isTokenSelectorOpen,
			mapId: state.mapId,
		};
	}, [
		currentUser,
		gameSession,
		state.action,
		state.isLoaded,
		state.mapId,
		tokens,
	]);
};

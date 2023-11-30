import { pick } from 'ramda';

import { useCurrentUser } from '@/lib/auth/use-current-user';
import { usePlayStore } from '@/lib/engine/store/play-store';

import { useGameSession } from './use-game-session';

export const usePlayState = () => {
	const state = usePlayStore(pick(['isLoaded', 'mapId']));

	const currentUser = useCurrentUser();
	const gameSession = useGameSession();

	const isUserOwner = gameSession.owner.id === currentUser.id;
	const isMapSelected = !!state.mapId;

	const isMapSelectorOpen = isUserOwner && state.isLoaded && !isMapSelected;

	return { isLoadingMap: false, isMapSelectorOpen, ...state };
};

import { useCurrentUser } from '@/lib/auth/use-current-user';
import { LoadingState, useQuillStore } from '@/lib/quill/store';

import { useGameSession } from './use-game-session';

export const usePlayState = () => {
	const state = useQuillStore(({ initialDataState, mapDataState, mapId }) => ({
		initialDataState,
		mapDataState,
		mapId,
	}));

	const currentUser = useCurrentUser();
	const gameSession = useGameSession();

	const isUserOwner = gameSession.owner.id === currentUser.id;

	const hasInitialData = state.initialDataState === LoadingState.Complete;
	const isMapLoaded = state.mapDataState === LoadingState.Complete;

	const isMapSelectorOpen = isUserOwner && hasInitialData && !isMapLoaded;

	// const isMapSelectorOpen = state.playStage === PlayStage.MapSelect;
	// const isLoadingMap = state.loadMapState === LoadingState.Loading;

	return { isLoadingMap: false, isMapSelectorOpen };
};

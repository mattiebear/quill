import { useCurrentUser } from '@/lib/auth/use-current-user';
import { LoadingState, useEngineStore } from '@/lib/quill/store';

import { useGameSession } from './use-game-session';

export const usePlayState = () => {
	const state = useEngineStore(
		({ initialDataState, mapDataState, mapId, selectedToken }) => ({
			initialDataState,
			mapDataState,
			mapId,
			selectedToken,
		})
	);

	const currentUser = useCurrentUser();
	const gameSession = useGameSession();

	const isUserOwner = gameSession.owner.id === currentUser.id;

	const hasInitialData = state.initialDataState === LoadingState.Complete;
	const isMapSelected = !!state.mapId;

	const isMapSelectorOpen = isUserOwner && hasInitialData && !isMapSelected;

	return { isLoadingMap: false, isMapSelectorOpen, ...state };
};

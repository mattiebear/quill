import { LoadingState, PlayStage, useQuillStore } from '@/lib/quill/store';

export const usePlayState = () => {
	const state = useQuillStore(({ loadMapState, playStage }) => ({
		loadMapState,
		playStage,
	}));

	const isMapSelectorOpen = state.playStage === PlayStage.MapSelect;
	const isLoadingMap = state.loadMapState === LoadingState.Loading;

	return { isLoadingMap, isMapSelectorOpen };
};

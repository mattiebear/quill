import { useCallback } from 'react';

import { Point } from '../map/grid/point';
import { UIStore } from '../store/ui-store';

export const useMapInteractor = ({ onClick }: { onClick(e: any): void }) => {
	const onClickGrid = useCallback(
		(e: any) => {
			onClick(e);
		},
		[onClick]
	);

	const onMoveGrid = useCallback((e: any) => {
		UIStore.setState({ pointerPosition: Point.at(e.point) });
	}, []);

	const onLeaveGrid = useCallback(() => {
		UIStore.setState({ pointerPosition: null });
	}, []);

	return { onClickGrid, onLeaveGrid, onMoveGrid };
};

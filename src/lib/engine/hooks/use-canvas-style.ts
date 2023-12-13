import { PlayAction, usePlayStore } from '../store/play-store';

export const useCanvasStyle = () => {
	const action = usePlayStore((state) => state.action);

	let cursor = 'default';

	switch (action) {
		case PlayAction.SelectToken:
			cursor = 'pointer';
			break;
		case PlayAction.PlaceToken:
			cursor = 'crosshair';
			break;
		case PlayAction.MoveToken:
			cursor = 'crosshair';
			break;
	}

	return { cursor };
};

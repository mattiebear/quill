import { pick } from 'ramda';
import { FC, useMemo } from 'react';

import { Floor1 } from '@/lib/engine/components/floor-1';
import { EditorAction, useEditorStore } from '@/lib/engine/store/editor-store';

// TODO: Combine with useMapFloors() version
const Tiles: Record<string, FC<JSX.IntrinsicElements['group']>> = {
	'1': Floor1,
};

export const useTileGhost = () => {
	const { action, placeTileId, pointerPosition } = useEditorStore(
		pick(['action', 'placeTileId', 'pointerPosition'])
	);

	return useMemo(() => {
		if (
			action !== EditorAction.PlaceFloor ||
			!placeTileId ||
			!pointerPosition
		) {
			return null;
		}

		const Tile = Tiles[placeTileId];

		// TODO: Make transparent somehow
		return <Tile position={pointerPosition.toCoords()} />;
	}, [action, placeTileId, pointerPosition]);
};

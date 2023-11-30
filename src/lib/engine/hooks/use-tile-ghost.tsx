import { pick } from 'ramda';
import { FC, useMemo } from 'react';

import { Floor1 } from '@/lib/engine/components/floor-1';
import { EditorAction, useEditorStore } from '@/lib/engine/store/editor-store';

import { Wall1 } from '../components/wall-1';
import { Floor, Wall } from '../map';

// TODO: Combine with useMapFloors() version
const Tiles: Record<string, FC<JSX.IntrinsicElements['group']>> = {
	'1': Floor1,
	'2': Wall1,
};

export const useTileGhost = () => {
	const { action, placeTileId, pointerPosition } = useEditorStore(
		pick(['action', 'placeTileId', 'pointerPosition'])
	);

	return useMemo(() => {
		if (!placeTileId || !pointerPosition) {
			return null;
		}

		const Tile = Tiles[placeTileId];

		if (!Tile) {
			return null;
		}

		if (action === EditorAction.PlaceFloor) {
			const position = Floor.position(pointerPosition);
			return <Tile position={position.toCoords()} />;
		}

		if (action === EditorAction.PlaceWall) {
			const position = Wall.position(pointerPosition);
			return <Tile position={position.toCoords()} />;
		}

		// TODO: Make transparent somehow
	}, [action, placeTileId, pointerPosition]);
};

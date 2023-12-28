import { pick } from 'ramda';
import { FC, useMemo } from 'react';
import { MathUtils } from 'three';

import { Floor1 } from '@/lib/engine/components/floor-1';
import { EditorAction, useEditorStore } from '@/lib/engine/store/editor-store';

import { Floor, Wall } from '..';
import { Wall1 } from '../../components/wall-1';
import { useUIStore } from '../../store/ui-store';

// TODO: Combine with useMapFloors() version
const Tiles: Record<string, FC<JSX.IntrinsicElements['group']>> = {
	'1': Floor1,
	'2': Wall1,
};

export const useTileGhost = () => {
	const { action, placeTileId } = useEditorStore(
		pick(['action', 'placeTileId'])
	);
	const pos = useUIStore((state) => state.pointerPosition);

	return useMemo(() => {
		if (!placeTileId || !pos) {
			return null;
		}

		const Tile = Tiles[placeTileId];

		if (!Tile) {
			return null;
		}

		// TODO: Make transparent somehow
		if (action === EditorAction.PlaceFloor) {
			return <Tile position={Floor.position(pos).toCoords()} />;
		}

		if (action === EditorAction.PlaceWall) {
			const position = Wall.position(pos);
			const rotation = position.axis === 'x' ? 0 : MathUtils.DEG2RAD * 90;

			return <Tile position={position.toCoords()} rotation-y={rotation} />;
		}
	}, [action, placeTileId, pos]);
};

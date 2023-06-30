import { useLayoutEffect, useRef } from 'react';

import { useTileset } from '@/components/map-editor/hooks/use-tileset';
import {
	Atlas,
	Direction,
	DirectionalSprite,
	Engine,
	Position,
	TileBlueprint,
	TileType,
} from '@/lib/quill';

// TODO: remove this once data is loaded from DB
const sprite = DirectionalSprite.from('/images/tiles/stoneTile');
const blueprint = new TileBlueprint('1', TileType.Floor, sprite);

export const useQuill = () => {
	const tileset = useTileset();

	const engineRef = useRef(new Engine());
	const elRef = useRef(document.getElementById('root') as HTMLDivElement);

	useLayoutEffect(() => {
		if (!tileset) {
			return;
		}

		const engine = engineRef.current;
		const atlas = new Atlas();

		engine.drawTo(elRef.current).load(atlas).initialize();

		atlas.add(new Position(0, 0, 0), blueprint, Direction.N);
		atlas.add(new Position(1, 0, 0), blueprint, Direction.W);
		atlas.add(new Position(0, 1, 0), blueprint, Direction.E);
		atlas.add(new Position(1, 1, 0), blueprint, Direction.S);

		return () => {
			engine.destroy();
		};
	}, [tileset]);

	return engineRef.current;
};

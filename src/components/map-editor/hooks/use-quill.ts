import { useLayoutEffect, useRef } from 'react';

import * as Quill from '@/lib/quill';

// TODO: remove this once data is loaded from DB
const sprite = Quill.DirectionalSprite.from('/images/tiles/stoneTile');
const blueprint = new Quill.TileBlueprint('1', Quill.TileType.Floor, sprite);

export const useQuill = () => {
	const engineRef = useRef(new Quill.Engine());
	const elRef = useRef(document.getElementById('root') as HTMLDivElement);

	useLayoutEffect(() => {
		const engine = engineRef.current;
		const atlas = new Quill.Atlas();

		engine.drawTo(elRef.current).load(atlas).initialize();

		atlas.add(new Quill.Position(0, 0, 0), blueprint, Quill.Direction.N);
		atlas.add(new Quill.Position(1, 0, 0), blueprint, Quill.Direction.W);
		atlas.add(new Quill.Position(0, 1, 0), blueprint, Quill.Direction.E);
		atlas.add(new Quill.Position(1, 1, 0), blueprint, Quill.Direction.S);

		return () => {
			engine.destroy();
		};
	}, []);

	return engineRef.current;
};

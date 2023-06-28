import { useLayoutEffect, useRef } from 'react';

import * as Quill from '@/lib/quill';

const sprite = Quill.DirectionalSprite.from('/images/tiles/stoneTile');
const blueprint = new Quill.StructureBlueprint(
	'1',
	Quill.StructureType.Floor,
	sprite
);

export const useQuill = () => {
	const engineRef = useRef<Quill.Engine>(new Quill.Engine());
	const elRef = useRef<HTMLDivElement>(
		document.getElementById('root') as HTMLDivElement
	);

	useLayoutEffect(() => {
		const engine = engineRef.current;
		const atlas = new Quill.Atlas();

		engine.drawTo(elRef.current).load(atlas).initialize();

		atlas.add(new Quill.Position(0, 0, 0), blueprint, Quill.Direction.N);
		atlas.add(new Quill.Position(1, 0, 0), blueprint, Quill.Direction.W);
		atlas.add(new Quill.Position(0, 1, 0), blueprint, Quill.Direction.E);
		atlas.add(new Quill.Position(1, 1, 0), blueprint, Quill.Direction.S);

		return () => {
			engineRef.current.destroy();
		};
	}, []);

	return engineRef.current;
};

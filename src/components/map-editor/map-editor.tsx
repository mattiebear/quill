import { useEffect, useRef } from 'react';

import { useMapDetail } from '@/api/maps';
import { PageLoading } from '@/components/loading';
import * as Quill from '@/lib/quill';
import { useIdParam } from '@/lib/router';

import { EditorUI } from './editor-ui';

export const MapEditor = () => {
	// TODO: Create an element and append it to the body
	// const elRef = useRef<HTMLDivElement>(
	// 	document.getElementById('root') as HTMLDivElement
	// );
	const id = useIdParam();
	const { data } = useMapDetail(id);
	const engineRef = useRef<Quill.Engine>();

	// TODO: Store in a custom hook
	useEffect(() => {
		if (data && !engineRef.current) {
			const sprite = Quill.DirectionalSprite.from('/images/tiles/stoneTile');
			const blueprint = new Quill.StructureBlueprint(
				'1',
				Quill.StructureType.Floor,
				sprite
			);

			const engine = new Quill.Engine();
			const atlas = new Quill.Atlas();

			engine.load(atlas);
			engine.initialize();

			atlas.add(new Quill.Position(0, 0, 0), blueprint, Quill.Direction.N);

			engineRef.current = engine;
		}

		// TODO: Remove instance on unload
	}, [data]);

	if (!data) {
		return <PageLoading />;
	}

	return <EditorUI />;
};

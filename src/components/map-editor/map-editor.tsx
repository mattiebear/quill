import { useEffect, useRef } from 'react';

import { useMapDetail } from '@/api/maps';
import { PageLoading } from '@/components/loading';
import {
	Atlas,
	Blueprint,
	Direction,
	DirectionalSprite,
	QuillEngine,
	StructureType,
} from '@/lib/quill';
import { useIdParam } from '@/lib/router';

import { EditorUI } from './editor-ui';

const directionalSprite = DirectionalSprite.from('/images/tiles/stoneTile');
const blueprint = new Blueprint(
	'stoneTile',
	directionalSprite,
	StructureType.Floor
);

// TODO: This file is going to be a whole mess for a while and will need to be refactored
export const MapEditor = () => {
	// TODO: Create an element and append it to the body
	const elRef = useRef<HTMLDivElement>(
		document.getElementById('root') as HTMLDivElement
	);
	const id = useIdParam();
	const { data } = useMapDetail(id);
	const engineRef = useRef<QuillEngine>();

	// TODO: Store in a custom hook
	useEffect(() => {
		if (data && !engineRef.current) {
			const engine = new QuillEngine();
			const atlas = new Atlas();

			atlas.add(0, 0, blueprint, Direction.North);
			atlas.add(0, 1, blueprint, Direction.North);
			atlas.add(0, 2, blueprint, Direction.North);
			atlas.add(1, 0, blueprint, Direction.North);
			atlas.add(1, 1, blueprint, Direction.North);
			atlas.add(1, 2, blueprint, Direction.North);
			atlas.add(2, 0, blueprint, Direction.North);
			atlas.add(2, 1, blueprint, Direction.North);
			atlas.add(2, 2, blueprint, Direction.North);

			engine.atlas = atlas;
			engine.drawTo(elRef.current);
			engine.init();
			engineRef.current = engine;
		}

		// TODO: Remove instance on unload
	}, [data]);

	if (!data) {
		return <PageLoading />;
	}

	return <EditorUI />;
};

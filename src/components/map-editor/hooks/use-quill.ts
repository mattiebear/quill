import { useLayoutEffect, useRef } from 'react';

import { useTileset } from '@/components/map-editor/hooks/use-tileset';
import { Atlas, Engine } from '@/lib/quill';
import { MapData } from '@/types/map';

// TODO: Maybe imperatively set map data
export const useQuill = (initialData?: MapData) => {
	const engineRef = useRef(new Engine());
	const elRef = useRef(document.getElementById('root') as HTMLDivElement);

	const tileset = useTileset();

	useLayoutEffect(() => {
		if (!tileset || !initialData) {
			return;
		}

		const engine = engineRef.current;
		const atlas = new Atlas(tileset).load(initialData);

		engine.drawTo(elRef.current).load(atlas, tileset).initialize();

		return () => {
			engine.destroy();
		};
	}, [initialData, tileset]);

	return engineRef.current;
};

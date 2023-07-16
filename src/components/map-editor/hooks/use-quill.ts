import { useEffect, useRef, useState } from 'react';

import { useTileset } from '@/components/map-editor/hooks/use-tileset';
import { Atlas, Engine } from '@/lib/quill';
import { MapData } from '@/types/map';

// TODO: Maybe imperatively set map data
export const useQuill = (initialData: MapData) => {
	const elRef = useRef(document.getElementById('root') as HTMLDivElement);
	const tileset = useTileset();

	const [engine] = useState(() => {
		const engine = new Engine();
		const atlas = new Atlas(tileset).load(initialData);

		engine.drawTo(elRef.current).load(atlas, tileset).initialize();

		return engine;
	});

	useEffect(() => {
		return () => engine.destroy();
	}, [engine]);

	return engine;
};

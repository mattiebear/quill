import { useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { useTileset } from '@/components/map-editor/hooks/use-tileset';
import { useHttpClient } from '@/lib/http';
import { Atlas, Engine } from '@/lib/quill';
import { MapEvent } from '@/lib/quill/types/event';

// TODO: Maybe imperatively set map data
export const useQuill = (map: any) => {
	const elRef = useRef(document.getElementById('root') as HTMLDivElement);
	const tileset = useTileset();
	const http = useHttpClient();
	const toast = useToast();

	const createSaveToast = () => {
		toast({
			status: 'success',
			title: 'Map saved',
			duration: 2000,
		});
	};

	const [engine] = useState(() => {
		const engine = new Engine(map);
		// TODO: Map always should come back with version and data
		const atlas = new Atlas(tileset).load(map.atlas?.data || []);

		engine
			.drawTo(elRef.current)
			.persistTo(http)
			.load(atlas, tileset)
			.on(MapEvent.MapSaved, createSaveToast)
			.initialize();

		return engine;
	});

	useEffect(() => {
		return () => engine.destroy();
	}, [engine]);

	return engine;
};

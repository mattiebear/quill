import { useEffect, useRef, useState } from 'react';

import { useEditorFeedback } from '@/components/map-editor/hooks/use-editor-feedback';
import { useTileset } from '@/components/map-editor/hooks/use-tileset';
import { MapEntity } from '@/entites/map-entity';
import { useHttpClient } from '@/lib/http';
import { Engine } from '@/lib/quill';
import { EngineConfig } from '@/lib/quill/core/engine-config';
import { MapEvent } from '@/lib/quill/types/event';

export const useQuill = (map: MapEntity) => {
	const elRef = useRef(document.getElementById('root') as HTMLDivElement);
	const tileset = useTileset();
	const http = useHttpClient();
	const { createSaveToast } = useEditorFeedback();

	const [engine] = useState(() => {
		const config = new EngineConfig({
			map,
			tileset,
			http,
		});

		const engine = new Engine(config);

		engine
			.drawTo(elRef.current)
			.on(MapEvent.MapSaved, createSaveToast)
			.initialize();

		return engine;
	});

	useEffect(() => {
		return () => engine.destroy();
	}, [engine]);

	return engine;
};

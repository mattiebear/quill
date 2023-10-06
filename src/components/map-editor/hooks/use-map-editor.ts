import { useEffect, useRef, useState } from 'react';

import { useEditorFeedback } from '@/components/map-editor/hooks/use-editor-feedback';
import { MapEntity } from '@/entites/map-entity';
import { container, DiHttp } from '@/lib/di';
import { useHttpClient } from '@/lib/http';
import { Engine, Tileset } from '@/lib/quill';
import { EngineConfig, EngineMode } from '@/lib/quill/core/engine-config';
import { useTileset } from '@/lib/quill/hooks/use-tileset';
import { resetQuillStore } from '@/lib/quill/store';
import { MapEvent } from '@/lib/quill/types/event';

import { useDataObserver } from './use-data-observer';

export const useMapEditor = (map: MapEntity) => {
	const elRef = useRef(document.getElementById('root') as HTMLDivElement);
	const tileset = useTileset();
	const http = useHttpClient();
	const { createSaveToast } = useEditorFeedback();

	useDataObserver(MapEvent.MapSaved, createSaveToast);

	const [engine] = useState(() => {
		const config = new EngineConfig({
			el: elRef.current,
			map,
			mode: EngineMode.Editor,
		});

		// TODO: Move to resolution callback
		resetQuillStore();

		container.register(EngineConfig, {
			value: config,
		});

		container.register(Tileset, { value: tileset });
		container.register(DiHttp, { value: http });

		const engine = container.resolve<Engine>(Engine);
		engine.tileMap.load(map.atlas);
		engine.initialize();

		return engine;
	});

	useEffect(() => {
		return () => engine.destroy();
	}, [engine]);

	return engine;
};

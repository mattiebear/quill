import { useEffect, useRef, useState } from 'react';

import { useEditorFeedback } from '@/components/map-editor/hooks/use-editor-feedback';
import { useTileset } from '@/components/map-editor/hooks/use-tileset';
import { MapEntity } from '@/entites/map-entity';
import { container, DiHttp } from '@/lib/di';
import { useHttpClient } from '@/lib/http';
import { Engine } from '@/lib/quill';
import { EngineConfig } from '@/lib/quill/core/engine-config';
import { resetQuillStore } from '@/lib/quill/store';
import { MapEvent } from '@/lib/quill/types/event';

import { useDataObserver } from './use-data-observer';

export const useQuill = (map: MapEntity) => {
	const elRef = useRef(document.getElementById('root') as HTMLDivElement);
	const tileset = useTileset();
	const http = useHttpClient();
	const { createSaveToast } = useEditorFeedback();

	useDataObserver(MapEvent.MapSaved, createSaveToast);

	const [engine] = useState(() => {
		const config = new EngineConfig({
			el: elRef.current,
			map,
			tileset,
		});

		// TODO: Move to resolution callback
		resetQuillStore();

		container.register(EngineConfig, {
			value: config,
		});

		container.register(DiHttp, { value: http });

		return container.resolve<Engine>(Engine).initialize();
	});

	useEffect(() => {
		return () => engine.destroy();
	}, [engine]);

	return engine;
};

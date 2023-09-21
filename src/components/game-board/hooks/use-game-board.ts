import { useEffect, useRef, useState } from 'react';

import { useTileset } from '@/components/map-editor/hooks/use-tileset';
import { GameSession } from '@/entites/game-session';
import { container, DiHttp } from '@/lib/di';
import { useHttpClient } from '@/lib/http';
import { Engine } from '@/lib/quill';
import { EngineConfig, EngineMode } from '@/lib/quill/core/engine-config';
import { resetQuillStore } from '@/lib/quill/store';

export const useGameBoard = (gameSession: GameSession) => {
	const elRef = useRef(document.getElementById('root') as HTMLDivElement);
	const tileset = useTileset();
	const http = useHttpClient();

	const [engine] = useState(() => {
		const config = new EngineConfig({
			el: elRef.current,
			gameSession,
			mode: EngineMode.Play,
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

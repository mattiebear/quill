import { useEffect, useRef, useState } from 'react';

import { GameSession } from '@/entites/game-session';
import { useCurrentUser } from '@/lib/auth/use-current-user';
import { container, DiHttp, DiUser } from '@/lib/di';
import { useHttpClient } from '@/lib/http';
import { Engine, Tileset } from '@/lib/quill';
import { EngineConfig, EngineMode } from '@/lib/quill/core/engine-config';
import { useTileset } from '@/lib/quill/hooks/use-tileset';

export const useGameBoard = (gameSession: GameSession) => {
	const elRef = useRef(document.getElementById('root') as HTMLDivElement);
	const tileset = useTileset();
	const http = useHttpClient();
	const user = useCurrentUser();

	const [engine] = useState(() => {
		const config = new EngineConfig({
			el: elRef.current,
			gameSession,
			mode: EngineMode.Play,
		});

		container.register(EngineConfig, {
			value: config,
		});

		container.register(DiHttp, { value: http });
		container.register(DiUser, { value: user });
		container.register(Tileset, { value: tileset });

		return container.resolve<Engine>(Engine).initialize();
	});

	useEffect(() => {
		return () => engine.destroy();
	}, [engine]);

	return engine;
};

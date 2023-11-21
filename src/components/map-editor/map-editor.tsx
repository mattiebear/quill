import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import { useMapDetail } from '@/api/maps';
// import { useMapEditor } from '@/components/map-editor/hooks/use-map-editor';
import { useIdParam } from '@/lib/router';
import { Floor1 } from '@/lib/tiles/floor-1';
import { assertPresence } from '@/utils/runtime';

import { EditorContext } from './context';
import { EditorUI } from './editor-ui';

export const MapEditor = () => {
	const id = useIdParam();
	const { data: map } = useMapDetail(id);

	assertPresence(map);

	// useMapEditor(map);

	return (
		<EditorContext value={{ map }}>
			<Suspense>
				<Canvas camera={{ position: [4, 1, 0] }}>
					<ambientLight intensity={8} />
					<OrbitControls />
					<Floor1 />
				</Canvas>
			</Suspense>

			<EditorUI />
		</EditorContext>
	);
};

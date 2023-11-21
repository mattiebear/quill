import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FC, Suspense } from 'react';

import { useMapTiles } from './hooks/use-map-tiles';

export const MapRenderer: FC = () => {
	const { floors } = useMapTiles();

	return (
		<Suspense>
			<Canvas camera={{ position: [4, 1, 0] }}>
				<ambientLight intensity={8} />
				<OrbitControls />
				{floors}
			</Canvas>
		</Suspense>
	);
};

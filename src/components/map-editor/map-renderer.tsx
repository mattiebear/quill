import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FC, Suspense } from 'react';

import { useFloorTiles } from './hooks/use-floor-tiles';
import { useMapGrid } from './hooks/use-map-grid';

export const MapRenderer: FC = () => {
	const floors = useFloorTiles();
	const grid = useMapGrid();

	return (
		<Suspense>
			<Canvas
				orthographic
				camera={{
					zoom: 120,
					position: [4, 4, 0],
				}}
			>
				<ambientLight intensity={8} />
				<OrbitControls />
				{floors}
				{grid}
			</Canvas>
		</Suspense>
	);
};

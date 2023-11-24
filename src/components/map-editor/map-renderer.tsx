import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FC, Suspense } from 'react';

import { useMapFloors } from './hooks/use-map-floors';
import { useMapGrid } from './hooks/use-map-grid';
import { useTileGhost } from './hooks/use-tile-ghost';

export const MapRenderer: FC = () => {
	const floors = useMapFloors();
	const grid = useMapGrid();
	const ghost = useTileGhost();

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
				{ghost}
			</Canvas>
		</Suspense>
	);
};

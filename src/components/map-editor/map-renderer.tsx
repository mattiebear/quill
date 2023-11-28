import { Canvas } from '@react-three/fiber';
import { FC, Suspense } from 'react';

import { useMapCamera } from './hooks/use-map-camera';
import { useMapFloors } from './hooks/use-map-floors';
import { useMapGrid } from './hooks/use-map-grid';
import { useMapLight } from './hooks/use-map-light';
import { useTileGhost } from './hooks/use-tile-ghost';

export const MapRenderer: FC = () => {
	const camera = useMapCamera();
	const floors = useMapFloors();
	const grid = useMapGrid();
	const ghost = useTileGhost();
	const light = useMapLight();

	return (
		<Suspense>
			<Canvas
				orthographic
				camera={{
					zoom: 120,
					position: [4, 4, 4],
				}}
			>
				{light}
				{camera}
				{grid}
				{ghost}
				{floors}
			</Canvas>
		</Suspense>
	);
};

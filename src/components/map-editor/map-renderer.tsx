import { Canvas } from '@react-three/fiber';
import { FC, Suspense } from 'react';

import { useMapCamera } from '@/lib/engine/hooks/use-map-camera';
import { useMapFloors } from '@/lib/engine/hooks/use-map-floors';
import { useMapGrid } from '@/lib/engine/hooks/use-map-grid';
import { useMapLight } from '@/lib/engine/hooks/use-map-light';
import { useMapWalls } from '@/lib/engine/hooks/use-map-walls';
import { useTileGhost } from '@/lib/engine/hooks/use-tile-ghost';

export const MapRenderer: FC = () => {
	const camera = useMapCamera();
	const floors = useMapFloors();
	const walls = useMapWalls();
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
				{walls}
			</Canvas>
		</Suspense>
	);
};
